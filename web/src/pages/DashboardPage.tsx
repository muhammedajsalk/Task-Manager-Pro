import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  MenuItem, 
  Select, 
  FormControl, 
  InputLabel, 
  Pagination, 
  Stack,
  Paper
} from '@mui/material';
import { useGetTasksQuery } from '../state/tasksApiSlice';

import TaskCreateForm from '../components/tasks/TaskCreateForm';
import TaskTable from '../components/tasks/TaskTable';

const DashboardPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); 

  const { data, isLoading } = useGetTasksQuery({
    page,
    search,
    isCompleted: filterStatus === 'all' ? undefined : filterStatus
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleStatusChange = (value: string) => {
    setFilterStatus(value);
    setPage(1);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto', p: { xs: 2, md: 4 } }}>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="800" color="primary" gutterBottom>
          Dashboard
        </Typography>
      </Box>

      <TaskCreateForm />

      <Paper 
        elevation={0} 
        sx={{ 
          p: 2, mb: 3, display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' }, 
          justifyContent: 'space-between', alignItems: 'center',
          gap: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2
        }}
      >
        <Typography variant="h6" fontWeight="bold">My Tasks</Typography>
        <Stack direction="row" spacing={2} sx={{ width: { xs: '100%', sm: 'auto' } }}>
          <TextField
            placeholder="Search tasks..."
            size="small"
            value={search}
            onChange={handleSearchChange}
            sx={{ width: { xs: '100%', sm: 250 } }}
          />
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={filterStatus}
              label="Status"
              onChange={(e) => handleStatusChange(e.target.value)}
            >
              <MenuItem value="all">All Tasks</MenuItem>
              <MenuItem value="false">Pending</MenuItem>
              <MenuItem value="true">Completed</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Paper>

      <TaskTable 
        tasks={data?.tasks || []} 
        isLoading={isLoading} 
      />

      {data && data.pages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 2 }}>
          <Pagination 
            count={data.pages} 
            page={data.page}  
            onChange={handlePageChange} 
            color="primary" 
            variant="outlined" 
            shape="rounded"
          />
        </Box>
      )}

      {data && (
        <Typography variant="caption" display="block" textAlign="center" color="text.secondary" sx={{ mt: 1 }}>
          Showing page {data.page} of {data.pages} ({data.total} total tasks)
        </Typography>
      )}
    </Box>
  );
};

export default DashboardPage;