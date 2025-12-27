import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from './state/store';

import Layout from './components/Layout';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage'; 

function App() {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        <Route 
          index 
          element={<Navigate to={user ? "/dashboard" : "/login"} replace />} 
        />

        <Route 
          path="login" 
          element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />} 
        />
        
        <Route 
          path="register" 
          element={user ? <Navigate to="/dashboard" replace /> : <RegisterPage />} 
        />

        <Route 
          path="dashboard" 
          element={user ? <DashboardPage /> : <Navigate to="/login" replace />} 
        />

        <Route path="*" element={<Navigate to="/" replace />} />
        
      </Route>
    </Routes>
  );
}

export default App;