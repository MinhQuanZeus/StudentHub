import React, {Component} from "react";
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
        return (
            <div>
                <TopBarContainer/>
                <NavBarContainer/>
                <ClassTrackerContainer/>
                <NotificationContainer/>
            </div>
        )
    }
}

export default ApplicationContainer;