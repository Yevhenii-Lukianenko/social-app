import { createSlice } from "@reduxjs/toolkit";

const state = {
  userId: null,
  nickName: null,
  userEmail: "",
  avatarUrl: "",
  stateChange: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: state,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      nickName: payload.nickName,
      avatarUrl: payload.avatarUrl,
      userEmail: payload.userEmail,
    }),
    updateUserAvatar: (state, { payload }) => ({
      ...state,
      avatarUrl: payload.avatarUrl,
    }),
    authStateChangeUser: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    authSignOutUser: () => state,
  },
});
