"use client";

import { onAuthStateChanged, User } from "firebase/auth";
import { useAppDispatch } from "@/stores/storeHooks";
import { useEffect } from "react";
import { setUser, clearUser } from "@/features/auth/authSlice";
import { auth } from "@/firebase/config";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        dispatch(setUser(user));
      } else {
        dispatch(clearUser());
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  return <>{children}</>;
}
