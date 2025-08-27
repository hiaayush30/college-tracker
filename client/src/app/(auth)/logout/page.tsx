"use client"
import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { Loader2 } from "lucide-react"

function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    const logout = async () => {
      try {
        await axios.post(process.env.NEXT_PUBLIC_BE_URL+"/user/logout", {}, { withCredentials: true })
        router.replace("/login") // redirect after logout
      } catch (error) {
        console.error("Logout failed:", error)
        router.replace("/dashboard")
      }
    }

    logout()
  }, [router])

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
