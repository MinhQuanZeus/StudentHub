import { SHOW_LOADING, HIDE_LOADING } from '../../actions/LoadingActions';

const LoadingReducer = (
  state = {
    isLoading: false
  },
  action
) => {
  switch (action.type) {
    case SHOW_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case HIDE_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      };
    default:
      return state;
  }
};

export default LoadingReducer;
