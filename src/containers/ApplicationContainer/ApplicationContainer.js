import React, {Component} from "react";
import SuccessTeamContainer from "../SuccessTeamContainer/SuccessTeamContainer";
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
                <SuccessTeamContainer/>
            </div>
        )
    }
}

export default ApplicationContainer;