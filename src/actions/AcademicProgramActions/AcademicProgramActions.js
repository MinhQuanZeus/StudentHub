import Promise from 'es6-promise';
import axios from 'axios';
import { apiConstants } from '../../constants/applicationConstants';
import { academicProgramConstants } from '../../constants/academicProgramConstants';

export function onFetchAcademicProgram(accessToken) {
  return (dispatch) => {
    dispatch(getDataProcess(academicProgramConstants.PENDING, true, null));

    loadingAcademicPrograms(accessToken)
      .then((success) => {
        dispatch(getDataProcess(academicProgramConstants.SUCCESS, false, success.data));
      })
      .catch((err) => {
        dispatch(getDataProcess(academicProgramConstants.ERROR, false, []));
      });
  };
}

function loadingAcademicPrograms(accessToken) {
  return new Promise((resolve, reject) => {
    axios
      .get(apiConstants.STUDENT_ACADEMIC_PROGRAMS, buildRequestConfig(accessToken))
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
    academic_program: data,
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
