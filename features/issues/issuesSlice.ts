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
import { TeamMember } from "../team/teamSlice";

// interface IssuesState {
//   items: IssueWithDoc[];
//   loading: boolean;
//   error: string | null;
// }

interface IssueUIState {
  status: "all" | "open" | "in_progress" | "resolved";
  priority: "all" | "low" | "medium" | "high";
  search: string;

  // new fields
  scope: "all" | "user" | "team";
  assignedTo?: string; // uid of the assignee
  createdBy?: string; // uid of the creator
}

// const initialState: IssuesState = {
//   items: [],
//   loading: false,
//   error: null,
// };

const initialUIState: IssueUIState = {
  status: "all",
  priority: "all",
  search: "",
  scope: "all",
  assignedTo: undefined,
  createdBy: undefined,
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
  initialState: {
    items: [] as IssueWithDoc[],
    filters: initialUIState,
    loading: false,
    error: null as string | null,
  },
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
    setFilters: (state, action: PayloadAction<Partial<IssueUIState>>) => {
      state.filters = { ...state.filters, ...action.payload };
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
  setFilters,
  setError,
  setLoading,
} = issuesSlice.actions;

export default issuesSlice.reducer;

export const selectIssues = (state: RootState) => state.issues.items;

// base selectors

const selectFilters = (state: RootState) => state.issues.filters;

// refined selector
export const selectFilteredIssues = createSelector(
  [selectIssues, selectFilters],
  (issues, filters) => {
    return issues.filter((issue) => {
      // --- scope filtering ---
      if (filters.scope === "user") {
        if (
          filters.assignedTo &&
          issue.assignedTo?.uid !== filters.assignedTo
        ) {
          return false;
        }
        if (filters.createdBy && issue.createdBy.uid !== filters.createdBy) {
          return false;
        }
      }

      // --- status filtering ---
      if (filters.status && filters.status !== "all") {
        if (issue.status !== filters.status) {
          return false;
        }
      }

      // --- priority filtering ---
      if (filters.priority && filters.priority !== "all") {
        if (issue.priority !== filters.priority) {
          return false;
        }
      }

      // --- search filtering ---
      if (filters.search) {
        const search = filters.search.toLowerCase();
        if (
          !issue.title.toLowerCase().includes(search) &&
          !issue.description.toLowerCase().includes(search) &&
          !issue.id.toLowerCase().includes(search)
        ) {
          return false;
        }
      }

      return true;
    });
  }
);
