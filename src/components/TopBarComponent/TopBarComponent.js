import React from 'react';
import Link from "react-router-dom/es/Link";

export const TopBarComponent = (props) => {
    let {loginInformation} = props;
    return (
        <div>
            <Link to="/">Logo</Link>
            <h3>Welcome {loginInformation.first_name + " " + loginInformation.last_name}</h3>
            <i>{/*bell*/}</i>
            <i>{/*message*/}</i>
            <img alt="">{loginInformation.photo}</img>
            <p>{loginInformation.first_name + " " + loginInformation.last_name}</p>
        </div>
    )
}