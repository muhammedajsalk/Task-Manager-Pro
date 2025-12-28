import { baseApi } from './baseApi';

export interface Task {
  _id: string;
  title: string;
  description?: string;
  isCompleted: boolean;
  createdAt: string;
}

interface TasksResponse {
  tasks: Task[];
  total: number;
  page: number;
  pages: number;
}

export const tasksApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<TasksResponse, { page: number; search: string; isCompleted?: string }>({
      query: ({ page, search, isCompleted }) => {
        const params: Record<string, string> = { page: page.toString() };

        if (search) params.search = search;

        if (isCompleted && isCompleted !== 'all') {
          params.isCompleted = isCompleted;
        }

        return {
          url: 'api/task',
          params, 
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.tasks.map(({ _id }) => ({ type: 'Task' as const, id: _id })),
              { type: 'Task', id: 'LIST' },
            ]
          : [{ type: 'Task', id: 'LIST' }],
    }),

    createTask: builder.mutation<Task, { title: string; description: string }>({
      query: (body) => ({
        url: 'api/task',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Task', id: 'LIST' }],
    }),

    deleteTask: builder.mutation<{ id: string }, string>({
      query: (id) => ({
        url: `api/task/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Task', id },
        { type: 'Task', id: 'LIST' },
      ],
    }),

    updateTask: builder.mutation<Task, { id: string; isCompleted: boolean }>({
      query: ({ id, isCompleted }) => ({
        url: `api/task/${id}`,
        method: 'PUT',
        body: { isCompleted },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Task', id },
        { type: 'Task', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} = tasksApiSlice;