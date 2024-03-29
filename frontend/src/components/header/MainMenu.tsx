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
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import ListItemText from '@mui/material/ListItemText';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InventoryIcon from '@mui/icons-material/Inventory';
import PersonIcon from '@mui/icons-material/Person';

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
    {
        id: 3,
        menuLabel: 'Stock',
        menuIcon: InventoryIcon,
        link: '/stock',
    },
    {
        id: 4,
        menuLabel: 'User',
        menuIcon: PersonIcon,
        link: '/user',
    },
    {
        id: 5,
        menuLabel: 'File',
        menuIcon: DriveFolderUploadIcon,
        link: '/file',
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
                            <Link key={id} to={link} style={{ color: '#008080' }} onClick={() => setIsMenuOpen(false)}>
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
