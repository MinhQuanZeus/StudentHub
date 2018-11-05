import Promise from "es6-promise";
import axios from "axios";
import {apiConstants, applicationStatusCode} from "../../constants/applicationConstants";
import {academicProgramConstants} from "../../constants/academicProgramConstants";

export function onFetchAcademicProgram(access_token) {
    return dispatch => {
        dispatch(getDataProcess(academicProgramConstants.PENDING, true, null));

        loadingAcademicPrograms(access_token)
            .then(success => {
                dispatch(getDataProcess(academicProgramConstants.SUCCESS, false, success.data));
            })
            .catch(err => {
                dispatch(getDataProcess(academicProgramConstants.ERROR, false, []));
            })
    }
}

function loadingAcademicPrograms(access_token) {
    return new Promise((resolve, reject) => {

        axios.get(apiConstants.STUDENT_ACADEMIC_PROGRAMS, buildRequestConfig(access_token))
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
        academic_program: data
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
