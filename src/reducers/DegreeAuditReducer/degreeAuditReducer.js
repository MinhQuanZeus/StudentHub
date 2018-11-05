import {degreeAuditConstants} from "../../constants/degreeAuditConstants";

const degreeAuditReducer = (state = {
    degreeAudit: null,
    loading: null
}, action) => {
    switch (action.type) {
        case degreeAuditConstants.SUCCESS:
        case degreeAuditConstants.PENDING:
        case degreeAuditConstants.ERROR:
            return {
                ...state,
                degreeAudit: action.degreeAudit,
                loading: action.loading
            };

        default:
            return state;
    }
};


export default degreeAuditReducer;