// firebase/users.ts
import { db } from "./config";
import { setDoc, doc } from "firebase/firestore";
import { User } from "firebase/auth";

/**
 * Ensure user exists in Firestore users collection
 */
export async function createUserProfile(user: User) {
  if (!user) return;

  const userRef = doc(db, "users", user.uid);

  await setDoc(
    userRef,
    {
      displayName: user.displayName || "Unnamed User",
      email: user.email || null,
      photoURL: user.photoURL || null,
      role: "developer", // default role, can be changed later
      updatedAt: Date.now(),
    },
    { merge: true } // merge avoids overwriting on repeat sign-ins
  );
}
