// firebase/issues.ts
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  getDocs,
  where,
  Unsubscribe,
  DocumentData,
  QuerySnapshot,
} from "firebase/firestore";
import app from "./config";
import { v4 as uuidv4 } from "uuid";
import { Timestamp } from "firebase/firestore";

const db = getFirestore(app);
const issuesCol = collection(db, "issues");

export type Issue = {
  id: string; // Custom ID (shown in UI, e.g. BUG#20250816-XXXX)
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  status: "open" | "in_progress" | "resolved";
  createdBy: {
    uid: string;
    displayName?: string | null;
    email?: string | null;
  };
  assignedTo?: {
    uid: string;
    displayName?: string | null;
    email?: string | null;
  } | null;
  createdAt?: number | null;
  updatedAt?: number | null;
};

export type IssueWithDoc = Issue & { docId: string };

// helper to generate readable id: bug#YYYYMMDD-xxxx
export function generateIssueId() {
  const date = new Date();
  const y = date.getFullYear().toString();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  // short random suffix
  const suffix = uuidv4().slice(0, 6).toUpperCase();
  return `BUG#${y}${m}${d}-${suffix}`;
}

// Create a new Issue and add on the dashboard
export async function createIssue(payload: Omit<Issue, "id" | "createdAt">) {
  const customId = generateIssueId();
  const docRef = await addDoc(issuesCol, {
    ...payload,
    id: customId, // custom issue ID stored in Firestore
    createdAt: serverTimestamp(),
  });
  return { docId: docRef.id, id: customId };
}

// Updates editable fields of the issue and updatedAt timestamp
export async function updateIssue(docId: string, patch: Partial<Issue>) {
  const issueRef = doc(db, "issues", docId);

  // Prevent overriding id
  const { id: _, ...safePatch } = patch;

  await updateDoc(issueRef, {
    ...safePatch,
    updatedAt: serverTimestamp(),
  });
}

// Delete an issue
export async function deleteIssue(docId: string) {
  const ref = doc(db, "issues", docId);
  await deleteDoc(ref);
}

// One-off fetch (non-realtime)
export async function fetchIssuesOnce(limit = 100) {
  const q = query(issuesCol, orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data() as DocumentData);
}

// Assign Issue to an user and update state to "in_progress"
export async function assignIssue(
  docId: string,
  user: { uid: string; displayName?: string | null; email?: string | null }
) {
  const issueRef = doc(db, "issues", docId);

  await updateDoc(issueRef, {
    assignedTo: {
      uid: user.uid,
      displayName: user.displayName || null,
      email: user.email || null,
    },
    status: "in_progress",
    updatedAt: serverTimestamp(),
  });
}

// Mark an issue as resolved
export async function resolveIssue(docId: string) {
  const issueRef = doc(db, "issues", docId);

  await updateDoc(issueRef, {
    status: "resolved",
    updatedAt: serverTimestamp(),
  });
}

// Realtime listener helper
export function subscribeToIssues(
  onChange: (issues: IssueWithDoc[]) => void,
  opts?: { status?: string; priority?: string }
): Unsubscribe {
  const constraints: any[] = [];
  if (opts?.status) constraints.push(where("status", "==", opts.status));
  if (opts?.priority) constraints.push(where("priority", "==", opts.priority));

  const q = query(issuesCol, orderBy("createdAt", "desc"), ...constraints);

  return onSnapshot(q, (snapshot: QuerySnapshot) => {
    const issues: IssueWithDoc[] = snapshot.docs.map((d) => {
      const raw = d.data() as Issue & {
        createdAt?: Timestamp | null;
        updatedAt?: Timestamp | null;
      };

      return {
        ...raw,
        docId: d.id,
        createdAt:
          (raw.createdAt as any) instanceof Timestamp
            ? (raw.createdAt as Timestamp).toMillis()
            : (raw.createdAt as number | null) ?? null,
        updatedAt:
          (raw.updatedAt as any) instanceof Timestamp
            ? (raw.updatedAt as Timestamp).toMillis()
            : (raw.updatedAt as number | null) ?? null,
      };
    });
    onChange(issues);
  });
}
