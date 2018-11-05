import {combineReducers} from 'redux';
import loginReducer from './LoginReducer/loginReducer';
import forgotPasswordReducer from './ForgotPasswordReducer/forgotPasswordReducer';
import successTeamReducer from "./SuccessTeamReducer/successTeamReducer";
import classTrackerReducer from "./ClassTrackerReducer/classTrackerReducer";
import degreeAuditReducer from "./DegreeAuditReducer/degreeAuditReducer";
import milestoneReducer from "./MileStoneReducer/milestoneReducer";
import academicProgramReducer from "./AcademicProgramReducer/AcademicProgramReducer";

const reducers = {
    login: loginReducer,
    forgotPassword: forgotPasswordReducer,
    mentor: successTeamReducer,
    classTracker: classTrackerReducer,
    degreeAudit: degreeAuditReducer,
    mileStone: milestoneReducer,
    academicProgram: academicProgramReducer
};

export default combineReducers(reducers)

