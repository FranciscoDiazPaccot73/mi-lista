export const types = {
  SET_ITEMS: "SET_ITEMS",
  SET_HEADER: "SET_HEADER",
  CLEAN_LIST: "CLEAN_LIST",
  STORAGE_STATUS: "STORAGE_STATUS",
  ENABLE_BOTH_ACTIONS: "ENABLE_BOTH_ACTIONS",
  DISABLE_BOTH: "DISABLE_BOTH",
  DISABLE_BOTH_LINKS: "DISABLE_BOTH_LINKS",
  LINK_STORAGE_STATUS: "LINK_STORAGE_STATUS",
  ENABLE_BOTH_ACTIONS_LINKS: "ENABLE_BOTH_ACTIONS_LINKS",
  SET_CATEGORIES: "SET_CATEGORIES",
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
    case types.STORAGE_STATUS: {
      return {...state, itemsInStorage: action.value}
    }
    case types.ENABLE_BOTH_ACTIONS: {
      return {...state, shouldEnableBoth: action.value}
    }
    case types.DISABLE_BOTH: {
      return {...state, shouldDisableBoth: action.value}
    }
    case types.LINK_STORAGE_STATUS: {
      return {...state, linkItemsInStorage: action.value}
    }
    case types.ENABLE_BOTH_ACTIONS_LINKS: {
      return {...state, shouldEnableBothLinks: action.value}
    }
    case types.DISABLE_BOTH_LINKS: {
      return {...state, shouldDisableBothLinks: action.value}
    }
    case types.SET_CATEGORIES: {
      return {...state, categories: action.categories}
    }
    default:
      return null;
  }
};
