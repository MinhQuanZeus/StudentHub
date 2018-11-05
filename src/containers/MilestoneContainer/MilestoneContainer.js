import React, {Component} from "react";

import {MilestoneAvatarComponent} from "../../components/MilestoneAvatarComponent/MilestoneAvatarComponent";
import {ProgramInfoComponent} from "../../components/ProgramInfoComponent/ProgramInfoComponent";
import {MilestoneTableComponent} from "../../components/MilestoneTableComponent/MilestoneTableComponent";
import {MilestoneTabsComponent} from "../../components/MilestoneTabsComponent/MilestoneTabsComponent";
import {MilestoneHeaderComponent} from "../../components/MilestoneHeaderComponent/MilestoneHeaderComponent";
import sharedStyles from '../../styles/styles.css';
import {QuickLinkComponent} from "../../components/QuickLinkComponent/QuickLinkComponent";
import connect from "react-redux/es/connect/connect";
import {onFetchMilestone} from "../../actions/MilestoneActions/MilestoneActions";

class MilestoneContainer extends Component {

    componentWillMount() {
        if (this.props.academic_program !== undefined && this.props.academic_program !== null) {
            this.props.onFetchMilestone(this.props.loginInformation.x_access_token, this.props.academic_program[0].academic_program_id);
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
                <MilestoneTableComponent milestone={this.props.milestone}/>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        loginInformation: state.login.loginInformation,
        academic_program: state.academicProgram.academic_program,
        milestone: state.mileStone.milestone
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchMilestone: (x_access_token, academic_program_id) => dispatch(onFetchMilestone(x_access_token, academic_program_id))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(MilestoneContainer);
