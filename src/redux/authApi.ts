import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IAuth, ILogin, IRegistration } from '../types/types';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: (build) => ({
    userRegistration: build.mutation<IAuth, IRegistration>({
      query: (body) => ({
        url: 'auth/registration',
        method: 'POST',
        body
      })
    }),
    loginUser: build.mutation<IAuth, ILogin>({
      query: (body) => ({
        url: 'auth/login',
        method: 'POST',
        body
      })
    }),
    refreshToken: build.mutation<IAuth, {refreshToken: string}>({
      query: (body) => {
        return {
          url: 'auth/refresh',
          method: 'POST',
          body
        }
      }
    })
  })
})


export const { useUserRegistrationMutation, useLoginUserMutation, useRefreshTokenMutation } = authApi;
