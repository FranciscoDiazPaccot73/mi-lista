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
