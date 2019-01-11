export const apiConstants = {
  // BACKEND_URL: "https://dev.successhub.co:6060/",
  // BACKEND_URL: "http://localhost:6565/",
  BACKEND_URL: 'http://103.35.64.69:6565/',

  STUDENT_LOGIN_PATH: 'student/login',
  STUDENT_FORGOT_PASSWORD_PATH: 'student/forgot_password',
  STUDENT_CHANGE_PASSWORD_PATH: 'student/change_pass',
  STUDENT_SUCCESS_TEAM: 'student/get_success_team',
  STUDENT_CLASS_TRACKER: 'student/class_registration',
  STUDENT_ACADEMIC_PROGRAMS: 'student/academic_programs',
  STUDENT_DEGREE_AUDIT: 'student/degree_audit',
  STUDENT_MILESTONES: 'student/milestones',
  STUDENT_CHECK_LIST: 'api/v1/check_list',
  STUDENT_FLAGS_LIST: 'student/relative_flags',
  STUDENT_SENT_FLAGS: 'student/flag',
  STUDENT_PUBLIC_FLAGS: 'student/flag/public',
  STUDENT_FLAG_DETAILS: 'student/flag/detail/'
};

export const applicationStatusCode = {
  OK: 105,
  OK_V1: 200
};

export const applicationMessages = {
  SUCCESS: 'Success',
  PENDING: 'Please wait',

  NEW_AND_CON_PASSWORD_NOT_MATCH:
    'New and confirmation password must be matched'
};
