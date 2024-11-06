import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query'
import { IChangePass, IUser, IRefreshTokenResponse, IUpdateUser } from '../types/types';
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

export const usersApi = createApi({
  reducerPath: 'usersApi',

  baseQuery: baseQueryWithReauth,
  
  endpoints: (build) => ({
    getUsers: build.query<{status: number; users: IUser[]}, any>({
      query: () => ({
        url: 'users',
      })
    }),
    getUser: build.query<{status: number; user: IUser}, string>({
      query: (id) => ({
        url: `users/${id}`,
      })
    }),
    updateUser: build.mutation<{status: number; message: string}, { id: string; body: IUpdateUser }>({
      query: ({ id, body }) => ({
        url: `users/${id}`,
        method: 'PUT',
        body
      })
    }),
    changePassword: build.mutation<{status: number; message: string}, { id: string; body: IChangePass }>({
      query: ({ id, body }) => {
        return {
          url: `users/${id}/change-password`,
          method: 'PATCH',
          body
        };
      },
    }),
    deleteUser: build.mutation<{status: number; message: string}, string>({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE'
      })
    }),
  })
})


export const { useGetUsersQuery, useGetUserQuery, useUpdateUserMutation, 
  useDeleteUserMutation, useChangePasswordMutation } = usersApi;
