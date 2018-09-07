import Promise from "es6-promise";

const LOGIN_PENDING = "LOGIN_PENDING";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_ERROR = "LOGIN_ERROR";

export function login(email, password) {
    return dispatch => {
        dispatch(setLoggingPending(true));
        dispatch(setLoggingSuccess(false));
        dispatch(setLoggingError(null));

        sendLoginRequest(email, password)
            .then(success => {
                dispatch(setLoggingPending(false));
                dispatch(setLoggingSuccess(true));
            })
            .catch(err => {
                dispatch(setLoggingPending(false));
                dispatch(setLoggingError(err));
            })
    }
}

function sendLoginRequest(email, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email === "admin@admin" && password === "admin") {
                return resolve(true);
            } else {
                return reject(new Error("Invalid email or password"));
            }
        }, 2000);
    })
}

function setLoggingPending(isLoginPending) {
    return {
        type: LOGIN_PENDING,
        isLoginPending
    }
}

function setLoggingSuccess(isLoginSuccess) {
    return {
        type: LOGIN_SUCCESS,
        isLoginSuccess
    }
}

function setLoggingError(loginError) {
    return {
        type: LOGIN_ERROR,
        loginError
    }
}