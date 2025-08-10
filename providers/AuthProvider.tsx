// AuthProvider.tsx

"use client";

import { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          })
        );
      } else {
        dispatch(clearUser());
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [dispatch]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }
  return <>{children}</>;
}
