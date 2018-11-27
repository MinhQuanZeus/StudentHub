import React, {Component} from "react";
import {Redirect, Route} from 'react-router-dom';

import SuccessTeamContainer from "../SuccessTeamContainer/SuccessTeamContainer";
import TopBarContainer from "../TopBarContainer/TopBarContainer";
import NavBarContainer from "../NavBarContainer/NavBarContainer";
import NotificationContainer from "../NotificationContainer/NotificationContainer";
import ClassTrackerContainer from "../ClassTrackerContainer/ClassTrackerContainer";
import MyProfileContainer from "../MyProfileContainer/MyProfileContainer";
import MilestoneContainer from "../MilestoneContainer/MilestoneContainer";
import DegreeAuditContainer from "../DegreeAuditContainer/DegreeAuditContainer";
import ChecklistContainer from "../ChecklistContainer/ChecklistContainer";

class ApplicationContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        console.log('something was updated');
        if (this.props.location.pathname === "/") {
            return (
                <Redirect to={{pathname: '/my-profile'}}/>
            )
        }
        return (
            <div>
                <TopBarContainer/>
                <NavBarContainer/>
                <Route path="/success-team" component={SuccessTeamContainer}/>
                <Route path="/milestone" component={MilestoneContainer}/>
                <Route path="/degree-audit" component={DegreeAuditContainer}/>
                <Route path="/class-tracker" component={ClassTrackerContainer}/>
                <Route path="/my-profile" component={MyProfileContainer}/>
                <Route path="/check-list" component={ChecklistContainer}/>
                <NotificationContainer/>
            </div>
        )
    }
}

export default ApplicationContainer;