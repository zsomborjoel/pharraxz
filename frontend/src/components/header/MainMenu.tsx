import React, { FC } from 'react'
import { IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';

export type MainMenuProps = {}

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
            <SwipeableDrawer
                anchor="left"
                open={isMenuOpen}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                <Box
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                    sx={{width:300}}
                >
                    <List>
                        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>
                                    <InboxIcon /> 
                                </ListItemIcon>
                            <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </SwipeableDrawer>
        </div>
    );
}

export default MainMenu;