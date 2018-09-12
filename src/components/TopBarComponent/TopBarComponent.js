import React from 'react';
import Link from "react-router-dom/es/Link";

export const TopBarComponent = (props) => {
    // let studentInformation = props.studentInformation;
    return (
        <div>
            <Link to="/">Logo</Link>
            <h3>Welcome {/*student name*/}</h3>
            <i>{/*bell*/}</i>
            <i>{/*message*/}</i>
            <img>{/*student avatar*/}</img>
            <p>{/*student name*/}</p>
        </div>
    )
}