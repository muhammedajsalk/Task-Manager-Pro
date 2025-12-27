import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { 
  Box, Card, CardContent, Typography, TextField, Button, Link 
} from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { toast } from 'sonner';

import { useLoginMutation } from '../state/authApiSlice';

const loginSchema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email'),
  password: yup
    .string()
    .required('Password is required'),
});

type LoginFormInputs = yup.InferType<typeof loginSchema>;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [loginApi, { isLoading }] = useLoginMutation();

  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      await loginApi(data).unwrap();
      
      toast.success("Welcome back!");
      navigate('/'); 
      
    } catch (err: any) {
      // 5. Handle Errors
      const errorMessage = err?.data?.message || "Login failed. Please check your credentials.";
      toast.error(errorMessage);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <Card sx={{ maxWidth: 400, width: '100%', p: 2 }}>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
            Welcome Back
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
            Sign in to manage your tasks
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            
            <TextField
              margin="normal"
              fullWidth
              label="Email Address"
              autoFocus
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isLoading}
              sx={{ mt: 3, mb: 2 }}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
            
            <Box textAlign="center">
              <Typography variant="body2">
                Don't have an account?{' '}
                <Link component={RouterLink} to="/register" variant="body2" sx={{ fontWeight: 600 }}>
                  Create Account
                </Link>
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginPage;