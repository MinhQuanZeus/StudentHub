import {checkListConstants} from "../../constants/checkListConstants";

const checkListReducer = (state = {
    checkList: [],
    loading: false
}, action) => {
    switch (action.type) {
        case checkListConstants.SUCCESS:
        case checkListConstants.PENDING:
        case checkListConstants.ERROR:
            return {
                ...state,
                checkList: action.checkList,
                loading: action.loading
            };

        default:
            return state;
    }
};


export default checkListReducer;