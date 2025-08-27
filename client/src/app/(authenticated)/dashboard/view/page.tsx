"use client"
import { useAuthStore } from '@/store/useAuthStore'
import React from 'react'

function ViewAssignment() {
  const {user} = useAuthStore();
  return (
    <div>
      View Assignment
      {JSON.stringify(user)}
    </div>
  )
}

export default ViewAssignment
