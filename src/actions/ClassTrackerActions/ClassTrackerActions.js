import Promise from 'es6-promise';
import axios from 'axios';
import {
  apiConstants,
  applicationStatusCode
} from '../../constants/applicationConstants';
import { classTrackerConstants } from '../../constants/classTrackerConstants';
import { createHideLoadingAction } from '../../actions/LoadingActions';

export function onFetchClassTracker(access_token) {
  return dispatch => {
    dispatch(getDataProcess(classTrackerConstants.WAITING, true, null));

    loadingClassTracker(access_token)
      .then(success => {
        dispatch(createHideLoadingAction(success));
        dispatch(
          getDataProcess(classTrackerConstants.SUCCESS, false, success.data)
        );
      })
      .catch(err => {
        dispatch(createHideLoadingAction(err));
        dispatch(getDataProcess(classTrackerConstants.ERROR, false, []));
      });
  };
}

function loadingClassTracker(access_token) {
  return new Promise((resolve, reject) => {
    axios
      .get(apiConstants.STUDENT_CLASS_TRACKER, buildRequestConfig(access_token))
      .then(value => {
        if (value.data.status === applicationStatusCode.OK) {
          resolve(value.data);
        } else {
          reject(value.data);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}

function getDataProcess(type, loading, data) {
  return {
    type: type,
    loading: loading,
    classTracker: data
  };
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
