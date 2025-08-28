"use client";
import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { IUserToken } from "./layout";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";

export default function AuthProvider({ children }: {children: React.ReactNode }) {
  const { setUser } = useAuthStore();
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return router.replace("/login");
    }

    const decoded = jwt.decode(token) as IUserToken;
    setUser(decoded);
  }, [router,setUser]);

  return <>{children}</>;
}
