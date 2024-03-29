import React, { Component } from 'react';
import { MilestoneAvatarComponent } from '../../components/MilestoneAvatarComponent/MilestoneAvatarComponent';
import { ProgramInfoComponent } from '../../components/ProgramInfoComponent/ProgramInfoComponent';
import { MilestoneTableComponent } from '../../components/MilestoneTableComponent/MilestoneTableComponent';
import { MilestoneTabsComponent } from '../../components/MilestoneTabsComponent/MilestoneTabsComponent';
import { MilestoneHeaderComponent } from '../../components/MilestoneHeaderComponent/MilestoneHeaderComponent';
import sharedStyles from '../../styles/styles.module.css';
import { QuickLinkComponent } from '../../components/QuickLinkComponent/QuickLinkComponent';
import connect from 'react-redux/es/connect/connect';
import { onFetchMilestone } from '../../actions/MilestoneActions/MilestoneActions';
import { AppContext } from '../AppContext';
import PropTypes from 'prop-types';

class MilestoneContainer extends Component {
  constructor() {
    super();
    this.state = {
      commonInfoVisibility: true,
    };
  }

  componentWillMount() {
    const { user } = this.context;
    if (
      this.props.academic_program !== undefined &&
      this.props.academic_program !== null &&
      this.props.academic_program.length !== 0
    ) {
      this.props.onFetchMilestone(
        user.x_access_token,
        this.props.academic_program[0].academic_program_id
      );
    }
  }

  render() {
    return (
      <div className={sharedStyles['container-background']}>
        <QuickLinkComponent />
        <MilestoneHeaderComponent
          toggleCommonInfoVisibility={this.toggleCommonInfoVisibility}
          commonInfoVisibility={this.state.commonInfoVisibility}
        />
        {this.getCommonInfo()}
        <MilestoneTabsComponent
          currentPath={this.props.location.pathname}
          commonInfoVisibility={this.state.commonInfoVisibility}
        />
        <MilestoneTableComponent
          milestone={this.props.milestone}
          commonInfoVisibility={this.state.commonInfoVisibility}
        />
      </div>
    );
  }

  toggleCommonInfoVisibility = () => {
    this.setState((prevState) => {
      return { commonInfoVisibility: !prevState.commonInfoVisibility };
    });
  };

  getCommonInfo = () => {
    if (this.state.commonInfoVisibility) {
      return (
        <React.Fragment>
          <MilestoneAvatarComponent loginInformation={this.context.user} />
          <ProgramInfoComponent
            academic_program={this.props.academic_program}
          />
        </React.Fragment>
      );
    }
  };
}
MilestoneContainer.contextType = AppContext;

const mapStateToProps = (state) => {
  return {
    academic_program: state.academicProgram.academic_program,
    milestone: state.mileStone.milestone,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchMilestone: (xAccessToken, academicProgramId) => {
      dispatch(onFetchMilestone(xAccessToken, academicProgramId));
    },
  };
};

MilestoneContainer.propTypes = {
  academic_program: PropTypes.array,
  onFetchMilestone: PropTypes.func,
  onFetchAcademicProgram: PropTypes.func,
  location: PropTypes.object,
  milestone: PropTypes.array,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MilestoneContainer);
