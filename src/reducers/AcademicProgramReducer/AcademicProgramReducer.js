import {academicProgramConstants} from "../../constants/academicProgramConstants";

const academicProgramReducer = (state = {
    academic_program: null,
    loading: null
}, action) => {
    switch (action.type) {
        case academicProgramConstants.SUCCESS:
        case academicProgramConstants.PENDING:
        case academicProgramConstants.ERROR:
            return {
                ...state,
                academic_program: action.academic_program,
                loading: action.loading
            };

        default:
            return state;
    }
};


export default academicProgramReducer;