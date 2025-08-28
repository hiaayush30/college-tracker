"use client";
import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.replace("/login")
    }
  }, [router, user]);

  return <>{children}</>;
}
