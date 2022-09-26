import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";

// Auth Slice:
import auth from "./authSlice";

const _combinedReducer = combineReducers({
  auth,
});

const masterReducer = (state, action) => {
  if (action.type === HYDRATE) {
    return {
      ...state, // use previous state
      auth: {
        value: action.payload,
      },
    };
  } else {
    return _combinedReducer(state, action);
  }
};

// config the store
const makeStore = () =>
  configureStore({
    // reducer: _combinedReducer,
    reducer: masterReducer,
  });

export const wrapper = createWrapper(makeStore, { debug: false });
