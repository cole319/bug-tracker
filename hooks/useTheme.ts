"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/stores/storeHooks";
import { setTheme } from "@/features/theme/themeSlice";

export default function useTheme() {
  const theme = useAppSelector((state) => state.theme.mode);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Only run on client side
    if (typeof window !== "undefined") {
      // Check for saved theme preference
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        dispatch(setTheme(savedTheme));
      }

      // Apply the theme class
      document.documentElement.classList.remove("dark", "light");
      document.documentElement.classList.add(theme);
    }
  }, [theme, dispatch]);
}
