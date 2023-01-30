import axios from "axios";
import { createContext, useEffect, useReducer } from "react";

export const ADD_USER = "ADD_USER";
export const UPDATE_LOGIN = "UPDATE_LOGIN";
export const INCREMENT_CART = "INCREMENT_CART";
export const DECREMENT_CART = "DECREMENT_CART";
export const RESET = "RESET";

export const User = createContext();

const initialState = {
  id: "",
  username: "",
  email: "",
  isLoggedIn: false,
  itemsInCart: 0,
  addresses: [],
  role: "0",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_USER:
      return Object.assign({}, { ...state }, { ...action.user });
    case UPDATE_LOGIN:
      return Object.assign({}, { ...state }, { isLoggedIn: action.isLoggedIn });
    case INCREMENT_CART:
      return Object.assign(
        {},
        { ...state },
        { itemsInCart: state.itemsInCart + 1 }
      );
    case DECREMENT_CART:
      return Object.assign(
        {},
        { ...state },
        { itemsInCart: state.itemsInCart - 1 }
      );
    case RESET:
      return Object.assign({}, { ...state }, { ...initialState });
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [user, dispatchUser] = useReducer(reducer, initialState);

  // Persits user Context bewteen page refreshes and routes
  // User info is fetched from server
  useEffect(() => {
    const controller = new AbortController();
    async function initialize() {
      try {
        const res = await axios.get(`/currentUser`, {
          signal: controller.signal,
        });
        if (res.status === 200) {
          dispatchUser({
            type: ADD_USER,
            user: {
              username: res.data.username,
              email: res.data.email,
              isLoggedIn: true,
              id: res.data.id,
              addresses: res.data.addresses,
              itemsInCart: res.data.itemsInCart,
              role: res.data.role,
            },
          });
          return;
        }
      } catch (err) {
        console.log(err);
      }
    }
    initialize();

    //Cleanup
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <User.Provider value={{ user, dispatchUser }}>{children}</User.Provider>
  );
};
