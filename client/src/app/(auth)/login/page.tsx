"use client"
import LoginPage from '@/components/login';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react';
import { toast } from "sonner";

function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: FormEvent<Element>) => {
    e.preventDefault();
    if (!username || !password) {
      toast("username and password required")
      return;
    }
    try {
      setLoading(true);
      const { data } = await axios.post<{ token: string }>(process.env.NEXT_PUBLIC_BE_URL + "/user/login", {
        username,
        password
      }, {
        withCredentials: true
      })
      localStorage.setItem("token",JSON.stringify(data.token))
      toast("Login successfull!");
      router.push("/dashboard");
    } catch (error) {
      toast("Invalid credentials!")
    }
    finally {
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
