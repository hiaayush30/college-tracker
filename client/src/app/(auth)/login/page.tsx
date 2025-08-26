"use client"
import LoginPage from '@/components/login'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useState } from 'react'

function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e:FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      return alert("username and password required")
    }
    try {
      setLoading(true);
      await axios.post(process.env.NEXT_PUBLIC_BE_URL+"/user/login",{
        username,
        password
      })
      alert("Login successfull!");
      router.push("/dashboard");
    } catch (error) {
       alert("Invalid credentials!")
    }
    finally{
      setLoading(false)
    }
  }
  return (
    <div>
      <LoginPage handleSubmit={handleSubmit} setPassword={setPassword} setUsername={setUsername} loading={loading} />
    </div>
  )
}

export default Login
