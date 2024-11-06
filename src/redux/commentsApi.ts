import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query'
import { RootState } from './store';
import { IComment, IRefreshTokenResponse } from '../types/types';
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

export const commentsApi = createApi({
  reducerPath: 'commentsApi',
  baseQuery: baseQueryWithReauth,
  
  endpoints: (build) => ({
    getPostCommetns: build.query<{status: number; comments: IComment[]}, string>({
      query: (id) => ({
        url: `comments/${id}`,
      })
    }),
    addComment: build.mutation<{status: number; message: string}, IComment>({
      query: (body) => ({
        url: `comments`,
        method: 'POST',
        body
      })
    }),
    deleteComment: build.mutation<{status: number; message: string}, string>({
      query: (id) => ({
        url: `comments/${id}`,
        method: 'DELETE',
      })
    })
  })
})


export const { useGetPostCommetnsQuery, useAddCommentMutation, useDeleteCommentMutation } = commentsApi;