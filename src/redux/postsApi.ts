import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query'
import { IPost, IRefreshTokenResponse } from '../types/types';
import { RootState } from './store';
import { logout, setUser } from './authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: (headers, { getState }) => { 
    const token = (getState() as RootState).auth.token;
    if (token) {
        headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  }
});

function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error !== null && 'data' in error;
}

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  
  if (result?.error && isFetchBaseQueryError(result.error) && (result.error.data as any)?.status === 401) {
    const refreshToken = (api.getState() as RootState).auth.refreshToken;

    const refreshResult = await baseQuery({
      url: 'auth/refresh',
      method: 'POST',
      body: { refreshToken },
    }, api, extraOptions) as { data?: IRefreshTokenResponse };

    if (refreshResult?.data) {
      const { token, refreshToken, userId } = refreshResult.data;
      api.dispatch(setUser({ token, refreshToken, userId }));
      
      // Повторний оригінальний запит
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout()); // Логаут при невдалій спробі оновити токен
    }
  }

  return result;
};

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: baseQueryWithReauth,
  
  endpoints: (build) => ({
    getPosts: build.query<{status: number; articles: IPost[]}, string | undefined>({
      query: (id) => {
        if (id) {
          return {
            url: `articles/user/${id}`,
          }
        } else {
          return {
            url: `articles/`,
          }
        }
      }
    }),
    addPost: build.mutation<{status: number; createdArticle: IPost}, IPost>({
      query: (body) => ({
        url: `articles`,
        method: 'POST',
        body
      })
    }),
    likePost: build.mutation<{status: number; message: string}, {id: string, body: {userId: string}}>({
      query: ({id, body}) => ({
        url: `articles/${id}/like`,
        method: 'PUT',
        body
      })
    }),
    deletePost: build.mutation<{status: number; message: string}, string>({
      query: (id) => ({
        url: `articles/${id}`,
        method: 'DELETE',
      })
    })
  })
})


export const { useGetPostsQuery, useAddPostMutation,
  useLikePostMutation, useDeletePostMutation } = postsApi;
