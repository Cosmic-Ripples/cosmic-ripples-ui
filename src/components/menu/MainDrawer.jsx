/**
 * @file MainDrawer.jsx
 */

import React, { Fragment, useReducer } from 'react';

import {
    Box,
    Stack,
    Drawer,
    Button,
    Toolbar,
    AppBar as MuiAppBar,
    IconButton,
    Typography,
    CssBaseline,
    // eslint-disable-next-line no-unused-vars
    List, ListItem, ListItemIcon, ListItemText,
} from '@mui/material';

import Hamburger from '@mui/icons-material/Menu';

// eslint-disable-next-line no-unused-vars
import { styled, useTheme } from '@mui/material/styles';

import Search from './Search';

import {
    presentationComponents, containerComponents,
} from './MenuPresentationComponents';

import {
    // eslint-disable-next-line no-unused-vars
    PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR, QUATERNARY_COLOR
} from '../../config/color_palette';

import { initialState, reducers } from '../../reducers';
import { toggleDrawer, click_on_menu_item } from '../../actions';




const drawerWidth = 240;


const MainContent = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: '100%',
        height: '100%',
        flexGrow: 1,
        padding: theme.spacing(3),
        backgroundColor: PRIMARY_COLOR,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    })
);


const AppBar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        backgroundColor: PRIMARY_COLOR,
        zIndex: theme.zIndex.drawer + 1,
        width: '100%',
    })
);


const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    /* necessary for content to be below app bar */
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));


const TopBar = (props) => {
    const { open, toggleDrawer, title, user, logoutAction } = props;

    return (
        <Fragment>
            <AppBar position='fixed' open={open} >
                <Toolbar>
                    <IconButton aria-label='open drawer'
                        edge='start'
                        color='inherit'
                        onClick={toggleDrawer}
                        sx={{ mr: 3 }}
                    >
                        <Hamburger />
                    </IconButton>

                    <Typography variant='h6' noWrap component='div' >
                        {title}
                    </Typography>

                    <Box
                        position='static'
                        width='100%'
                        justifyContent='center'
                        flex={1}
                    >
                        <Typography component='div'
                            variant='h6'
                            align='center'
                            noWrap
                        >
                            {user}! Welcome!
                        </Typography>
                    </Box>

                    <Search />

                    <Box width='100%' justifyContent='right' flex={0} >
                        <Button variant='outlined' color='inherit'
                            onClick={() => logoutAction()}
                        >
                            <Typography variant='h7' noWrap >
                                Logout
                            </Typography>
                        </Button>
                    </Box>

                </Toolbar>

            </AppBar>

        </Fragment>
    );
};


/**
 * Returns an array of ListItem components for each of the menu items.
 * @param {*} props.selectedMenuItem the currently selected item to display in
 * the main content area.
 * @param {*} props.onClick the function to call when a menu item is clicked.
 * @param {*} props.menuItemTitles the titles of the menu items to display.
 * @returns an array of ListItem components for each of the menu items.
 * @todo
 * 1) filter out certain menu items (i.e. we don't want to see Artist or
 * Album as a selectable menu itm here, we want that view to be navigated to
 * from the other views Artist).
 * 2) rename to LibraryListItems ?
 */
const PresentationListItems = (props) => {
    const { selectedMenuItem, onClick, menuItemTitles } = props;

    return (
        <Fragment>
            {menuItemTitles.map((title) =>
                <ListItem button onClick={() => onClick(title)} key={title}
                    sx={{
                        backgroundColor: selectedMenuItem === title ? PRIMARY_COLOR : 'inherit',
                        '&:hover': {
                            backgroundColor: 'grey', // TODO: change to a better color
                        },
                    }}
                >
                    <ListItemText key={title}
                        primary={title}
                        sx={{ color: QUATERNARY_COLOR }}
                    />
                </ListItem>
            )}
        </Fragment>
    );
};


