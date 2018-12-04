import {flagsListConstants} from "../../constants/flagsListConstants";

const initialState = {
    loading: false,
    flagsList: []
};

const flagsListReducer = (state = initialState, action) => {
    switch (action.type) {
        case flagsListConstants.SUCCESS:
            return {
                ...state,
                loading: false,
                flagsList: action.flagsList
            };
        case flagsListConstants.WAITING:
            return {
                ...state,
                loading: true,
                flagsList: []
            };
        case flagsListConstants.ERROR:
        default:
            return {
                ...state,
                loading: true,
                flagsList: []
            }
    }
};

export default flagsListReducer;
