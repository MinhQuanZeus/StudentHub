export const apiConstants = {
    // BACKEND_URL: "https://dev.successhub.co:6060/",
    BACKEND_URL: "http://localhost:6565/",

    STUDENT_LOGIN_PATH: "student/login",
    STUDENT_FORGOT_PASSWORD_PATH: "student/forgot_password",
    STUDENT_CHANGE_PASSWORD_PATH: "student/change_pass",
    STUDENT_SUCCESS_TEAM: "student/get_success_team",
    STUDENT_CLASS_TRACKER: "student/class_registration",
    STUDENT_ACADEMIC_PROGRAMS: "student/academic_programs",
    STUDENT_DEGREE_AUDIT: "student/degree_audit",
    STUDENT_MILESTONES: "student/milestones"

};

export const applicationStatusCode = {
    OK: 105
};

export const applicationMessages = {
    SUCCESS: "Success",
    PENDING: "Please wait",

    NEW_AND_CON_PASSWORD_NOT_MATCH: "New and confirmation password must be matched"
};