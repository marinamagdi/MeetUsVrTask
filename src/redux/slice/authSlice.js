import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  email: "",
  id: null,
  name: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.name = action.payload.name;
    },
    clearUser: (state) => {
      state.token = null;
      state.email = "";
      state.id = null;
      state.name = "";
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
