import { flagDetailsConstants } from "../../constants/flagDetailsConstants";

const initialState = {
    loading: false,
    flagDetails: {}
};

const flagDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case flagDetailsConstants.SUCCESS:
            return {
                ...state,
                loading: false,
                flagDetails: action.flagDetails
            };
        case flagDetailsConstants.WAITING:
            return {
                ...state,
                loading: true,
                flagDetails: {}
            };
        case flagDetailsConstants.ERROR:
        default:
            return {
                ...state,
                loading: true,
                flagDetails: {}
            }
    }
};

export default flagDetailsReducer;
