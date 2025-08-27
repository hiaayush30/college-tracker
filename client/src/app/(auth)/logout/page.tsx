"use client"
import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/useAuthStore"
import axios from "axios"
import { Loader2 } from "lucide-react"

function LogoutPage() {
  const router = useRouter()
  const clearUser = useAuthStore((state) => state.clearUser) // assuming you have clearUser in your store

  useEffect(() => {
    const logout = async () => {
      try {
        await axios.post("/user/logout", {}, { withCredentials: true })
        clearUser() // clear state in store
        router.replace("/login") // redirect after logout
      } catch (error) {
        console.error("Logout failed:", error)
        router.replace("/login")
      }
    }

    logout()
  }, [router, clearUser])

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex items-center gap-2 text-lg font-medium text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" />
        Logging you out...
      </div>
    </div>
  )
}

export default LogoutPage
