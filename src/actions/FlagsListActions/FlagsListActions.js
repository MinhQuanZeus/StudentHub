import Promise from "es6-promise";
import axios from "axios";
import { apiConstants, applicationStatusCode } from "../../constants/applicationConstants";
import { flagsListConstants } from "../../constants/flagsListConstants";

export function getFlagsList(access_token) {
    return (dispatch) => {
        dispatch(getDataProcess(flagsListConstants.FETCH_FLAGS_LIST_WAITING, true, null));

        loadingFlagsList(access_token, apiConstants.STUDENT_FLAGS_LIST)
            .then(success => {
                dispatch(getDataProcess(flagsListConstants.FETCH_FLAGS_LIST_SUCCESS, false, success.data));
            })
            .catch(err => {
                dispatch(getDataProcess(flagsListConstants.FETCH_FLAGS_LIST_FAIL, false, []));
            })
    }
}

export function getSentFlags(access_token) {
    return (dispatch) => {
        dispatch(getDataProcess(flagsListConstants.FETCH_SENT_FLAGS_WAITING, true, null));

        loadingFlagsList(access_token, apiConstants.STUDENT_SENT_FLAGS)
            .then(success => {
                dispatch(getDataProcess(flagsListConstants.FETCH_SENT_FLAGS_SUCCESS, false, success.data));
            })
            .catch(err => {
                dispatch(getDataProcess(flagsListConstants.FETCH_SENT_FLAGS_FAIL, false, []));
            })
    }
}

export function getPublicFlags(access_token) {
    return (dispatch) => {
        dispatch(getDataProcess(flagsListConstants.FETCH_PUBLIC_FLAGS_WAITING, true, null));

        loadingFlagsList(access_token, apiConstants.STUDENT_PUBLIC_FLAGS)
            .then(success => {
                dispatch(getDataProcess(flagsListConstants.FETCH_PUBLIC_FLAGS_SUCCESS, false, success.data));
            })
            .catch(err => {
                dispatch(getDataProcess(flagsListConstants.FETCH_PUBLIC_FLAGS_FAIL, false, []));
            })
    }
}

function loadingFlagsList(access_token, apiConstant) {
    return new Promise((resolve, reject) => {
        axios.get(apiConstant, buildRequestConfig(access_token))
            .then(response => {
                if (response.data.code === applicationStatusCode.OK_V1) {
                    resolve(response.data);
                } else {
                    reject(response.data);
                }
            })
            .catch(error => {
                 reject(error);
            })
    });
}

function getDataProcess(type, loading, data) {
    return {
        type: type,
        loading: loading,
        data: data
    }
}

function buildRequestConfig(access_token) {
    return {
        baseURL: apiConstants.BACKEND_URL,
        method: 'GET',
        timeout: 6000,
        headers: {
            'X-Access-Token': access_token
        }
    };
}
