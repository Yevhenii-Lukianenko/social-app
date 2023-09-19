import { postsSlice } from "./postsSlice";

import {
  addDoc,
  doc,
  collection,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/config";

export const addPost =
  ({ data }) =>
  async (dispatch, getState) => {
    try {
      console.log(data);
      const postRef = doc(db, "posts", data.postId);
      await setDoc(postRef, { ...data });
      // await addDoc(collection(db, "posts"), { ...data });
      await dispatch(getAllPosts());
    } catch (error) {
      console.log("error:", error);
      console.log("message:", error.message);
    }
  };

export const getAllPosts = () => async (dispatch, getState) => {
  try {
    const postsRef = collection(db, "posts");
    const querySnapshot = await getDocs(postsRef);
    const allPosts = querySnapshot.docs
      .sort(
        (a, b) =>
          b._document.createTime.timestamp - a._document.createTime.timestamp
      )
      .map((doc) => ({ postId: doc.id, ...doc.data() }));
    dispatch(postsSlice.actions.updatePosts([...allPosts]));
  } catch (error) {
    console.log("message:", error.message);
  }
};

export const addPostComment = (data) => async (dispatch, getState) => {
  try {
    const { postId, newComment } = data;

    const postRef = doc(db, "posts", postId);

    const getPost = await getDoc(postRef);
    const allComments = getPost.data().comments;

    await updateDoc(postRef, { comments: [...allComments, newComment] });

    await dispatch(getAllPosts());
  } catch (error) {
    console.log("message:", error.message);
  }
};

export const updatePostLike =
  (postId, currentUserId) => async (dispatch, getState) => {
    try {
      const postRef = doc(db, "posts", postId);
      const getPost = await getDoc(postRef);
      const allLikes = getPost.data().likes;

      if (allLikes.includes(currentUserId)) {
        const updatedLikes = allLikes.filter(
          (userId) => userId !== currentUserId
        );
        await updateDoc(postRef, { likes: updatedLikes });
      } else {
        await updateDoc(postRef, { likes: [...allLikes, currentUserId] });
      }

      await dispatch(getAllPosts());
    } catch (error) {
      console.log("message:", error.message);
    }
  };
