import Promise from "es6-promise";
import axios from 'axios';

import {apiConstants, applicationStatusCode} from "../../constants/applicationConstants";
import {loginStatusConstant} from "../../constants/loginStatusConstants";
import {history} from "../../helpers/history";

export function login(email, password) {
    return dispatch => {
        dispatch(setLoginLogging(loginStatusConstant.LOGIN_PENDING, null));

        sendLoginRequest(email, password)
            .then(success => {
                dispatch(setLoginLogging(loginStatusConstant.LOGIN_SUCCESS, success.data));
                history.push({
                    pathname: '/'
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
        }).catch(
            reason => {
                reject(reason);
            }
        )
    });
}

function setLoginLogging(type, value) {
    return {
        type: type,
        loginStatus: type,
        loginInformation: value
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