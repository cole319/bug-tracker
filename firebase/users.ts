// firebase/users.ts
import { db } from "./config";
import { setDoc, doc } from "firebase/firestore";
import { User } from "firebase/auth";

interface CreateUserProfileOptions {
  user: User;
  displayName?: string; // optional custom name
}

/**
 * Ensure user exists in Firestore users collection
 */
export async function createUserProfile({
  user,
  displayName,
}: CreateUserProfileOptions) {
  if (!user) return;

  // Determine final display name
  let finalDisplayName = displayName?.trim();
  if (!finalDisplayName) {
    if (user.email) {
      finalDisplayName = user.email.split(/[^a-zA-Z0-9]/)[0]; // stop at . _ etc.
    } else {
      finalDisplayName = "Unnamed User";
    }
  }

  const userRef = doc(db, "users", user.uid);

  await setDoc(
    userRef,
    {
      displayName: finalDisplayName,
      email: user.email || null,
      photoURL: user.photoURL || null,
      role: "developer", // default role
      updatedAt: Date.now(),
    },
    { merge: true } // merge avoids overwriting existing data
  );
}
