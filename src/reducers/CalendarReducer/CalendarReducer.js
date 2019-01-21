import {calendarConstants} from "../../constants/calendarConstants";

const calendarReducer = (state = {
    calendarData: [],
    loading: false
}, action) => {
    switch (action.type) {
        case calendarConstants.SUCCESS:
        case calendarConstants.PENDING:
        case calendarConstants.ERROR:
            return {
                ...state,
                calendarData: action.calendarData,
                loading: action.loading
            };

        default:
            return state;
    }
};


export default calendarReducer;