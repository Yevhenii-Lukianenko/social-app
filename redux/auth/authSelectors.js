export const selectUserAllInfo = (state) => state.auth;

export const selectUserId = (state) => state.auth.userId;

export const selectUserNickName = (state) => state.auth.nickName;

export const selectUserAvatar = (state) => state.auth.avatarUrl;

export const selectStateChange = (state) => state.auth.stateChange;
