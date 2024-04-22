import React, {useState} from 'react';
// MUI COMPONENTS
import {
    AppBar,
    Toolbar,
    IconButton,
    Box,
    Button,
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Typography, useTheme, styled
} from "@mui/material";
// ICONS
import MenuIcon from '@mui/icons-material/Menu';
import ListIcon from '@mui/icons-material/List';
import LabelIcon from '@mui/icons-material/Label';
import {Link} from "react-router-dom";

export const Navigation = () => {
    //styles
    const theme = useTheme();
    const sxStyles = {
        menuIcon: {
            marginRight: 2,
        },
        drawerList: {
            width: '200px',
        },
        link: {
            textDecoration: 'none',
            color: theme.palette.text.primary,
        },
        toolbar: {
            backgroundColor: 'primary.main',
        }
    }
    const StyledLink = styled(Link)(({theme}) => sxStyles.link);

    //state
    const [drawerOpen, setDrawerOpen] = useState(false);
    //function
    const toggleDrawer = () => {
        return setDrawerOpen(!drawerOpen);
    }

    const drawerItems = [
        {
            text: 'To-do List',
            icon: <ListIcon/>,
            link: '/todo-list',
        },
        {
            text: 'Tags',
            icon: <LabelIcon/>,
            link: '/tag-list',
        },
    ]

    return (
        <AppBar position={'fixed'}>
            <Toolbar sx={sxStyles.toolbar}>
                <IconButton onClick={toggleDrawer} sx={sxStyles.menuIcon} edge={'start'}><MenuIcon/></IconButton>
                <StyledLink to={'/'} >
                    <Typography variant={'h6'} color={'textPrimary'}>
                        TodoApp
                    </Typography>
                </StyledLink>
                <Box flexGrow={1} />
                <Button color={'info'} size={'large'}>Login</Button>
            </Toolbar>
            <Drawer anchor={'left'} variant={'temporary'}
                    onClose={toggleDrawer} onClick={toggleDrawer} open={drawerOpen}>
                <List sx={sxStyles.drawerList}>
                    {drawerItems.map(prop => (
                        <StyledLink to={prop.link} key={prop.text+'Link'}>
                            <ListItem button onClick={toggleDrawer}>
                                <ListItemIcon>{prop.icon}</ListItemIcon>
                                <ListItemText>{prop.text}</ListItemText>
                            </ListItem>
                        </StyledLink>
                    ))}
                </List>
            </Drawer>
        </AppBar>
    );
}