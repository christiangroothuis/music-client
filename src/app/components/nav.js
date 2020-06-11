import React from 'react';
import { NavLink } from "react-router-dom";

import { ReactComponent as Music } from '../common/icons/music.svg';
import { ReactComponent as Home } from '../common/icons/home.svg';
import { ReactComponent as Magnifier } from '../common/icons/search.svg';
import { ReactComponent as Library } from '../common/icons/book.svg';
import { ReactComponent as Github } from '../common/icons/github.svg';
import { ReactComponent as ExternalLink } from '../common/icons/external-link.svg';

export default function sideNav() {
    return (
        <div className="sideNav">
            <NavLink to="/" exact className="nav-logo" style={{ display: "flex", alignItems: "center" }}>
                <Music /><span>Christian's<br />Music</span>
            </NavLink>
            <ul className="page-links">
                <li>
                    <NavLink exact to="/">
                        <Home />
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/search">
                        <Magnifier />
                        Search
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/collection">
                        <Library />
                        Library
                    </NavLink>
                </li>
                <li>
                    <a target='_blank' rel="noopener noreferrer" href='https://github.com/JuanGrooth/music-client'>
                        <Github />
                        Github
                        <ExternalLink className="right"/>
                    </a>
                </li>
            </ul>
        </div >
    )
}