import { baseApi } from './baseApi';
import type { AuthResponse } from '../types/auth.types';
import { setCredentials } from './authSlice';
import { toast } from 'sonner';

export const authApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    login: builder.mutation<AuthResponse, any>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Task'],
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
          if (err && typeof err === 'object' && 'data' in err) {
            const errorData = err.data as { message: string };

            const isRateLimited = (err as any).status === 429;

            toast.error(isRateLimited ? "Too many attempts. Slow down!" : errorData.message);
          } else {
            toast.error('An unexpected error occurred');
          }
        }
      },
    }),

    register: builder.mutation<AuthResponse, any>({
      query: (credentials) => ({
        url: '/auth/register',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Task'],
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
          if (err && typeof err === 'object' && 'data' in err) {
            const errorData = err.data as { message: string };
            const isRateLimited = (err as any).status === 429;

            toast.error(isRateLimited ? "Too many attempts. Slow down!" : errorData.message);
          } else {
            toast.error('An unexpected error occurred');
          }
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApiSlice;