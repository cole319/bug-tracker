// features/team/teamSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getTeamMembers } from "@/firebase/team"; // we'll build this helper
import { RootState } from "@/stores/store";

export type TeamMember = {
  uid: string;
  displayName: string | null;
  email: string | null;
};

interface TeamState {
  members: TeamMember[];
  loading: boolean;
  error: string | null;
}

const initialState: TeamState = {
  members: [],
  loading: false,
  error: null,
};

// 🔹 Thunk: fetch all team members from Firestore
export const fetchTeam = createAsyncThunk<TeamMember[]>(
  "team/fetchTeam",
  async () => {
    const members = await getTeamMembers();
    return members;
  }
);

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    // optional reducer if you want to manually add/update members
    addMember: (state, action: PayloadAction<TeamMember>) => {
      state.members.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeam.fulfilled, (state, action) => {
        state.members = action.payload;
        state.loading = false;
      })
      .addCase(fetchTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load team";
      });
  },
});

export const { addMember } = teamSlice.actions;

export const selectTeam = (state: RootState) => state.team.members;
export const selectTeamLoading = (state: RootState) => state.team.loading;

export default teamSlice.reducer;
