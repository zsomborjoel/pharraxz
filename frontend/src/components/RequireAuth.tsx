import React, { FC, ReactNode, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import SnackbarContext from '../contexts/snackbar/SnackbarContext';
import AuthService from '../services/AuthService';
import { RoleName } from '../services/enum/RoleName';

interface RequireAuthProps {
    requiredUserRoles?: RoleName[];
    children: ReactNode;
}

const hasUserValidRole = (requiredUserRoles: RoleName[] | undefined): boolean => {
    if (requiredUserRoles === undefined) {
        return true;
    }

    if (requiredUserRoles) {
        const roles = AuthService.getCurrentUser()?.roleNames;

        if (roles) {
            const found = roles.find((role) => requiredUserRoles.includes(RoleName[role as keyof typeof RoleName]));
            if (found) return true;
        }
    }

    return false;
};

const RequireAuth: FC<RequireAuthProps> = ({ requiredUserRoles, children }): JSX.Element => {
    const { showSnackbar } = useContext(SnackbarContext);

    if (!AuthService.isUserLoggedIn()) {
        showSnackbar({ severity: 'error', text: 'You are not authorized to visit!' });
        return <Navigate to="/login" />;
    }

    if (!hasUserValidRole(requiredUserRoles)) {
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
