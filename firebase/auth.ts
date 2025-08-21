// firebase/auth.ts
import { auth } from "./config";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile, // ⬅️ import this
} from "firebase/auth";
import { createUserProfile } from "./users";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    await createUserProfile({ user: result.user });
    return result.user;
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    throw error;
  }
};

// 🔹 modified to accept displayName
export const registerWithEmail = async (
  email: string,
  password: string,
  displayName?: string
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Sync with Firebase Auth profile too
    if (displayName) {
      await updateProfile(userCredential.user, { displayName });
    }

    // Save to Firestore
    await createUserProfile({
      user: userCredential.user,
      displayName,
    });

    return userCredential.user;
  } catch (error) {
    console.error("Email Registration Error:", error);
    throw error;
  }
};

export const loginWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    await createUserProfile({ user: userCredential.user });
    return userCredential.user;
  } catch (error) {
    console.error("Email Login Error:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout Error:", error);
  }
};
