import React, {Component} from "react";

import {MilestoneAvatarComponent} from "../../components/MilestoneAvatarComponent/MilestoneAvatarComponent";
import {ProgramInfoComponent} from "../../components/ProgramInfoComponent/ProgramInfoComponent";
import {DegreeAuditChartsComponent} from "../../components/DegreeAuditChartsComponent/DegreeAuditChartsComponent";
import {MilestoneTabsComponent} from "../../components/MilestoneTabsComponent/MilestoneTabsComponent";
import {MilestoneHeaderComponent} from "../../components/MilestoneHeaderComponent/MilestoneHeaderComponent";


class DegreeAuditContainer extends Component {
    render() {
        return (
            <div>
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

