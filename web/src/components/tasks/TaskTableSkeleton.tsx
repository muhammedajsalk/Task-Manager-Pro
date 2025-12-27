import React from 'react';
import { 
  TableRow, TableCell, Skeleton, TableBody ,Box
} from '@mui/material';

const TaskTableSkeleton: React.FC<{ rows?: number }> = ({ rows = 5 }) => {
  return (
    <TableBody>
      {[...Array(rows)].map((_, index) => (
        <TableRow key={index}>
          <TableCell width="50">
            <Skeleton variant="circular" width={24} height={24} />
          </TableCell>

          <TableCell>
            <Skeleton variant="text" width="60%" height={25} />
          </TableCell>

          <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
            <Skeleton variant="text" width="80%" height={20} />
          </TableCell>

          <TableCell align="right">
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
               <Skeleton variant="circular" width={30} height={30} />
               <Skeleton variant="circular" width={30} height={30} />
            </Box>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default TaskTableSkeleton;