import React, { FC, useEffect } from 'react';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import { Box, Avatar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MainMenu from './MainMenu';
import logo from './logo.svg';
import './Header.css';
import TokenService from '../../services/TokenService';
import AuthService from '../../services/AuthService';

export type HeaderProps = {
    isLogInStarted: boolean;
    setIsLogInStarted: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header: FC<HeaderProps> = ({ isLogInStarted, setIsLogInStarted }) => {
    const navigate = useNavigate();

    const logout = (): void => {
        TokenService.removeUser();
        setIsLogInStarted(false);
        navigate('/login');
    };

    const currentUser = AuthService.getCurrentUser();

    useEffect(() => {}, [isLogInStarted]);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <MainMenu />
                    <Avatar src={logo} alt="logo" />
                    <Typography ml={1} variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Pharraxz
                    </Typography>
                    <Typography mr={2}>{currentUser?.username}</Typography>
                    {TokenService.isUserLoggedIn() && (
                        <Button variant="contained" color="secondary" onClick={() => logout()}>
                            Logout
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;
