import React, { FC } from 'react';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ArticleIcon from '@mui/icons-material/Article';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

export type MainMenuProps = {}

const menuItems = [
    {
        id: 0,
        menuLabel: 'Order',
        menuIcon: ArticleIcon,
        link: '/order',
    },
    {
        id: 1,
        menuLabel: 'Menu 2',
        menuIcon: ArticleIcon,
        link: '/menu2',
    },
    {
        id: 2,
        menuLabel: 'Menu 3',
        menuIcon: ArticleIcon,
        link: '/menu3',
    },
];

const MainMenu: FC<MainMenuProps> = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const toggleDrawer = (open: boolean) => () => {
        setIsMenuOpen(false);
    };

    return (
        <div>
            <IconButton onClick={() => setIsMenuOpen((isOpen) => !isOpen)}>
                <MenuIcon/>
            </IconButton>
            <SwipeableDrawer anchor="left"
                open={isMenuOpen}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                <Box role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                    sx={{ width: 300 }}
                >
                    <List>
                        {menuItems.map(({ id, menuLabel, menuIcon: Icon, link }) => (
                            <Link key={id} to={link} style={{ color: '#1976d2' }} onClick={() => setIsMenuOpen(false)}>
                                <ListItem button key={menuLabel}>
                                    <ListItemIcon>
                                        <Icon/>
                                    </ListItemIcon>
                                    <ListItemText primary={menuLabel} />
                                </ListItem>
                            </Link>
                        ))}
                    </List>
                </Box>
            </SwipeableDrawer>
        </div>
    );
};

export default MainMenu;
