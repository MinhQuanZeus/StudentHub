import React, {Component} from "react";
import {Redirect, Route} from 'react-router-dom';

import SuccessTeamContainer from "../SuccessTeamContainer/SuccessTeamContainer";
import TopBarContainer from "../TopBarContainer/TopBarContainer";
import NavBarContainer from "../NavBarContainer/NavBarContainer";
import NotificationContainer from "../NotificationContainer/NotificationContainer";
import ClassTrackerContainer from "../ClassTrackerContainer/ClassTrackerContainer";

class ApplicationContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        if (this.props.location.pathname === "/") {
            return (
                <Redirect to={{pathname: '/success-team'}}/>
            )
        }
        return (
            <div>
                <TopBarContainer/>
                <NavBarContainer/>
                <Route path="/success-team" component={SuccessTeamContainer}/>
                <Route path="/class-tracker" component={ClassTrackerContainer}/>
                {/*<Route path="/my-profile" component={MyProfileContainer}/>*/}
                <NotificationContainer/>
            </div>
        )
    }
}

export default ApplicationContainer;