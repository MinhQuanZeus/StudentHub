import {forgotPasswordConstants} from "../../constants/forgotPasswordConstants";

const forgotPasswordReducer = (state = {
    forgotPasswordStatus: null,
    changePasswordStatus: null
}, action) => {
    switch (action.type) {
        case forgotPasswordConstants.FORGOT_PASSWORD_PENDING:
        case forgotPasswordConstants.FORGOT_PASSWORD_SUCCESS:
        case forgotPasswordConstants.FORGOT_PASSWORD_ERROR:
            return {
                ...state,
                forgotPasswordStatus: action.forgotPasswordStatus
            };
        case forgotPasswordConstants.CHANGE_PASSWORD_PENDING:
        case forgotPasswordConstants.CHANGE_PASSWORD_SUCCESS:
        case forgotPasswordConstants.CHANGE_PASSWORD_ERROR:
            return {
                ...state,
                changePasswordStatus: action.changePasswordStatus
            };
        default:
            return state;
    }
};

export default forgotPasswordReducer;