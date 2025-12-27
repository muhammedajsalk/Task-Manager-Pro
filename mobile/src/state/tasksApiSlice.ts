import { baseApi } from './baseApi';

export const tasksApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<any[], void>({
      query: () => '/tasks',
      providesTags: ['Task'],
    }),
    createTask: builder.mutation<any, any>({
      query: (task) => ({
        url: '/tasks',
        method: 'POST',
        body: task,
      }),
      invalidatesTags: ['Task'],
    }),
  }),
});

export const { useGetTasksQuery, useCreateTaskMutation } = tasksApiSlice;