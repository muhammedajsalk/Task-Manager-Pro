import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface RootState {
  auth: {
    token: string | null;
  }
}

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Task', 'User'], 
  endpoints: () => ({}), 
});