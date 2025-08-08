// themeSlice.ts

"use client";
import { createSlice } from "@reduxjs/toolkit";

function getCurrentTheme() {
  try {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme : "light";
  } catch {
    return "light";
  }
}

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    mode: getCurrentTheme(),
  },
  reducers: {
    setTheme: (state, action) => {
      state.mode = action.payload;
    },
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", state.mode);
      }
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
