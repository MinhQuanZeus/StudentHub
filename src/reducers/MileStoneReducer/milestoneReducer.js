import {milestoneConstants} from "../../constants/milestoneConstants";

const milestoneReducer = (state = {
    milestone: null,
    loading: null
}, action) => {
    switch (action.type) {
        case milestoneConstants.SUCCESS:
        case milestoneConstants.PENDING:
        case milestoneConstants.ERROR:
            return {
                ...state,
                milestone: action.milestone,
                loading: action.loading
            };

        default:
            return state;
    }
};


export default milestoneReducer;