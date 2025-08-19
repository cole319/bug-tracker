// features/issues/issueSlice.ts

import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { Issue, IssueWithDoc } from "@/firebase/issues";
import { RootState } from "@/stores/store";
import { selectFilter } from "@/features/filter/filterSlice";

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
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
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
