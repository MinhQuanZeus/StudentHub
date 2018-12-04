import Promise from "es6-promise";
import axios from "axios";
import { apiConstants, applicationStatusCode } from "../../constants/applicationConstants";
import { flagsListConstants } from "../../constants/flagsListConstants";

export function getFlagsList(access_token) {
    return (dispatch) => {
        dispatch(getDataProcess(flagsListConstants.WAITING, true, null));

        loadingFlagsList(access_token)
            .then(success => {
                dispatch(getDataProcess(flagsListConstants.SUCCESS, false, success.data));
            })
            .catch(err => {
                dispatch(getDataProcess(flagsListConstants.ERROR, false, []));
            })
    }
}

function loadingFlagsList(access_token) {
    return new Promise((resolve, reject) => {
        axios.get(apiConstants.STUDENT_FLAGS_LIST, buildRequestConfig(access_token))
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
        flagsList: data
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
