import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Container, Box, Typography } from '@mui/material'; 
import Navbar from './Navbar';

const Layout: React.FC = () => {
  const location = useLocation();
  const isAuthPage = ['/login', '/register'].includes(location.pathname);

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', width: '100%' }}>

      <Navbar />

      <Container 
        component="main" 
        maxWidth={false}
        sx={{ 
          flexGrow: 1, 
          py: { xs: 2, md: 4 },
          px: { xs: 2, md: 3 }, 
          display: isAuthPage ? 'flex' : 'block',
          flexDirection: 'column',
          justifyContent: isAuthPage ? 'center' : 'flex-start',
          alignItems: isAuthPage ? 'center' : 'stretch', 
        }}
      >
        <Outlet /> 
      </Container>

      <Box 
        component="footer" 
        sx={{ 
          py: 3, 
          bgcolor: 'background.paper', 
          borderTop: '1px solid #e5e7eb',
          mt: 'auto'
        }}
      >
        <Container maxWidth={false}>
          <Typography 
            variant="body2" 
            color="text.secondary" 
            align="center"
            sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
          >
            © {new Date().getFullYear()} Task Manager Pro. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;