export const SHOW_LOADING = 'SHOW_LOADING';

export const HIDE_LOADING = 'HIDE_LOADING';

export function createShowLoadingAction(args = {}) {
  return {
    type: SHOW_LOADING,
    isLoading: true,
    args: args
  };
}

export function createHideLoadingAction(args = {}) {
  return {
    type: HIDE_LOADING,
    isLoading: false,
    args: args
  };
}
