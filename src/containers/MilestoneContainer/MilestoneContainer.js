import React, {Component} from "react";

import {MilestoneAvatarComponent} from "../../components/MilestoneAvatarComponent/MilestoneAvatarComponent";
import {ProgramInfoComponent} from "../../components/ProgramInfoComponent/ProgramInfoComponent";
import {MilestoneTableComponent} from "../../components/MilestoneTableComponent/MilestoneTableComponent";
import {MilestoneTabsComponent} from "../../components/MilestoneTabsComponent/MilestoneTabsComponent";
import {MilestoneHeaderComponent} from "../../components/MilestoneHeaderComponent/MilestoneHeaderComponent";

class MilestoneContainer extends Component {
    render() {
        return (
            <div>
            <MilestoneHeaderComponent />
                <MilestoneAvatarComponent />
                <ProgramInfoComponent />
                <MilestoneTabsComponent />
                <MilestoneTableComponent />
            </div>
        )
    }
}
export default MilestoneContainer;
