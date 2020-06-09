import React from 'react';
import { NavLink } from "react-router-dom";

import { ReactComponent as Logo } from '../../logo.svg';
import { ReactComponent as Home } from '../common/icons/home.svg';
import { ReactComponent as Magnifier } from '../common/icons/search.svg';
import { ReactComponent as Library } from '../common/icons/book.svg';
import { ReactComponent as Info } from '../common/icons/info.svg';

export default function sideNav() {
    return (
        <div className="sideNav">

            <NavLink to="/" exact className="nav-logo" style={{ display: "flex", alignItems: "center" }}>
                <Logo /><span>Christian's<br /> Music</span>
            </NavLink>
            <ul className="page-links">
                <NavLink exact to="/">
                    <li>
                        <Home />
                        Home
                    </li>
                </NavLink>
                <NavLink to="/search">
                    <li>
                        <Magnifier />
                        Search
                    </li>
                </NavLink>
                <NavLink to="/collection">
                    <li>
                        <Library />
                        Library
                    </li>
                </NavLink>
                <NavLink to="/about">
                    <li>
                        <Info />
                        About
                    </li>
                </NavLink>
            </ul>
        </div >
    )
}