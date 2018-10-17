import {combineReducers} from 'redux';
import loginReducer from './LoginReducer/loginReducer';
import forgotPasswordReducer from './ForgotPasswordReducer/forgotPasswordReducer';
import successTeamReducer from "./SuccessTeamReducer/successTeamReducer";
import classTrackerReducer from "./ClassTrackerReducer/classTrackerReducer";
const reducers = {
    login: loginReducer,
    forgotPassword: forgotPasswordReducer,
    mentor: successTeamReducer,
    classTracker: classTrackerReducer
};

export default combineReducers(reducers)

