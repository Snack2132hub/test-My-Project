"use client";

import { useState } from 'react'
import LoginPage from '@/components/admin/LoginPage'
import Dashboard from '@/components/admin/Dashboard'

export default function AdminPage() {
  const [page, setPage] = useState<'login' | 'dashboard'>('login')
  const [username, setUsername] = useState('')

  const handleLogin = (user: string) => {
    setUsername(user)
    setPage('dashboard')
  }

  const handleLogout = () => {
    setPage('login')
    setUsername('')
  }

  if (page === 'dashboard') {
    return <Dashboard username={username} onLogout={handleLogout} />
  }
  return <LoginPage onLogin={handleLogin} />
}
