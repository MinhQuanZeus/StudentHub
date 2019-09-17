import Promise from 'es6-promise';
import axios from 'axios';
import { apiConstants, applicationStatusCode } from '../../constants/applicationConstants';
import { calendarConstants } from '../../constants/calendarConstants';

export function onFetchCalendarData(accessToken, fromDate, toDate) {
  return (dispatch) => {
    dispatch(getDataProcess(calendarConstants.WAITING, true, []));

    loadingCalendarData(accessToken, fromDate, toDate)
      .then((success) => {
        dispatch(getDataProcess(calendarConstants.SUCCESS, false, success.data));
      })
      .catch((err) => {
        dispatch(getDataProcess(calendarConstants.ERROR, false, []));
      });
  };
}

function loadingCalendarData(accessToken, fromDate, toDate) {
  return new Promise((resolve, reject) => {
    const routeWithParams = `${apiConstants.STUDENT_CALENDAR_CHECK_LIST}?from_date=${fromDate}&to_date=${toDate}`;
    axios
      .get(routeWithParams, buildRequestConfig(accessToken))
      .then((value) => {
        if (value.data.code === applicationStatusCode.OK_V1) {
          resolve(value.data);
        } else {
          reject(value.data);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function getDataProcess(type, loading, data) {
  return {
    type: type,
    loading: loading,
    calendarData: data,
  };
}

function buildRequestConfig(accessToken) {
  return {
    baseURL: apiConstants.BACKEND_URL,
    method: 'GET',
    timeout: 6000,
    headers: {
      'X-Access-Token': accessToken,
    },
  };
}
