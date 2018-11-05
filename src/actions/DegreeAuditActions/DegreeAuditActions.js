import Promise from "es6-promise";
import axios from "axios";
import {apiConstants, applicationStatusCode} from "../../constants/applicationConstants";
import {degreeAuditConstants} from "../../constants/degreeAuditConstants";

export function onFetchDegreeAudit(access_token, academic_program_id) {
    return dispatch => {
        dispatch(getDataProcess(degreeAuditConstants.PENDING, true, null));

        loadingDegreeAudit(access_token, academic_program_id)
            .then(success => {
                dispatch(getDataProcess(degreeAuditConstants.SUCCESS, false, success.data));
            })
            .catch(err => {
                dispatch(getDataProcess(degreeAuditConstants.ERROR, false, []));
            })
    }
}

function loadingDegreeAudit(access_token, academic_program_id) {
    return new Promise((resolve, reject) => {

        axios.get(apiConstants.STUDENT_DEGREE_AUDIT, buildRequestConfig(access_token, academic_program_id))
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
        degreeAudit: data
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
