import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Issue } from "@/firebase/issues";

interface IssuesState {
  items: Issue[];
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
    setIssues: (state, action: PayloadAction<Issue[]>) => {
      state.items = action.payload;
    },
    addIssue: (state, action: PayloadAction<Issue>) => {
      state.items.unshift(action.payload);
    },
    updateIssueInState: (
      state,
      action: PayloadAction<{ id: string; patch: Partial<Issue> }>
    ) => {
      const idx = state.items.findIndex((i) => i.id === action.payload.id);
      if (idx !== -1) {
        state.items[idx] = { ...state.items[idx], ...action.payload.patch };
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
