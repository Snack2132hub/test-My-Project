"use client";

import { useEffect, useState } from 'react'
import LoginPage from '@/components/admin/LoginPage'
import Dashboard from '@/components/admin/Dashboard'

export default function AdminPage() {
  const [page, setPage] = useState<'checking' | 'login' | 'dashboard'>('checking')
  const [username, setUsername] = useState('')

  useEffect(() => {
    let isMounted = true
    fetch('/api/admin/session')
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return
        if (data.ok && data.authenticated) {
          setUsername(data.username ?? '')
          setPage('dashboard')
        } else {
          setPage('login')
        }
      })
      .catch(() => {
        if (isMounted) setPage('login')
      })
    return () => {
      isMounted = false
    }
  }, [])

  const handleLogin = (user: string) => {
    setUsername(user)
    setPage('dashboard')
  }

  const handleLogout = () => {
    fetch('/api/admin/logout', { method: 'POST' }).catch(() => {})
    setPage('login')
    setUsername('')
  }

  if (page === 'checking') {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm" style={{ color: '#1a3a6b' }}>
        กำลังตรวจสอบสิทธิ์...
      </div>
    )
  }

  if (page === 'dashboard') {
    return <Dashboard username={username} onLogout={handleLogout} />
  }
  return <LoginPage onLogin={handleLogin} />
}
