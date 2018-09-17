import React from 'react';
import Link from "react-router-dom/es/Link";

export const TopBarComponent = (props) => {
    let {loginInformation} = props;

    return (
        <nav className="navbar navbar-light bg-light">
            <Link className="navbar-brand" to="/"><img src="images/shape.svg" className="Shape" alt=""/></Link>
            <h5>
                <span className="top-bar-welcome-text">Welcome</span>
                &nbsp;
                <span className="top-bar-user-full-name">{loginInformation.first_name + " " + loginInformation.last_name}</span>
            </h5>
            <i>{/*bell*/}</i>
            <i>{/*message*/}</i>
            <img alt="">{loginInformation.photo}</img>
            <p className="top-bar-user-name">{loginInformation.first_name + " " + loginInformation.last_name}</p>
        </nav>
    )
}