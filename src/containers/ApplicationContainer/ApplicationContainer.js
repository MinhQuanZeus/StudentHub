import React, {Component} from "react";

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
            </div>
        )
    }
}

export default ApplicationContainer;