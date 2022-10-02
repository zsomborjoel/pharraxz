import React, { FC, ReactNode, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import SnackbarContext from '../contexts/snackbar/SnackbarContext';
import AuthService from '../services/AuthService';
import { RoleName } from '../services/enum/RoleName';

interface RequireAuthProps {
    requiredUserRoles?: RoleName[];
    children: ReactNode;
}

const RequireAuth: FC<RequireAuthProps> = ({ requiredUserRoles, children }): JSX.Element => {
    const { showSnackbar } = useContext(SnackbarContext);

    if (!AuthService.isUserLoggedIn()) {
        showSnackbar({ severity: 'error', text: 'You are not authorized to visit!' });
        return <Navigate to="/login" />;
    }

    if (!AuthService.hasUserValidRole(requiredUserRoles)) {
        showSnackbar({ severity: 'error', text: 'You are not authorized to visit!' });
        return <Navigate to="/home" />;
    }

    return (
        <>
            {children}
            <br />
        </>
    );
};

export default RequireAuth;
