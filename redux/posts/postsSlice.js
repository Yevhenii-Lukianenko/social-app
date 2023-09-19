import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const post = {
  postTitle: "",
  postLocality: "",
  imageUrl: "",
  comments: [],
  likes: [],
  ownerId: "",
  ownerAvatar: "",
  ownerName: "",
  ownerEmail: "",
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    updatePosts: (state, { payload }) => [...payload],
  },
});
