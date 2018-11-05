import React, {Component} from 'react';
import {connect} from 'react-redux';
import {onFetchClassTracker} from '../../actions/ClassTrackerActions/ClassTrackerActions';
import {onFetchAcademicProgram} from '../../actions/AcademicProgramActions/AcademicProgramActions';
import {ContentHeadingComponent} from '../../components/ContentHeadingComponent/ContentHeadingComponent'
import {TabsComponent} from '../../components/TabsComponent/TabsComponent'
import {TableComponent} from '../../components/TableComponent/TableComponent'
import { QuickLinkComponentClassTracker } from '../../components/QuickLinkComponentClassTracker/QuickLinkComponentClassTracker';
import sharedStyles from '../../styles/styles.css';

class ClassTrackerContainer extends Component {
    render() {
        return (
            <div className={sharedStyles["content-container"]}>
                <QuickLinkComponentClassTracker/>
                <ContentHeadingComponent />
                <TabsComponent />
                <TableComponent data={this.props.classTracker} />
            </div>
        )
    }
    componentWillMount() {
        this.props.onFetchClassTracker(this.props.loginInformation.x_access_token);
        this.props.onFetchAcademicProgram(this.props.loginInformation.x_access_token);
    }  
} 



const mapStateToProps = (state) => {
    return {
        classTracker: state.classTracker,
        loginInformation: state.login.loginInformation,
        academic_program: state.academicProgram.academic_program
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchClassTracker: (x_access_token) => dispatch(onFetchClassTracker(x_access_token)),
        onFetchAcademicProgram: (x_access_token) => dispatch(onFetchAcademicProgram(x_access_token))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ClassTrackerContainer);

