import React, {Component} from "react";

import {MilestoneAvatarComponent} from "../../components/MilestoneAvatarComponent/MilestoneAvatarComponent";
import {ProgramInfoComponent} from "../../components/ProgramInfoComponent/ProgramInfoComponent";
import {DegreeAuditChartsComponent} from "../../components/DegreeAuditChartsComponent/DegreeAuditChartsComponent";
import {MilestoneTabsComponent} from "../../components/MilestoneTabsComponent/MilestoneTabsComponent";
import {MilestoneHeaderComponent} from "../../components/MilestoneHeaderComponent/MilestoneHeaderComponent";
import sharedStyles from '../../styles/styles.css';
import {QuickLinkComponent} from "../../components/QuickLinkComponent/QuickLinkComponent";
import connect from "react-redux/es/connect/connect";
import {onFetchDegreeAudit} from "../../actions/DegreeAuditActions/DegreeAuditActions";

class DegreeAuditContainer extends Component {

    componentWillMount() {
        if (this.props.academic_program !== undefined && this.props.academic_program !== null) {
            this.props.onFetchDegreeAudit(this.props.loginInformation.x_access_token, this.props.academic_program[0].academic_program_id);
        }
    }

    render() {
        return (
            <div className={sharedStyles["container-background"]}>
                <QuickLinkComponent/>
                <MilestoneHeaderComponent/>
                <MilestoneAvatarComponent loginInformation={this.props.loginInformation}/>
                <ProgramInfoComponent academic_program={this.props.academic_program}/>
                <MilestoneTabsComponent/>
                <DegreeAuditChartsComponent degreeAudit={this.props.degreeAudit}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loginInformation: state.login.loginInformation,
        academic_program: state.academicProgram.academic_program,
        degreeAudit: state.degreeAudit.degreeAudit
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchDegreeAudit: (x_access_token, academic_program_id) => dispatch(onFetchDegreeAudit(x_access_token, academic_program_id))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(DegreeAuditContainer);

