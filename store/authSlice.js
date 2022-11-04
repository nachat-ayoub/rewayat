import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    isAuth: false,
    token: null,
    user: { role: "", username: "", email: "", image: "/avatar.jpg", bio: "" },
  },
};

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
      state.value = initialState.value;
    },
  },
});

export const { authenticate, logout } = authSlice.actions;

export default authSlice.reducer;
