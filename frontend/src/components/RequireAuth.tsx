import React, { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

interface RequireAuthProps {
    children: ReactNode;
}

const RequireAuth: FC<RequireAuthProps> = ({ children }): JSX.Element => {
    if (!AuthService.isUserLoggedIn()) {
        return <Navigate to="/login" />;
    }

    return (
        <>
            {children}
            <br />
        </>
    );
};

export default RequireAuth;
