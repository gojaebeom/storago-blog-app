import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {Link} from 'react-router-dom';
import '../css/menuButton.scss';

const MobileHeader = (props) => {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        setAnchorEl(null);
        props.loginCheck(false);
    }


    return (
        <div className="menu-btn" title="매뉴">
        <Button  aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            <i className="ri-menu-2-line"></i>
        </Button>
        <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            <Link to="/">
                <MenuItem onClick={handleClose}>홈</MenuItem>
            </Link>
            <Link to="/toy">
                <MenuItem onClick={handleClose}>토이프로젝트</MenuItem>
            </Link>
            <Link to="/app">
                <MenuItem onClick={handleClose}>어플리케이션</MenuItem>
            </Link>
            <Link to="/odds">
                <MenuItem onClick={handleClose}>잡동사니</MenuItem>
            </Link>
            {
                props.isLogged === false ?
                <Link to="/login">
                    <MenuItem onClick={handleClose}>관리자 로그인</MenuItem>
                </Link>
                :
                <div>
                <Link to="/admin">
                    <MenuItem onClick={handleClose}>관리자 페이지</MenuItem>
                </Link>
                <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
                </div>
            }
            
            
        </Menu>
        </div>
    );
};

export default MobileHeader;