"use client";
import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { IUserToken } from "./layout";

export default function AuthProvider({ user, children }: { user: IUserToken | null; children: React.ReactNode }) {
  const { setUser } = useAuthStore();

  useEffect(() => {
    setUser(user);
  }, [user, setUser]);

  return <>{children}</>;
}
