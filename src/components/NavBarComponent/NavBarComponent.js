import React from 'react';
import Link from "react-router-dom/es/Link";

export const NavBarComponent = (props) => {

    return (
        <div>
            <Link to="#">Dashboard</Link>
            <Link to="#">My profile</Link>
            <Link to="#">Academic</Link>
            <Link to="/">Success Team</Link>
        </div>
    )

};