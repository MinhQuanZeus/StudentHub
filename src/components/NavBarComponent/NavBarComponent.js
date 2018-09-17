import React from 'react';
import Link from "react-router-dom/es/Link";

export const NavBarComponent = (props) => {

    return (
        <div className="navbar navbar-inverse navbar-fixed-left">
            <ul className="nav navbar-nav">
                <li><Link to="#">Dashboard</Link></li>
                <li><Link to="#">My profile</Link></li>
                <li><Link to="#">Academic</Link></li>
                <li><Link to="/">Success Team</Link></li>
            </ul>
        </div>
    )

};