/**
 * Returns an array of ListItem components for each of the menu items.
 * @param {*} props.selectedMenuItem the currently selected item to display in
 * the main content area.
 * @param {*} props.onClick the function to call when a menu item is clicked.
 * @param {*} props.menuItemTitles the titles of the menu items to display.
 * @returns an array of ListItem components for each of the menu items.
 * @todo
 * 1) rename to SettingsListItems ?
 */
const ContainerListItems = (props) => {
    const { menuItemTitles, onClick } = props;

    return (
        <>
            {menuItemTitles.map(title =>
                <ListItem button key={title} onClick={() => onClick(title)} >
                    <ListItemText
                        key={title}
                        primary={title}
                        sx={{ color: QUATERNARY_COLOR }}
                    />
                </ListItem>
            )}
        </>
    );
};


const findSelectedComponent = (selectedMenuItem, propsPayload) => {
    const component = [
        ...presentationComponents(propsPayload),
        ...containerComponents(),
    ].filter(comp => comp.title === selectedMenuItem);

    if (component.length === 1) {
        return component[0];
    }

    return {
        title: null,
        component: null,
    }
};


function LeftBannerDrawer(props) {
    const { open, selectedMenuItem, dispatch } = props;

    return (
        <Drawer
            open={open}
            variant='persistent'
            anchor='top'
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    height: '90%',
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    border: '1px solid #000',
                    backgroundColor: SECONDARY_COLOR,
                },
            }}
        >
            <DrawerHeader />
            <Stack aria-label='drawer content'
                direction='column'
                sx={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'left',
                    justifyContent: 'space-between',
                    p: 1,
                }}
            >
                <Stack aria-label='library'
                    direction='column'
                    sx={{
                        height: '50%',
                        display: 'flex',
                        alignItems: 'left',
                        justifyContent: 'flex-start',
                    }}
                >
                    <Typography component='div'
                        variant='h6'
                        align='center'
                        noWrap
                        sx={{ color: QUATERNARY_COLOR }}
                    >
                        Library
                    </Typography>
                    <List>
                        <PresentationListItems
                            selectedMenuItem={selectedMenuItem}
                            onClick={(title) => dispatch(click_on_menu_item(title))}
                            menuItemTitles={presentationComponents().map(comp => comp.title)}
                        />
                    </List>
                </Stack>
                <Stack aria-label='settings'
                    direction='column'
                    sx={{
                        height: '50%',
                        display: 'flex',
                        alignItems: 'left',
                        justifyContent: 'flex-end',
                    }}
                >
                    <Typography component='div'
                        variant='h6'
                        align='center'
                        noWrap
                        sx={{ color: QUATERNARY_COLOR }}
                    >
                        Settings
                    </Typography>
                    <List >
                        <ContainerListItems
                            selectedMenuItem={selectedMenuItem}
                            onClick={(title) => dispatch(click_on_menu_item(title))}
                            menuItemTitles={containerComponents().map(comp => comp.title)}
                        />
                    </List>
                </Stack>
            </Stack>
        </Drawer>
    );
}


export default function MainDrawer(props) {
    const { title, user, logoutAction, setNewQueueAndPlay } = props;

    const [state, dispatch] = useReducer(reducers, undefined, initialState);
    const { open, selectedMenuItem } = state;

    /* props payload */
    const payload = { ...state, setNewQueueAndPlay, dispatch };

    return (
        <Box sx={{ width: '100%', height: '90%', display: 'flex' }} >
            <CssBaseline />

            <TopBar open={open}
                toggleDrawer={() => dispatch(toggleDrawer(open))}
                title={title}
                user={user}
                logoutAction={logoutAction}
            />

            <LeftBannerDrawer open={open}
                selectedMenuItem={selectedMenuItem}
                dispatch={dispatch}
            />

            <MainContent open={open} >
                <DrawerHeader />
                <Box sx={{ width: '100%', height: '100%' }} >
                    {findSelectedComponent(selectedMenuItem, payload).component}
                </Box>
            </MainContent>

        </Box >
    );
}
