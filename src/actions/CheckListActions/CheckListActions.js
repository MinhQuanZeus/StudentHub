import Promise from "es6-promise";
import axios from "axios";
import {apiConstants, applicationStatusCode} from "../../constants/applicationConstants";
import {checkListConstants} from "../../constants/checkListConstants";

export function onFetchCheckList(access_token) {
    return dispatch => {
        dispatch(getDataProcess(checkListConstants.WAITING, true, []));

        loadingCheckList(access_token)
            .then(success => {
                dispatch(getDataProcess(checkListConstants.SUCCESS, false, success.data));
            })
            .catch(err => {
                dispatch(getDataProcess(checkListConstants.ERROR, false, []));
            })
    }
}

function loadingCheckList(access_token) {
    return new Promise((resolve, reject) => {

        axios.get(apiConstants.STUDENT_CHECK_LIST, buildRequestConfig(access_token))
            .then(value => {
                if (value.data.code === applicationStatusCode.OK_V1) {
                    resolve(value.data);
                } else {
                    reject(value.data);
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
        checkList: data
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
