import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Chip,
    Paper,
    Typography,
    Box,
    Tooltip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { toast } from 'sonner';
import {
    useDeleteTaskMutation,
    useUpdateTaskMutation,
    type Task
} from '../../state/tasksApiSlice';
import { TaskModal } from '../ui/TaskModal';
import TaskTableSkeleton from './TaskTableSkeleton';

interface TaskTableProps {
    tasks: Task[];
    isLoading: boolean;
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks, isLoading }) => {
    const [deleteTask] = useDeleteTaskMutation();
    const [updateTask] = useUpdateTaskMutation();

    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await deleteTask(id).unwrap();
                toast.success('Task removed');
            } catch (err) {
                toast.error('Could not delete task');
            }
        }
    };

    const handleToggleStatus = async (id: string, currentStatus: boolean) => {
        try {
            await updateTask({ id, isCompleted: !currentStatus }).unwrap();
        } catch (err) {
            toast.error('Failed to update status');
        }
    };

    return (
        <>
            <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 2 }}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead sx={{ bgcolor: 'grey.50' }}>
                        <TableRow>
                            <TableCell width="80" align="center">Status</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Task Title</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>
                                Description
                            </TableCell>
                            <TableCell width="120" align="right" sx={{ fontWeight: 'bold' }}>
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    {isLoading ? (
                        <TaskTableSkeleton rows={5} />
                    ) : (
                        <TableBody>
                            {tasks.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} align="center" sx={{ py: 8 }}>
                                        <Typography color="text.secondary">
                                            No tasks found. Try adjusting your filters or search.
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                tasks.map((task) => (
                                    <TableRow key={task._id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell align="center">
                                            <Tooltip title={task.isCompleted ? "Mark as Pending" : "Mark as Completed"}>
                                                <IconButton
                                                    onClick={() => handleToggleStatus(task._id, task.isCompleted)}
                                                    color={task.isCompleted ? "success" : "default"}
                                                >
                                                    {task.isCompleted ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>

                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Typography
                                                    variant="body1"
                                                    sx={{
                                                        textDecoration: task.isCompleted ? 'line-through' : 'none',
                                                        color: task.isCompleted ? 'text.secondary' : 'text.primary',
                                                        fontWeight: 500
                                                    }}
                                                >
                                                    {task.title}
                                                </Typography>
                                                {task.isCompleted && (
                                                    <Chip
                                                        label="Done"
                                                        size="small"
                                                        color="success"
                                                        variant="filled"
                                                        sx={{ height: 20, fontSize: '0.65rem' }}
                                                    />
                                                )}
                                            </Box>
                                        </TableCell>

                                        <TableCell sx={{ color: 'text.secondary', maxWidth: 150 }}>
                                            {task.description ? (
                                                task.description.length > 50
                                                    ? `${task.description.substring(0, 50)}...`
                                                    : task.description
                                            ) : (
                                                <Typography variant="caption" sx={{ fontStyle: 'italic', opacity: 0.5 }}>
                                                    No description
                                                </Typography>
                                            )}
                                        </TableCell>

                                        <TableCell align="right">
                                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
                                                <Tooltip title="View Details">
                                                    <IconButton size="small" onClick={() => setSelectedTask(task)}>
                                                        <VisibilityIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>

                                                <Tooltip title="Delete Task">
                                                    <IconButton
                                                        size="small"
                                                        color="error"
                                                        onClick={() => handleDelete(task._id)}
                                                    >
                                                        <DeleteIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    )}
                </Table>
            </TableContainer>

            <TaskModal
                open={!!selectedTask}
                onClose={() => setSelectedTask(null)}
                title="Task Overview"
            >
                <Box sx={{ pt: 1 }}>
                    <Typography variant="caption" color="primary" sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                        Title
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        {selectedTask?.title}
                    </Typography>

                    <Typography variant="caption" color="primary" sx={{ fontWeight: 'bold', textTransform: 'uppercase', mt: 2, display: 'block' }}>
                        Status
                    </Typography>
                    <Box sx={{ mb: 2, mt: 0.5 }}>
                        {selectedTask?.isCompleted ? (
                            <Chip label="Completed" color="success" size="small" />
                        ) : (
                            <Chip label="Pending" color="warning" size="small" />
                        )}
                    </Box>

                    <Typography variant="caption" color="primary" sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                        Full Description
                    </Typography>
                    <Paper variant="outlined" sx={{ p: 2, mt: 1, bgcolor: 'grey.50', minHeight: 100 }}>
                        <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                            {selectedTask?.description || "This task has no additional details."}
                        </Typography>
                    </Paper>
                </Box>
            </TaskModal>
        </>
    );
};

export default TaskTable;