import React, {Component} from "react";
import {Route} from 'react-router-dom';

import TopBarContainer from "../TopBarContainer/TopBarContainer";
import NavBarContainer from "../NavBarContainer/NavBarContainer";

class ApplicationContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <TopBarContainer/>
                <NavBarContainer/>
                <Route path="/success-team" component={/*Success Team Container here*/}/>
            </div>
        )
    }
}

export default ApplicationContainer;