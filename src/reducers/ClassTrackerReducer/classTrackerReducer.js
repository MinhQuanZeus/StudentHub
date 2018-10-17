import {classTrackerConstants} from "../../constants/classTrackerConstants";

const initialState = {
    loading: false,
    classTracker: []
};

const classTrackerReducer = (state = initialState, action) => {
    switch (action.type) {
        case classTrackerConstants.SUCCESS:
            return {
                ...state,
                loading: false,
                classTracker: action.classTracker
            };
        // return _fetchMentorsSuccess(state, action);
        case classTrackerConstants.WAITING:
            return {
                ...state,
                loading: true,
                classTracker: []
            };
        // return _fetchMentorsStart(state, action);
        case classTrackerConstants.ERROR:
        default:
            return {
                ...state,
                loading: true,
                classTracker: []
            }
    }
};

export default classTrackerReducer;