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
                const params = new URLSearchParams({ page: page.toString() });

                if (search) params.append('search', search);

                if (isCompleted && isCompleted !== 'all') {
                    params.append('isCompleted', isCompleted);
                }

                return {
                    url: '/task',
                    params: params,
                };
            },
            providesTags: ['Task'],
        }),

        createTask: builder.mutation<Task, { title: string; description: string }>({
            query: (body) => ({
                url: '/task',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Task'],
        }),

        deleteTask: builder.mutation<{ id: string }, string>({
            query: (id) => ({
                url: `/task/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Task'],
        }),

        updateTask: builder.mutation<Task, { id: string; isCompleted: boolean }>({
            query: ({ id, isCompleted }) => ({
                url: `/task/${id}`,
                method: 'PUT',
                body: { isCompleted },
            }),
            invalidatesTags: ['Task'],
        }),

    }),
});

export const {
    useGetTasksQuery,
    useCreateTaskMutation,
    useDeleteTaskMutation,
    useUpdateTaskMutation,
} = tasksApiSlice;