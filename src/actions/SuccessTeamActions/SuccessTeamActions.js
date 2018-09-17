import Promise from "es6-promise";
import axios from "axios";

import {apiConstants, applicationStatusCode} from "../../constants/applicationConstants";
import {successTeamConstants} from "../../constants/successTeamConstants";

export function onFetchMentors(access_token) {
    return dispatch => {
        dispatch(getDataProcess(successTeamConstants.WAITING, true, null));

        loadingSuccessTeam(access_token)
            .then(success => {
                dispatch(getDataProcess(successTeamConstants.SUCCESS, false, success.data));
            })
            .catch(err => {
                dispatch(getDataProcess(successTeamConstants.ERROR, false, []));
            })
    }
}

function loadingSuccessTeam(access_token) {
    return new Promise((resolve, reject) => {
        axios.get(apiConstants.STUDENT_SUCCESS_TEAM, buildRequestConfig(access_token))
            .then(value => {
                if (value.data.status === applicationStatusCode.OK) {
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
        mentors: data
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
