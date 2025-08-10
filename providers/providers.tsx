// providers.tsx
"use client";

import { Provider } from "react-redux";
import { store } from "@/stores/store";
import AuthProvider from "@/providers/AuthProvider";
import { ThemeInitializer } from "@/providers/ThemeInitializer";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ThemeInitializer />
        {children}
      </AuthProvider>
    </Provider>
  );
}
