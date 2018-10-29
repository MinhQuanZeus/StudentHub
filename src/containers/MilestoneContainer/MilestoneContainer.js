import React, {Component} from "react";

import {MilestoneAvatarComponent} from "../../components/MilestoneAvatarComponent/MilestoneAvatarComponent";
import {ProgramInfoComponent} from "../../components/ProgramInfoComponent/ProgramInfoComponent";
import {MilestoneTableComponent} from "../../components/MilestoneTableComponent/MilestoneTableComponent";
import {MilestoneTabsComponent} from "../../components/MilestoneTabsComponent/MilestoneTabsComponent";
import {MilestoneHeaderComponent} from "../../components/MilestoneHeaderComponent/MilestoneHeaderComponent";
import sharedStyles from '../../styles/styles.css';

class MilestoneContainer extends Component {
    render() {
        return (
            <div className={sharedStyles["container-background"]}>
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
