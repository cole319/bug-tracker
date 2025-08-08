// ThemeInitializer.tsx

"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTheme } from "@/features/theme/themeSlice";

export function ThemeInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    dispatch(setTheme(savedTheme));
  }, [dispatch]);

  return null;
}
