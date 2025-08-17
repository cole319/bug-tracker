import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/stores/store";

type FilterState = {
  scope: "user" | "team";
  status?: "open" | "in_progress" | "resolved";
  priority?: "high" | "medium" | "low";
  assignedTo?: string | null;
  createdBy?: string | null;
  search?: string;
};

const initialState: FilterState = {
  scope: "team",
  status: undefined,
  priority: undefined,
  assignedTo: null,
  createdBy: null,
  search: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<FilterState>) => {
      return action.payload;
    },
    updateFilter: (state, action: PayloadAction<Partial<FilterState>>) => {
      return { ...state, ...action.payload };
    },
    resetFilter: () => {
      return initialState;
    },
  },
});

export const { setFilter, updateFilter, resetFilter } = filterSlice.actions;

export default filterSlice.reducer;

export const selectFilter = (state: RootState) => state.filter;
