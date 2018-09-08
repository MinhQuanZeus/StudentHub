import Promise from "es6-promise";
import axios from 'axios';

import {apiConstants} from "../../constants/applicationConstants";
import {applicationStatusCode} from "../../constants/applicationConstants";
import {loginStatusConstant} from "../../constants/loginStatusConstants";
import {history} from "../../helpers/history";

export function login(email, password) {
    return dispatch => {
        dispatch(setLoginLogging(loginStatusConstant.LOGIN_PENDING, null));

        sendLoginRequest(email, password)
            .then(success => {
                dispatch(setLoginLogging(loginStatusConstant.LOGIN_SUCCESS, null));
                history.push({
                    pathname: '/home',
                    state: success.data
                });
            })
            .catch(err => {
                dispatch(setLoginLogging(loginStatusConstant.LOGIN_ERROR, err));
            })
    }
}

function sendLoginRequest(email, password) {
    return new Promise((resolve, reject) => {
        axios.post(getLoginPath(), buildPayload(email, password)).then(value => {
            if (value.data.status === applicationStatusCode.OK) {
                resolve(value.data);
            } else {
                reject(value.data);
            }
        })
    });
}

function setLoginLogging(type, value) {
    if (value !== null) {
        return {
            type: type,
            loginStatus: value
        }
    } else {
        return {
            type: type,
            loginStatus: type
        }
    }
}

function getLoginPath() {
    return apiConstants.BACKEND_URL + apiConstants.STUDENT_LOGIN_PATH;
}

function buildPayload(email, password) {
    return {
        email: email,
        password: password
    }
}