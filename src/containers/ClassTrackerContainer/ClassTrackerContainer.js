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
import { AppContext } from '../AppContext';
import PropTypes from 'prop-types';

class ClassTrackerContainer extends Component {
  state = {
    selectedYear: 2018,
    selectedTerm: 'spring',
  };

  updateYear = (e) => {
    const year = parseInt(e.target.value, 10);

    this.setState((prevState) => {
      if (prevState.selectedYear !== year) {
        return { selectedYear: year };
      }
    });
  };

  updateTerm = (term) => {
    this.setState((prevState) => {
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
    const { user } = this.context;
    this.props.onFetchClassTracker(user.x_access_token);
    this.props.onFetchAcademicProgram(user.x_access_token);
  }
}
ClassTrackerContainer.contextType = AppContext;

const mapStateToProps = (state) => {
  return {
    classTracker: state.classTracker,
    academic_program: state.academicProgram.academic_program,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchClassTracker: (xAccessToken) => {
      dispatch(onFetchClassTracker(xAccessToken));
    },
    onFetchAcademicProgram: (xAccessToken) => {
      dispatch(onFetchAcademicProgram(xAccessToken));
    },
  };
};

ClassTrackerContainer.propTypes = {
  classTracker: PropTypes.object,
  onFetchClassTracker: PropTypes.func,
  onFetchAcademicProgram: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClassTrackerContainer);
