"use client"
import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    const logout = async () => {
        localStorage.clear()
        toast("Logged out succefully!")
        router.replace("/login") // redirect after logout
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
