// features/issues/issueSlice.ts

import {
  createSlice,
  PayloadAction,
  createSelector,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { Issue, IssueWithDoc, resolveIssue } from "@/firebase/issues";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase/config";
import { RootState } from "@/stores/store";
import { selectFilter } from "@/features/filter/filterSlice";
import { TeamMember } from "../team/teamSlice";

interface IssuesState {
  items: IssueWithDoc[];
  loading: boolean;
  error: string | null;
}

const initialState: IssuesState = {
  items: [],
  loading: false,
  error: null,
};

export const assignIssue = createAsyncThunk(
  "issues/assignIssue",
  async ({
    issueId,
    member,
  }: {
    issueId: string;
    member: TeamMember | null;
  }) => {
    const issueRef = doc(db, "issues", issueId);

    if (member) {
      await updateDoc(issueRef, {
        assignedTo: {
          uid: member.uid,
          displayName: member.displayName ?? null,
          email: member.email ?? null,
        },
        status: "in_progress",
        updatedAt: serverTimestamp(),
      });
    } else {
      await updateDoc(issueRef, {
        assignedTo: null,
        status: "open",
        updatedAt: serverTimestamp(),
      });
    }

    return { issueId, member };
  }
);

export const resolveIssueThunk = createAsyncThunk<
  { docId: string }, // return type
  string // input type (docId)
>("issues/resolveIssue", async (docId, { rejectWithValue }) => {
  try {
    await resolveIssue(docId); // update in Firestore
    return { docId };
  } catch (err: any) {
    console.error("Resolve issue failed:", err);
    return rejectWithValue(err.message);
  }
});

const issuesSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {
    setIssues: (state, action: PayloadAction<IssueWithDoc[]>) => {
      state.items = action.payload;
    },
    addIssue: (state, action: PayloadAction<IssueWithDoc>) => {
      state.items.unshift(action.payload);
    },
    updateIssueInState: (
      state,
      action: PayloadAction<{ docId: string; patch: Partial<Issue> }>
    ) => {
      const { docId, patch } = action.payload;
      const idx = state.items.findIndex((i) => i.docId === docId);
      if (idx !== -1) {
        state.items[idx] = {
          ...state.items[idx],
          ...patch,
          updatedAt: Date.now(),
        };
      }
    },
    removeIssue: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((i) => i.docId !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(assignIssue.fulfilled, (state, action) => {
      const { issueId, member } = action.payload;
      const idx = state.items.findIndex((i) => i.docId === issueId);
      if (idx !== -1) {
        state.items[idx] = {
          ...state.items[idx],
          assignedTo: member,
          status: member ? "in_progress" : "open",
          updatedAt: Date.now(),
        };
      }
    });
  },
});

export const {
  setIssues,
  addIssue,
  updateIssueInState,
  removeIssue,
  setError,
  setLoading,
} = issuesSlice.actions;

export default issuesSlice.reducer;

export const selectIssues = (state: RootState) => state.issues.items;

export const selectFilteredIssues = createSelector(
  [selectIssues, selectFilter],
  (issues, filter) => {
    return issues.filter((issue) => {
      // Firestore already filtered status/priority/etc.
      // Here you refine further in-memory:

      if (filter.scope === "user") {
        if (filter.assignedTo && issue.assignedTo?.uid !== filter.assignedTo) {
          return false;
        }
        if (filter.createdBy && issue.createdBy.uid !== filter.createdBy) {
          return false;
        }
      }

      if (filter.search) {
        const search = filter.search.toLowerCase();
        if (
          !issue.title.toLowerCase().includes(search) &&
          !issue.description.toLowerCase().includes(search)
        ) {
          return false;
        }
      }

      return true;
    });
  }
);
