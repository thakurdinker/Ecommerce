import { createContext, useEffect, useReducer } from "react";
import axios from "axios";

export const AdminContext = createContext();
export const ADD_ADMIN = "ADD_ADMIN";
export const UPDATE_LOGIN = "UPDATE_LOGIN";
export const RESET = "RESET";

const initialState = {
  id: "",
  username: "",
  email: "",
  isLoggedIn: false,
  role: "0",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_ADMIN:
      return Object.assign({}, { ...state }, { ...action.admin });
    case UPDATE_LOGIN:
      return Object.assign({}, { ...state }, { isLoggedIn: action.isLoggedIn });
    case RESET:
      return Object.assign({}, { ...state }, { ...initialState });
    default:
      return state;
  }
};

export const AdminContextProvider = ({ children }) => {
  const [admin, dispatchAdmin] = useReducer(reducer, initialState);

  useEffect(() => {
    const controller = new AbortController();
    async function initialize() {
      try {
        const res = await axios.get(`/currentUser`, {
          signal: controller.signal,
        });
        if (res.status === 200) {
          dispatchAdmin({
            type: ADD_ADMIN,
            admin: {
              username: res.data.username,
              email: res.data.email,
              isLoggedIn: true,
              id: res.data.id,
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
    // Cleanup
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <AdminContext.Provider value={{ admin, dispatchAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};
