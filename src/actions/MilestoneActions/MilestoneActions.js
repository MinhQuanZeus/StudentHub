import Promise from "es6-promise";
import axios from "axios";
import {apiConstants, applicationStatusCode} from "../../constants/applicationConstants";
import {milestoneConstants} from "../../constants/milestoneConstants";

export function onFetchMilestone(access_token, academic_program_id) {
    return dispatch => {
        dispatch(getDataProcess(milestoneConstants.PENDING, true, null));

        loadingMilestone(access_token, academic_program_id)
            .then(success => {
                dispatch(getDataProcess(milestoneConstants.SUCCESS, false, success.data));
            })
            .catch(err => {
                dispatch(getDataProcess(milestoneConstants.ERROR, false, []));
            })
    }
}

function loadingMilestone(access_token, academic_program_id) {
    return new Promise((resolve, reject) => {

        axios.get(apiConstants.STUDENT_MILESTONES, buildRequestConfig(access_token, academic_program_id))
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
        milestone: data
    }
}

function buildRequestConfig(access_token, academic_program_id) {
    return {
        baseURL: apiConstants.BACKEND_URL,
        method: 'GET',
        timeout: 6000,
        headers: {
            'X-Access-Token': access_token
        },
        params: {
            program_id: academic_program_id
        }
    };
}
