import {flagsListConstants} from "../../constants/flagsListConstants";

const initialState = {
  // flagsList: {
  //   loading: false,
  //   data: [].
  // },
  sentFlags: {
    loading: false,
    data: [],
  },
  publicFlags: {
    loading: false,
    data: [],
  }
};

const flagsListReducer = (state = initialState, action) => {
    switch (action.type) {
      // case flagsListConstants.FETCH_FLAGS_LIST_SUCCESS:
      //     return {
      //         ...state,
      //         flagsList: {
      //           ...state.flagsList,
      //           loading: false,
      //           data: action.data,
      //         }
      //     };
      // case flagsListConstants.FETCH_FLAGS_LIST_WAITING:
      //     return {
      //         ...state,
      //         flagsList: {
      //           ...state.flagsList,
      //           loading: true,
      //           data: [],
      //       }
      //     };
      // case flagsListConstants.FETCH_FLAGS_LIST_FAIL:
      //     return {
      //         ...state,
      //         flagsList: {
      //           ...state.flagsList,
      //           loading: false,
      //           data: [],
      //       }
      //     };
        case flagsListConstants.FETCH_SENT_FLAGS_SUCCESS:
            return {
                ...state,
                sentFlags: {
                  ...state.sentFlags,
                  loading: false,
                  data: action.data,
                }
            };
        case flagsListConstants.FETCH_SENT_FLAGS_WAITING:
            return {
                ...state,
                sentFlags: {
                  ...state.sentFlags,
                  loading: true,
                  data: [],
              }
            };
        case flagsListConstants.FETCH_SENT_FLAGS_FAIL:
            return {
                ...state,
                sentFlags: {
                  ...state.sentFlags,
                  loading: false,
                  data: [],
              }
            };
        case flagsListConstants.FETCH_PUBLIC_FLAGS_SUCCESS:
            return {
                ...state,
                publicFlags: {
                  ...state.publicFlags,
                  loading: false,
                  data: action.data,
                }
            };
        case flagsListConstants.FETCH_PUBLIC_FLAGS_WAITING:
            return {
                ...state,
                publicFlags: {
                  ...state.publicFlags,
                  loading: true,
                  data: [],
              }
            };
        case flagsListConstants.FETCH_PUBLIC_FLAGS_FAIL:
          return {
              ...state,
              publicFlags: {
                ...state.publicFlags,
                loading: false,
                data: [],
            }
          };
        default:
            return state;
    }
};

export default flagsListReducer;
