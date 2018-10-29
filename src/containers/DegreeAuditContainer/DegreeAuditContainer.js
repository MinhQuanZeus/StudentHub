import React, {Component} from "react";

import {MilestoneAvatarComponent} from "../../components/MilestoneAvatarComponent/MilestoneAvatarComponent";
import {ProgramInfoComponent} from "../../components/ProgramInfoComponent/ProgramInfoComponent";
import {DegreeAuditChartsComponent} from "../../components/DegreeAuditChartsComponent/DegreeAuditChartsComponent";
import {MilestoneTabsComponent} from "../../components/MilestoneTabsComponent/MilestoneTabsComponent";
import {MilestoneHeaderComponent} from "../../components/MilestoneHeaderComponent/MilestoneHeaderComponent";
import sharedStyles from '../../styles/styles.css';

class DegreeAuditContainer extends Component {
    render() {
        return (
            <div className={sharedStyles["container-background"]}>
            <MilestoneHeaderComponent />
                <MilestoneAvatarComponent />
                <ProgramInfoComponent />
                <MilestoneTabsComponent />
                <DegreeAuditChartsComponent />
            </div>
        )
    }
}
export default DegreeAuditContainer;

