import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../context/auth'
import { AppBar, Button, IconButton, makeStyles, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core'
import PublishIcon from '@material-ui/icons/Publish';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import '../styles/menuBarStyles.scss'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1
    },
    toolbar: {
        background: '#101010',
        borderBottom: '1px solid #333'
    },
    menu: {
        '& .MuiPaper-rounded': {
            borderRadius: 'unset',
        },
        '& .MuiMenu-paper': {
            backgroundColor: '#6d6d6d',
            color: '#fff'
        },
        '& .MuiList-padding': {
            paddingBottom: 0
        }
    },
    userItem: {
        padding: '5px 16px 16px 16px',
        color: '#ccc',
        textTransform: 'uppercase'
    },
    menuItem: {
        borderTop: '1px solid #333'
    },
    icon: {
        marginRight: '10px'
    },
}));

const MenuBar = () => {
    const { user, logout } = useContext(AuthContext);
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);

    const openMenuHandler = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
    const closeMenuHandler = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="sticky">
        <Toolbar className={classes.toolbar}>
            <Typography variant="h6" className={classes.title}>
                <NavLink to="/" exact className="nav-link">
                    ArtBase
                </NavLink>
            </Typography>

            {
                user
                ? (<>
                    <Button>
                        <NavLink to="/upload" className="nav-link">
                            <PublishIcon fontSize='small'/> Upload
                        </NavLink>
                    </Button>

                    <IconButton
                        aria-label="menu of current user"
                        aria-controls="user-menu"
                        aria-haspopup="true"
                        color="inherit"
                        onClick={openMenuHandler}
                    >
                        {
                            user.img
                            ? (<img className="user" src={"/" + user.img.path} alt={user.img.filename}/>)
                            : (<AccountCircle fontSize="large"/>)
                        }
                    </IconButton>

                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={closeMenuHandler}
                        className={classes.menu}
                    >
                        <div className={classes.userItem}>{user.username}</div>
                        <MenuItem className={classes.menuItem} onClick={closeMenuHandler}>
                            <NavLink to="/portfolio" className="nav-link">
                                <PermMediaIcon className={classes.icon}/> Portfolio
                            </NavLink>
                        </MenuItem>
                        <MenuItem className={classes.menuItem} onClick={closeMenuHandler}>
                            <NavLink onClick={logout} to="/login" className="nav-link">
                                <ExitToAppIcon className={classes.icon}/> Logout
                            </NavLink>
                        </MenuItem>
                    </Menu>
                  </>)
                : (<>
                    <Button>
                        <NavLink to="/register" className="nav-link">
                            Register
                        </NavLink>
                    </Button>
                    <Button>
                        <NavLink to="/login" className="nav-link">
                            Login
                        </NavLink>
                    </Button>
                  </>)
            }
        </Toolbar>
        </AppBar>
    )
}

export default MenuBar
