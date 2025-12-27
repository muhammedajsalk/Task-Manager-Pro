import { baseApi } from './baseApi';
import type { AuthResponse } from '../types/auth.types';
import { setCredentials } from './authSlice';

export const authApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    login: builder.mutation<AuthResponse, any>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(setCredentials({
            user: {
              _id: data._id,
              username: data.username,
              email: data.email,
            },
            token: data.token,
          }));
          
        } catch (err) {

        }
      },
    }),

    register: builder.mutation<AuthResponse, any>({
      query: (credentials) => ({
        url: '/auth/register',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(setCredentials({
            user: {
              _id: data._id,
              username: data.username,
              email: data.email,
            },
            token: data.token,
          }));

        } catch (err) {

        }
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApiSlice;