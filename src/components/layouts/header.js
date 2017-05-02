import React, { Component } from 'react';
import SideBar from './side-bar'
import Logo from './logo'
import RightNavigation from './right-navigation'

const Header = () =>
    <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <Logo />
        <SideBar />
    </nav>

export default Header;
