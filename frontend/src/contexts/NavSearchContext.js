import { createContext, useReducer } from "react";

export const NavBarSearchContext = createContext();

export const ADD_REQUESTED_PRODUCT = "ADD_REQUESTED_PRODUCT";
export const RESET = "RESET";
export const HIDE_SEARCH_FILED = "HIDE_SEARCH_FILED";

const initialState = {
  requestedProducts: [],
  productFound: false,
  searchRequested: false,
  searchField: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_REQUESTED_PRODUCT:
      return {
        requestedProducts: [...state.requestedProducts, ...action.data],
        productFound: action.data.length === 0 ? false : true,
        searchRequested: true,
        searchField: true,
      };
    case HIDE_SEARCH_FILED:
      return Object.assign({}, { ...state }, { searchField: false });
    case RESET:
      return initialState;
    default:
      return state;
  }
};

export const NavBarSearchProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <NavBarSearchContext.Provider value={{ state, dispatch }}>
      {props.children}
    </NavBarSearchContext.Provider>
  );
};
