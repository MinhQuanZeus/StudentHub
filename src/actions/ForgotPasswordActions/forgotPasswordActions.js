import Promise from "es6-promise";
import axios from 'axios';

import {apiConstants, applicationMessages, applicationStatusCode} from "../../constants/applicationConstants";
import {forgotPasswordConstants} from "../../constants/forgotPasswordConstants";
import {history} from "../../helpers/history";

export function forgotPassword(email, channel, verifyCode) {
    return dispatch => {
        dispatch(setForgotPasswordLogging(forgotPasswordConstants.FORGOT_PASSWORD_PENDING, null));
        sendForgotPasswordRequest(email, channel, verifyCode)
            .then(success => {
                dispatch(setForgotPasswordLogging(forgotPasswordConstants.FORGOT_PASSWORD_SUCCESS, null));
                if (verifyCode) {
                    history.push({
                        pathname: '/forgot-password',
                        search: '?step=3',
                        state: success.data
                    });
                } else {
                    history.push({
                        pathname: '/forgot-password',
                        search: '?step=2',
                        state: success.data
                    });
                }
            })
            .catch(err => {
                dispatch(setForgotPasswordLogging(forgotPasswordConstants.FORGOT_PASSWORD_ERROR, err));
            })
    }
}

export function changePassword(accessToken, newPassword, conPassword) {
    return dispatch => {
        dispatch(setChangePasswordLogging(forgotPasswordConstants.CHANGE_PASSWORD_PENDING, null));
        sendChangePasswordRequest(accessToken, newPassword, conPassword)
            .then(success => {
                dispatch(setChangePasswordLogging(forgotPasswordConstants.CHANGE_PASSWORD_SUCCESS, null));
                history.push({
                    pathname: '/login',
                });
            })
            .catch(err => {
                dispatch(setChangePasswordLogging(forgotPasswordConstants.CHANGE_PASSWORD_ERROR, err));
            })
    }
}


function sendForgotPasswordRequest(email, channel, verifyCode) {
    return new Promise((resolve, reject) => {
        axios.post(getForgotPasswordPath(), buildPayloadForgotPassword(email, channel, verifyCode)).then(value => {
            if (value.data.status === applicationStatusCode.OK) {
                resolve(value.data);
            } else {
                reject(value.data);
            }
        })
    });
}

function sendChangePasswordRequest(accessToken, newPassword, conPassword) {
    return new Promise((resolve, reject) => {
        if (newPassword !== conPassword) {
            reject(applicationMessages.NEW_AND_CON_PASSWORD_NOT_MATCH);
        }
        axios.post(getChangePasswordPath(), buildPayloadChangePassword(newPassword), {
            headers: {
                'X-Access-Token': accessToken
            }
        }).then(value => {
            if (value.data.status === applicationStatusCode.OK) {
                resolve(value.data);
            } else {
                reject(value.data);
            }
        })
    });
}


function setForgotPasswordLogging(type, value) {
    if (value !== null) {
        return {
            type: type,
            forgotPasswordStatus: value
        }
    } else {
        return {
            type: type,
            forgotPasswordStatus: type
        }
    }
}

function setChangePasswordLogging(type, value) {
    if (value !== null) {
        return {
            type: type,
            changePasswordStatus: value
        }
    } else {
        return {
            type: type,
            changePasswordStatus: type
        }
    }
}

function getForgotPasswordPath() {
    return apiConstants.BACKEND_URL + apiConstants.STUDENT_FORGOT_PASSWORD_PATH;
}

function getChangePasswordPath() {
    return apiConstants.BACKEND_URL + apiConstants.STUDENT_CHANGE_PASSWORD_PATH;
}

function buildPayloadChangePassword(newPassword) {
    return {
        password: newPassword,
        conf_password: newPassword
    }
}

function buildPayloadForgotPassword(email, channel, verifyCode) {
    return {
        email: email,
        channel: channel,
        otp: (verifyCode !== undefined && verifyCode !== null) ? verifyCode : ""
    }
}