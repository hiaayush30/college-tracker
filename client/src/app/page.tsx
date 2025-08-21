"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

function Page() {
  const router = useRouter();
  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden">
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

      {/* Radial glow effect */}
      <div className="absolute left-1/2 top-[-20%] h-[1000px] w-[1000px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_400px_at_center,#fbfbfb36,#000)]" />

      {/* Page content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen gap-6">
        <h1 className="text-5xl font-bold">College Tracker</h1>
        <p className='text-slate-300'>Track your tests, assignments and much more</p>
        <Button onClick={()=>router.push("/login")} className='bg-transparent border-1 border-slate-300 cursor-pointer' variant="outline">Get Started</Button>
      </div>
    </div>
  )
}

export default Page
