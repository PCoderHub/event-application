import { AppBar, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUserInfo } from '../redux_toolkit/userReducer';

function Navbar({title, leftText, leftIcon, link, user}) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (link) => () => {
        navigate(link);
    }

    const handleMenu = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(addUserInfo({}));
        navigate('/');
    }

  return (
    <AppBar sx={{ backgroundColor: 'white'}}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between'}}>
            <IconButton onClick={handleClick(link)}>
                <Typography variant='h6'>{leftText}</Typography>
                {leftIcon}
            </IconButton>
            <Typography variant="h6" color="black">{title}</Typography>
            <IconButton 
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleMenu}>
                <AccountCircleIcon />
                <Typography variant='h6'>{user.name}</Typography>
            </IconButton>
            <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
            'aria-labelledby': 'basic-button',
            }}
            >
                <MenuItem onClick={handleClose}><Button onClick={handleLogout}>Logout</Button></MenuItem>
            </Menu>
        </Toolbar>
    </AppBar>
  )
}

Navbar.propTypes = {
    title: PropTypes.node,
    leftText: PropTypes.node,
    leftIcon: PropTypes.node,
    link: PropTypes.node,
    user: PropTypes.node
}

export default Navbar;
