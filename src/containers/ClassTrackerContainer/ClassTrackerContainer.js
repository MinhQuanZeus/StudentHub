import React, { Component } from 'react';
import { connect } from 'react-redux';
import { onFetchClassTracker } from '../../actions/ClassTrackerActions/ClassTrackerActions';
import { onFetchAcademicProgram } from '../../actions/AcademicProgramActions/AcademicProgramActions';
import { ContentHeadingComponent } from '../../components/ContentHeadingComponent/ContentHeadingComponent';
import { TabsComponent } from '../../components/TabsComponent/TabsComponent';
import { TableComponent } from '../../components/TableComponent/TableComponent';
import { QuickLinkComponent } from '../../components/QuickLinkComponent/QuickLinkComponent';
import sharedStyles from '../../styles/styles.module.css';
import { getUniqueYears } from '../../helpers/Utils';

import { createShowLoadingAction } from '../../actions/LoadingActions';
import { AppContext } from '../AppContext';
class ClassTrackerContainer extends Component {
  state = {
    selectedYear: 2018,
    selectedTerm: 'spring'
  };

  updateYear = e => {
    const year = parseInt(e.target.value, 10);

    this.setState(prevState => {
      if (prevState.selectedYear !== year) {
        return { selectedYear: year };
      }
    });
  };

  updateTerm = term => {
    this.setState(prevState => {
      if (prevState.selectedTerm !== term) {
        return { selectedTerm: term };
      }
    });
  };

  render() {
    const { classTracker } = this.props;

    if (classTracker.loading) {
      return null;
    }

    return (
      <div className={sharedStyles['content-container']}>
        <QuickLinkComponent />
        <ContentHeadingComponent />
        <TabsComponent
          years={getUniqueYears(classTracker.classTracker)}
          selectedYear={this.state.selectedYear}
          updateYear={this.updateYear}
          updateTerm={this.updateTerm}
        />
        <TableComponent
          data={classTracker.classTracker}
          year={this.state.selectedYear}
          term={this.state.selectedTerm}
        />
      </div>
    );
  }
  componentWillMount() {
    this.props.onFetchClassTracker(this.props.loginInformation.x_access_token);
    this.props.onFetchAcademicProgram(
    this.props.loginInformation.x_access_token
    );
  }
}
ClassTrackerContainer.contextType = AppContext;

const mapStateToProps = state => {
  return {
    classTracker: state.classTracker,
    loginInformation: state.login.loginInformation,
    academic_program: state.academicProgram.academic_program
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchClassTracker: x_access_token => {
      dispatch(createShowLoadingAction());
      dispatch(onFetchClassTracker(x_access_token));
    },
    onFetchAcademicProgram: x_access_token =>
      dispatch(onFetchAcademicProgram(x_access_token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClassTrackerContainer);
