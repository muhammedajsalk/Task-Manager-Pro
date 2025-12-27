import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AssignmentTurnedIn, Logout } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../state/store';
import { logout } from '../state/authSlice';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <AppBar position="static" color="primary" elevation={0}>
      <Container maxWidth={false}>
        <Toolbar disableGutters>

          <Box 
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', flexGrow: 1 }} 
            onClick={() => navigate('/')}
          >
            <AssignmentTurnedIn sx={{ mr: 1, fontSize: { xs: 24, md: 28 } }} />
            <Typography 
              variant="h6" 
              noWrap 
              component="div" 
              sx={{ 
                fontWeight: 700, 
                fontSize: { xs: '1rem', sm: '1.25rem' }, 
                letterSpacing: { xs: 0, sm: 0.5 } 
              }}
            >
              Task Manager Pro
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 2 } }}>
            {user ? (
              <>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontWeight: 600, 
                      display: { xs: 'none', sm: 'block' } 
                    }}
                  >
                    {user.username}
                  </Typography>
                  
                  <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main', fontSize: 14 }}>
                    {user.username?.charAt(0).toUpperCase()}
                  </Avatar>
                </Box>

                <Button 
                  color="inherit" 
                  startIcon={<Logout />} 
                  onClick={handleLogout} 
                  size="small"
                  sx={{ 
                    opacity: 0.9, 
                    '&:hover': { opacity: 1 },
                  }}
                >
                  <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                    Logout
                  </Box>
                </Button>
              </>
            ) : (
              <>
                <Button color="inherit" onClick={() => navigate('/login')}>
                  Login
                </Button>
                <Button 
                  color="inherit" 
                  variant="outlined" 
                  sx={{ borderColor: 'rgba(255,255,255,0.5)' }} 
                  onClick={() => navigate('/register')}
                >
                  Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;