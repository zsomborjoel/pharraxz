import React, { FC } from 'react'
import Toolbar from '@mui/material/Toolbar'
import AppBar from '@mui/material/AppBar'
import { Grid } from '@mui/material'


export type HeaderProps = {}

const Header: FC<HeaderProps> = () => {
    const [isMenuOpen, setIsOpenMenu] = React.useState(false);
    return (
        <AppBar position="static" sx={{ height: 65 }}>
            <Toolbar>
                <Grid container spacing={2}>
                    <Grid>

                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default Header;