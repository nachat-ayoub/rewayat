import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: { isAuth: false, token: null, user: null } };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticate: (state, action) => {
      const { isAuth, token, user } = action.payload;
      if (!isAuth || !token || !user) return;

      state.value = {
        isAuth,
        token,
        user,
      };
    },
    logout: (state) => {
      state.value = { isAuth: false, token: null, user: null };
    },
  },
});

export const { authenticate, logout } = authSlice.actions;

export default authSlice.reducer;
