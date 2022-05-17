import React, { FC, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

interface RequireAuthProps {
    children: ReactElement<any, any>,
}

const RequireAuth: FC<RequireAuthProps> = ({ children }: RequireAuthProps) => {
    if (!AuthService.isUserLoggedIn()) {
        return <Navigate to="/login"/>;
    }
    return children;
};

export default RequireAuth;
