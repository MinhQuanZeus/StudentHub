import Promise from 'es6-promise';
import axios from 'axios';
import { ACCESS_TOKEN } from '../../constants';

import {
  apiConstants,
  applicationStatusCode
} from '../../constants/applicationConstants';
import { loginStatusConstant } from '../../constants/loginStatusConstants';
import { history } from '../../helpers/history';
import { getUser, getAccessToken } from '../../helpers';
export function login(email, password) {
  return dispatch => {
    dispatch(setLoginLogging(loginStatusConstant.LOGIN_PENDING, null));
    const user = getUser();
    if (!!user) {
      user.x_access_token = getAccessToken();
      dispatch(setLoginLogging(loginStatusConstant.LOGIN_SUCCESS, user));
      history.push({
        pathname: '/'
      });
    } else {
      sendLoginRequest(email, password)
        .then(success => {
          localStorage.setItem(
            ACCESS_TOKEN,
            success.data && success.data.x_access_token
          );
          dispatch(
            setLoginLogging(loginStatusConstant.LOGIN_SUCCESS, success.data)
          );
          history.push({
            pathname: '/'
          });
        })
        .catch(err => {
          dispatch(setLoginLogging(loginStatusConstant.LOGIN_ERROR, err));
        });
    }
  };
}

function sendLoginRequest(email, password) {
  return new Promise((resolve, reject) => {
    axios
      .post(getLoginPath(), buildPayload(email, password))
      .then(value => {
        if (value.data.status === applicationStatusCode.OK) {
          resolve(value.data);
        } else {
          reject(value.data);
        }
      })
      .catch(reason => {
        reject(reason);
      });
  });
}

function setLoginLogging(type, value) {
  return {
    type: type,
    loginStatus: type,
    loginInformation: value
  };
}

function getLoginPath() {
  return apiConstants.BACKEND_URL + apiConstants.STUDENT_LOGIN_PATH;
}

function buildPayload(email, password) {
  return {
    email: email,
    password: password
  };
}
