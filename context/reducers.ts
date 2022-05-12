export const types = {
  SET_ITEMS: "SET_ITEMS",
  SET_HEADER: "SET_HEADER",
  CLEAN_LIST: "CLEAN_LIST",
};

export const init = (config: any) => {
  return {
    ...config,
  };
};

export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case types.SET_ITEMS: {
      return {...state, contextItems: action.items}
    }
    case types.SET_HEADER: {
      return {...state, contextHeaders: action.header}
    }
    case types.CLEAN_LIST: {
      return {...state, shouldClean: action.value}
    }
    default:
      return null;
  }
};
