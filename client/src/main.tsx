import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard.tsx'
import Error from './pages/Error.tsx'
import Login from './pages/Login.tsx'
import Signup from './pages/Signup.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Main App Route */}
        <Route path="/" element={<App />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup />} />

        {/* Error Page - catch-all */}
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
