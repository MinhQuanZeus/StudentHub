import Promise from "es6-promise";
import axios from "axios";
import { apiConstants, applicationStatusCode } from "../../constants/applicationConstants";
import { flagDetailsConstants } from "../../constants/flagDetailsConstants";

export function getFlagDetails(access_token, flagId) {
    return (dispatch) => {
        dispatch(getDataProcess(flagDetailsConstants.WAITING, true, null));

        loadingFlagDetails(access_token, flagId)
            .then(success => {
                dispatch(getDataProcess(flagDetailsConstants.SUCCESS, false, success.data));
            })
            .catch(err => {
                dispatch(getDataProcess(flagDetailsConstants.ERROR, false, []));
            })
    }
}

function loadingFlagDetails(access_token, flagId) {
    return new Promise((resolve, reject) => {
        axios.get(apiConstants.STUDENT_FLAG_DETAILS + flagId, buildRequestConfig(access_token))
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
        flagDetails: data
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
