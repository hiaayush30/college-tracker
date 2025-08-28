"use client";
import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";
import { IUserToken } from "./layout";
import { Loader } from "lucide-react";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, setUser } = useAuthStore();
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      const token = localStorage.getItem("token");
      if (!token) {
        return router.replace("/login")
      }
      const user = jwt.decode(token) as IUserToken;
      setUser(user)
    }
  }, [router, setUser, user]);

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center"><Loader className="animate-spin" /></div>
  }

  return <>{children}</>;
}
