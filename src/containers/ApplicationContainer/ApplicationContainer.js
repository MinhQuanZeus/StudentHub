import React, {Component} from "react";
import {Redirect, Route} from 'react-router-dom';

import SuccessTeamContainer from "../SuccessTeamContainer/SuccessTeamContainer";
import TopBarContainer from "../TopBarContainer/TopBarContainer";
import NavBarContainer from "../NavBarContainer/NavBarContainer";
import NotificationContainer from "../NotificationContainer/NotificationContainer";
import ClassTrackerContainer from "../ClassTrackerContainer/ClassTrackerContainer";
import $ from 'jquery';
import MyProfileContainer from "../MyProfileContainer/MyProfileContainer";
import MilestoneContainer from "../MilestoneContainer/MilestoneContainer";
import DegreeAuditContainer from "../DegreeAuditContainer/DegreeAuditContainer";
import ChecklistContainer from "../ChecklistContainer/ChecklistContainer";
import FlagsListContainer from '../FlagsListContainer/FlagsListContainer';
import FlagManagerDetailsContainer from "../FlagManagerDetailsContainer/FlagManagerDetailsContainer.js";
import CalendarContainer from "../CalendarContainer/CalendarContainer";

class ApplicationContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }
      componentWillMount() {
        $('.chatBotLoading').remove()
        $('.lex-web-ui-iframe').remove()
    }
    render() {
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
                <Route exact path='/flags' component={FlagsListContainer} />
                <Route path='/flags/:id' component={FlagManagerDetailsContainer} />
                <Route path='/calendar' component={CalendarContainer} />
                <NotificationContainer/>
            </div>
        )
    }
}

export default ApplicationContainer;
