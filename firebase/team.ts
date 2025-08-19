import { db } from "./config"; // your initialized Firestore instance
import { collection, getDocs } from "firebase/firestore";
import { TeamMember } from "@/features/team/teamSlice";

export async function getTeamMembers(): Promise<TeamMember[]> {
  const snapshot = await getDocs(collection(db, "users"));
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      uid: doc.id,
      displayName: data.displayName ?? null,
      email: data.email ?? null,
    };
  });
}
