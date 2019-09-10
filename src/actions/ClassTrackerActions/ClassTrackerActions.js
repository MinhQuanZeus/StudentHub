import Promise from 'es6-promise';
import axios from 'axios';
import { apiConstants } from '../../constants/applicationConstants';
import { classTrackerConstants } from '../../constants/classTrackerConstants';

export function onFetchClassTracker(accessToken) {
  return (dispatch) => {
    dispatch(getDataProcess(classTrackerConstants.WAITING, true, null));

    loadingClassTracker(accessToken)
      .then((success) => {
        dispatch(getDataProcess(classTrackerConstants.SUCCESS, false, success.data));
      })
      .catch((err) => {
        dispatch(getDataProcess(classTrackerConstants.ERROR, false, []));
      });
  };
}

function loadingClassTracker(accessToken) {
  return new Promise((resolve, reject) => {
    axios
      .get(apiConstants.STUDENT_CLASS_TRACKER, buildRequestConfig(accessToken))
      .then((value) => {
        if (value.data.success) {
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
    classTracker: data,
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
