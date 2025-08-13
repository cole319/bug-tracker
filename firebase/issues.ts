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

const db = getFirestore(app);
const issuesCol = collection(db, "issues");

export type Issue = {
  id: string;
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
  createdAt?: any;
};

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

export async function createIssue(payload: Omit<Issue, "id" | "createdAt">) {
  const id = generateIssueId();
  const docRef = await addDoc(issuesCol, {
    ...payload,
    id,
    createdAt: serverTimestamp(),
  });
  return { id: docRef.id, docRef };
}

export async function updateIssue(issueId: string, patch: Partial<Issue>) {
  const issueDoc = doc(db, "issues", issueId);
  await updateDoc(issueDoc, {
    ...patch,
    updatedAt: serverTimestamp(),
  });
  return true;
}

export async function deleteIssue(issueId: string) {
  const issueDoc = doc(db, "issues", issueId);
  await deleteDoc(issueDoc);
  return true;
}

// One-off fetch (non-realtime)
export async function fetchIssuesOnce(limit = 100) {
  const q = query(issuesCol, orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data() as DocumentData);
}

// Realtime listener helper
export function subscribeToIssues(
  onChange: (issues: any[]) => void,
  opts?: { status?: string; priority?: string } // optional filter
): Unsubscribe {
  const constraints: any[] = [];
  if (opts?.status) constraints.push(where("status", "==", opts.status));
  if (opts?.priority) constraints.push(where("priority", "==", opts.priority));
  const q = query(issuesCol, orderBy("createdAt", "desc"), ...constraints);
  const unsub = onSnapshot(q, (snapshot: QuerySnapshot) => {
    const issues = snapshot.docs.map((d) => d.data());
    onChange(issues);
  });
  return unsub;
}
