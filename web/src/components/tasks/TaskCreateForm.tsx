import React from 'react';
import { Paper, Typography, Box, TextField, Button, Stack } from '@mui/material';
import { useForm,type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'sonner';
import { useCreateTaskMutation } from '../../state/tasksApiSlice';

interface TaskFormInputs {
  title: string;
  description?: string;
}

const taskSchema: yup.ObjectSchema<TaskFormInputs> = yup.object({
  title: yup.string().required('Title is required').min(3, 'Too short'),
  description: yup.string().optional(),
});

const TaskCreateForm: React.FC = () => {
  const [createTask, { isLoading }] = useCreateTaskMutation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<TaskFormInputs>({
    resolver: yupResolver(taskSchema)
  });

  const onSubmit: SubmitHandler<TaskFormInputs> = async (data) => {
    try {
      await createTask({ title: data.title, description: data.description || '' }).unwrap();
      toast.success('Task Added');
      reset();
    } catch (err) {
      toast.error('Error creating task');
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" mb={2}>New Task</Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <TextField 
            label="Title" 
            fullWidth 
            {...register('title')} 
            error={!!errors.title} 
            helperText={errors.title?.message} 
          />
          <TextField 
            label="Description" 
            fullWidth 
            multiline 
            rows={2} 
            {...register('description')} 
          />
          <Button type="submit" variant="contained" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create Task'}
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};

export default TaskCreateForm;