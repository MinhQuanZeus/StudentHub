import {combineReducers} from 'redux';
import loginReducer from './LoginReducer/loginReducer';
import forgotPasswordReducer from './ForgotPasswordReducer/forgotPasswordReducer';

const reducers = {
    login: loginReducer,
    forgotPassword: forgotPasswordReducer
};

export default combineReducers(reducers)

