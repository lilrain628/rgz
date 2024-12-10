// src/components/PrivateRoute.js
import React from 'react';
import { Navigate, Route } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
    const isAuthenticated = localStorage.getItem('access_token');

    return isAuthenticated ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;