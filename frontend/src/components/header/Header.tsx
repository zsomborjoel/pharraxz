import React, { FC } from 'react';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import { Box, Avatar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MainMenu from './MainMenu';
import logo from './logo.svg';
import './Header.css';
import TokenService from '../../services/TokenService';

export type HeaderProps = {
    isLoggedIn: boolean,
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
}

const Header: FC<HeaderProps> = ({
    isLoggedIn, setIsLoggedIn,
}) => {
    const navigate = useNavigate();

    const logout = (): void => {
        TokenService.removeUser();
        setIsLoggedIn(false);
        navigate('/login');
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <MainMenu/>
                    <Avatar src={logo} alt="logo"/>
                    <Typography ml={1} variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Pharraxz
                    </Typography>
                    {(isLoggedIn || TokenService.isUserLoggedIn())
                    && (
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
