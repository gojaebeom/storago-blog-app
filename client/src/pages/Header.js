import React from 'react';
import {NavLink} from 'react-router-dom';
import '../css/navigation.scss';
import MobileHeader from './MobileHeader';

//header Component : 상단매뉴, 링크를 사용한 페이지 전환 기능
function Header(props){

    //NavLink 클릭시 적용될 스타일
    const activeStyle ={
        background:`#167be0`
    }

    return(
        <nav className="navigation">
            <MobileHeader
                isLogged={props.isLogged}
                loginCheck={props.loginCheck}
            />
            <figure className="logo">
                <a href="http://storago.io:4000/welcome" title="소개페이지 바로가기">
                    {/* <i className="ri-reactjs-fill"></i> */}
                    Storago.io
                </a>
            </figure>

            <ul className="menus">
                <li className="menu">
                    <NavLink exact to="/" activeStyle={activeStyle}>홈</NavLink>
                </li>
                <li className="menu">
                    <NavLink to="/toy" activeStyle={activeStyle}>토이프로젝트</NavLink>
                </li>
                <li className="menu">
                    <NavLink to="/app" activeStyle={activeStyle}>어플리케이션</NavLink>
                </li>
                <li className="menu">
                    <NavLink to="/odds" activeStyle={activeStyle}>잡동사니</NavLink>
                </li>
            </ul>

            <ul className="login-menus">
                {
                    props.isLogged === false ? 
                    <li className="login-menu">
                        <NavLink to="/login"  activeStyle={activeStyle}>
                            Login
                        </NavLink>
                    </li>
                    :
                    <>
                        <li className="login-menu">    
                            <NavLink to="/admin" activeStyle={activeStyle}>관리자페이지</NavLink>    
                        </li>
                        <li className="login-menu log-drop">
                            <div className="login-user-wrap">
                                {props.adminInfo}
                            </div>
                            <div className="logout-wrap">
                                <Logout loginCheck={props.loginCheck}/>
                            </div>          
                        </li>
                    </>
                }  
            </ul>
        </nav>
        
    )
}

function Logout(props){

    const handleLogout = ()=>{
        props.loginCheck(false);
    }

    return(
        <div onClick={handleLogout}>로그아웃</div>
    )
}

export default Header;



