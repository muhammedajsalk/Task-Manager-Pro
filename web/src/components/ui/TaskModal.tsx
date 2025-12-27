import React from 'react';
import { Modal, Box, Typography } from '@mui/material';

interface TaskModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: 400 },
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export const TaskModal: React.FC<TaskModalProps> = ({ open, onClose, title, children }) => (
  <Modal open={open} onClose={onClose}>
    <Box sx={modalStyle}>
      <Typography variant="h6" mb={2}>{title}</Typography>
      {children}
    </Box>
  </Modal>
);