// useTheme.ts
"use client";

import { useEffect } from "react";
import { useAppSelector } from "@/stores/storeHooks";

export default function useTheme() {
  const theme = useAppSelector((state) => state.theme.mode);

  useEffect(() => {
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(theme);
  }, [theme]);
}
