import {loginStatusConstant} from "../../constants/loginStatusConstants";

const loginReducer = (state = {
    loginStatus: null,
    loginInformation: null
}, action) => {
    switch (action.type) {
        case loginStatusConstant.LOGIN_SUCCESS:
        case loginStatusConstant.LOGIN_PENDING:
        case loginStatusConstant.LOGIN_ERROR:
            return {
                ...state,
                loginStatus: action.loginStatus,
                loginInformation: action.loginInformation
            };

        default:
            return state;
    }
};


export default loginReducer;