import Promise from "es6-promise";
import axios from "axios";
import {apiConstants, applicationStatusCode} from "../../constants/applicationConstants";
import {calendarConstants} from "../../constants/calendarConstants";

export function onFetchCalendarData(access_token, from_date, to_date) {
    return dispatch => {
        dispatch(getDataProcess(calendarConstants.WAITING, true, []));

        loadingCalendarData(access_token, from_date, to_date)
            .then(success => {
                dispatch(getDataProcess(calendarConstants.SUCCESS, false, success.data));
            })
            .catch(err => {
                dispatch(getDataProcess(calendarConstants.ERROR, false, []));
            })
    }
}

function loadingCalendarData(access_token, from_date, to_date) {
    return new Promise((resolve, reject) => {
        const routeWithParams = `${apiConstants.STUDENT_CALENDAR}from_date=${from_date}&to_date=${to_date}`;
        axios.get(routeWithParams, buildRequestConfig(access_token))
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
        calendarData: data
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
