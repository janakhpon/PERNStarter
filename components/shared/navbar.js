import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HelpIcon from '@material-ui/icons/Help';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import Link from '../../src/Link';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    sidebar: {
        background: 'transparent',
        boxShadow: 'none',
    },
    Drawer: {
        background: '#1d3557',
        color: 'white',
        borderRadius: '0.3rem',
        margin: '0.2rem',
        zIndex: 1000,
        transition: '2s',
    }
}))

export default function PageNavbar() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [side]: open });
    };

    const sideList = side => (
        <div
            className="div_list"
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
            <List className="div_list__container">
                <ListItem button key={`Home`} component={Link} naked href="/">
                    <ListItemIcon><HomeIcon className="icon" /></ListItemIcon>
                    <ListItemText primary={`HOME`} />
                </ListItem>
                <ListItem button key={`About`} component={Link} naked href="/about">
                    <ListItemIcon><InfoIcon className="icon" /></ListItemIcon>
                    <ListItemText primary={`ABOUT`} />
                </ListItem>
            </List>
            <Divider />
            <List className="div_list__container">
                <ListItem button key={`Help`} component={Link} naked href="/help">
                    <ListItemIcon><HelpIcon className="icon" /></ListItemIcon>
                    <ListItemText primary={`HELP`} />
                </ListItem>
            </List>
        </div>
    );


    return (
        <div className={classes.root}>
            <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none' }}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer('left', true)}>
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer open={state.left} onClose={toggleDrawer('left', false)} PaperProps={{
                classes: {
                    root: classes.Drawer
                }
            }}>
                {sideList('left')}
            </Drawer>
        </div>
    );
}