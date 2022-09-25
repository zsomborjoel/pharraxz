import React, { FC, useState } from 'react';
import { IconButton, ListItemButton } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ArticleIcon from '@mui/icons-material/Article';
import MedicationIcon from '@mui/icons-material/Medication';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

export type MainMenuProps = {};

const menuItems = [
    {
        id: 0,
        menuLabel: 'Order',
        menuIcon: ArticleIcon,
        link: '/order',
    },
    {
        id: 1,
        menuLabel: 'Product',
        menuIcon: MedicationIcon,
        link: '/product',
    },
    {
        id: 2,
        menuLabel: 'Supplier',
        menuIcon: LocalShippingIcon,
        link: '/supplier',
    },
];

const MainMenu: FC<MainMenuProps> = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleDrawer = () => () => {
        setIsMenuOpen(false);
    };

    return (
        <div>
            <IconButton onClick={() => setIsMenuOpen((isOpen) => !isOpen)}>
                <MenuIcon />
            </IconButton>
            <SwipeableDrawer anchor="left" open={isMenuOpen} onClose={toggleDrawer()} onOpen={toggleDrawer()}>
                <Box role="presentation" onClick={toggleDrawer()} onKeyDown={toggleDrawer()} sx={{ width: 200 }}>
                    <List>
                        {menuItems.map(({ id, menuLabel, menuIcon: Icon, link }) => (
                            <Link key={id} to={link} style={{ color: '#1976d2' }} onClick={() => setIsMenuOpen(false)}>
                                <ListItemButton key={menuLabel}>
                                    <ListItemIcon>
                                        <Icon />
                                    </ListItemIcon>
                                    <ListItemText primary={menuLabel} />
                                </ListItemButton>
                            </Link>
                        ))}
                    </List>
                </Box>
            </SwipeableDrawer>
        </div>
    );
};

export default MainMenu;
