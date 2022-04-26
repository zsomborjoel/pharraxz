import React, { FC } from 'react'
import Toolbar from '@mui/material/Toolbar'
import AppBar from '@mui/material/AppBar'
import { Router, Link } from 'react-router-dom'
import { Grid, Avatar, IconButton, Typography } from '@mui/material'
import MainMenu from './MainMenu'
import logo from './logo.svg'
import './Header.css'

export type HeaderProps = {}

const Header: FC<HeaderProps> = () => {
    return (
        <AppBar position="static" sx={{ height: 65 }}>
            <Toolbar>
                <Grid container spacing={2}>
                    <Grid item xs={3} display="flex" flexDirection="row" alignItems="center">
                        <MainMenu/>
                        <Avatar src={logo} alt="logo"/>
                        <Typography ml={1} className="title">Pharraxz</Typography>
                    </Grid>
                    <Grid item xs={9} display="flex" flexDirection="row-reverse" alignItems="center">
                        Sign out
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default Header;