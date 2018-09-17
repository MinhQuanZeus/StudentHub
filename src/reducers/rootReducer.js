import {combineReducers} from 'redux';
import loginReducer from './LoginReducer/loginReducer';
import forgotPasswordReducer from './ForgotPasswordReducer/forgotPasswordReducer';
import successTeamReducer from "./SuccessTeamReducer/successTeamReducer";

const reducers = {
    login: loginReducer,
    forgotPassword: forgotPasswordReducer,
    mentor: successTeamReducer
};

export default combineReducers(reducers)

