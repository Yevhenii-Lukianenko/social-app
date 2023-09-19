import { authSlice } from "./authSlice";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/config";

export const authSignUpUser =
  ({ email, password, name, avatarUrl }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const user = await auth.currentUser;

      await updateProfile(user, { displayName: name, photoURL: avatarUrl });

      const {
        uid,
        displayName,
        photoURL,
        email: userEmail,
      } = await auth.currentUser;

      await dispatch(
        authSlice.actions.updateUserProfile({
          userId: uid,
          nickName: displayName,
          avatarUrl: photoURL,
          userEmail,
        })
      );
      const userDocRef = doc(db, `users/${uid}`);

      await setDoc(userDocRef, {
        userId: uid,
        nickName: displayName,
        avatarUrl: photoURL,
        userEmail,
      });
    } catch (error) {
      console.log("error:", error);
      console.log("message:", error.message);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log("error:", error);
      console.log("message:", error.message);
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  try {
    await signOut(auth);
    dispatch(authSlice.actions.authSignOutUser());
  } catch (error) {
    console.log("error:", error);
    console.log("message:", error.message);
  }
};

export const authStateChangeUser = () => async (dispatch, getState) => {
  try {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const userUpdateProfile = {
          nickName: user.displayName,
          userId: user.uid,
          avatarUrl: user.photoURL,
          userEmail: user.email,
        };
        dispatch(authSlice.actions.updateUserProfile(userUpdateProfile));
        dispatch(authSlice.actions.authStateChangeUser({ stateChange: true }));
      }
    });
  } catch (error) {
    console.log("error:", error);
    console.log("message:", error.message);
  }
};

export const authUpdateUserAvatar =
  ({ avatarUrl }) =>
  async (dispatch, getState) => {
    try {
      const user = await auth.currentUser;

      await updateProfile(user, { photoURL: avatarUrl });

      const { photoURL, uid, displayName, email } = await auth.currentUser;

      await dispatch(
        authSlice.actions.updateUserAvatar({ avatarUrl: photoURL })
      );

      const userDocRef = doc(db, `users/${uid}`);
      await updateDoc(userDocRef, {
        avatarUrl: photoURL,
      });
    } catch (error) {
      console.log("error:", error);
      console.log("message:", error.message);
    }
  };

export const getInfoAboutUser = async (ownerId) => {
  try {
    const userDocRef = doc(db, `users/${ownerId}`);
    const aboutOwner = await getDoc(userDocRef);
    return aboutOwner;
  } catch (error) {
    console.log("message:", error.message);
  }
};
