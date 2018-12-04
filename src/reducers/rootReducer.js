import {combineReducers} from 'redux';
import loginReducer from './LoginReducer/loginReducer';
import forgotPasswordReducer from './ForgotPasswordReducer/forgotPasswordReducer';
import successTeamReducer from "./SuccessTeamReducer/successTeamReducer";
import classTrackerReducer from "./ClassTrackerReducer/classTrackerReducer";
import degreeAuditReducer from "./DegreeAuditReducer/degreeAuditReducer";
import milestoneReducer from "./MileStoneReducer/milestoneReducer";
import academicProgramReducer from "./AcademicProgramReducer/AcademicProgramReducer";
import checkListReducer from "./CheckListReducer/CheckListReducer";
import flagsListReducer from "./FlagsListReducer/flagsListReducer";

const reducers = {
    login: loginReducer,
    forgotPassword: forgotPasswordReducer,
    mentor: successTeamReducer,
    classTracker: classTrackerReducer,
    degreeAudit: degreeAuditReducer,
    mileStone: milestoneReducer,
    academicProgram: academicProgramReducer,
    checkList: checkListReducer,
    flagsList: flagsListReducer,
};

export default combineReducers(reducers)
