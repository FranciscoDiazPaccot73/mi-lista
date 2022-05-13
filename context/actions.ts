import { types } from './reducers';

export const setHeaderAction = (dispatch: any, header: any) => {
  dispatch({ type: types.SET_HEADER, header });
};

export const setItemsAction = (dispatch: any, items: any) => {
  dispatch({ type: types.SET_ITEMS, items });
};

export const shouldCleanList = (dispatch: any, value: boolean) => {
  dispatch({ type: types.CLEAN_LIST, value });
};

export const setStorageStatus = (dispatch: any, value: boolean, optional?: boolean) => {
  dispatch({ type: types.STORAGE_STATUS, value });
  dispatch({ type: types.ENABLE_BOTH_ACTIONS, value: !!optional });
};
