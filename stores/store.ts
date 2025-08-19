import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "@/features/theme/themeSlice";
import authReducer from "@/features/auth/authSlice";
import issuesReducer from "@/features/issues/issuesSlice";
import filterReducer from "@/features/filter/filterSlice";
import teamReducer from "@/features/team/teamSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    issues: issuesReducer,
    filter: filterReducer,
    team: teamReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
