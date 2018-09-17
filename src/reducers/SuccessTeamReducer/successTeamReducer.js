import {successTeamConstants} from "../../constants/successTeamConstants";

const initialState = {
    loading: false,
    mentors: []
};

const successTeamReducer = (state = initialState, action) => {
    switch (action.type) {
        case successTeamConstants.SUCCESS:
            return {
                ...state,
                loading: false,
                mentors: action.mentors
            };
        // return _fetchMentorsSuccess(state, action);
        case successTeamConstants.WAITING:
            return {
                ...state,
                loading: true,
                mentors: []
            };
        // return _fetchMentorsStart(state, action);
        case successTeamConstants.ERROR:
        default:
            return {
                ...state,
                loading: true,
                mentors: []
            }
    }
};

export default successTeamReducer;