import {loginStatusConstant} from "../../constants/loginStatusConstants";

const loginReducer = (state = {
    loginStatus: null
}, action) => {
    switch (action.type) {
        case loginStatusConstant.LOGIN_SUCCESS:
            return {
                ...state,
                loginStatus: action.loginStatus
            };
        case loginStatusConstant.LOGIN_PENDING:
            return {
                ...state,
                loginStatus: action.loginStatus
            };
        case loginStatusConstant.LOGIN_ERROR:
            return {
                ...state,
                loginStatus: action.loginStatus
            };

        default:
            return state;
    }
};


export default loginReducer;