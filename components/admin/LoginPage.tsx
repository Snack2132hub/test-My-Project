import { useState } from 'react'
import Link from 'next/link'

interface Props {
  onLogin: (username: string) => void
}

export default function LoginPage({ onLogin }: Props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username.trim()) { setError('กรุณาใส่ Username'); return }
    if (!password.trim()) { setError('กรุณาใส่ Password'); return }

    setError('')
    setLoading(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim(), password }),
      })
      const data = await res.json()
      if (data.ok) {
        onLogin(data.full_name || data.username)
      } else {
        setError(data.message || 'เข้าสู่ระบบไม่สำเร็จ')
      }
    } catch {
      setError('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #c9dff5 0%, #ddeeff 40%, #b8d4ee 100%)',
      }}
    >
      {/* Hospital building background blur effect */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1600&h=900&fit=crop&auto=format)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(2px)',
        }}
      />

      {/* Logo */}
      <div className="relative z-10 flex flex-col items-center mb-6">
        <div className="flex flex-col items-center gap-1 select-none">
          <div className="relative w-20 h-20">
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-lg">
              <circle cx="40" cy="28" r="14" fill="#1a56db" opacity="0.15" />
              <circle cx="26" cy="22" r="6" fill="#f59e0b" />
              <path d="M16 44c0-5.5 4.5-10 10-10h0c5.5 0 10 4.5 10 10" fill="#f59e0b" />
              <circle cx="54" cy="22" r="6" fill="#22c55e" />
              <path d="M44 44c0-5.5 4.5-10 10-10h0c5.5 0 10 4.5 10 10" fill="#22c55e" />
              <path d="M40 58 C40 58 24 46 24 36a10 10 0 0 1 16-8 10 10 0 0 1 16 8C56 46 40 58 40 58z" fill="#e53e3e" />
              <rect x="37" y="32" width="6" height="14" rx="2" fill="white" />
              <rect x="33" y="36" width="14" height="6" rx="2" fill="white" />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold tracking-widest drop-shadow" style={{ color: '#1a3a6b' }}>
              ADMIN PNNH
            </p>
            <p className="text-xs font-medium" style={{ color: '#4a6a9b' }}>
              โรงพยาบาลปากช่องนานา
            </p>
          </div>
        </div>
      </div>

      {/* Card */}
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md mx-4">
        <h1 className="text-2xl font-bold text-center mb-1" style={{ color: '#1a3a6b' }}>
          Login เข้าสู่ระบบ
        </h1>
        <p className="text-center text-sm mb-7" style={{ color: '#6b7a99' }}>
          กรุณาใส่ Username &amp; Password เพื่อเข้าสู่ระบบ
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium" style={{ color: '#1a2a4a' }}>
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border rounded-lg px-4 py-2.5 text-sm outline-none transition-all focus:ring-2"
              style={{ borderColor: '#d1dcea', color: '#1a2a4a' }}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#1a56db')}
              onBlur={(e) => (e.currentTarget.style.borderColor = '#d1dcea')}
              placeholder="username"
              autoComplete="username"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium" style={{ color: '#1a2a4a' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded-lg px-4 py-2.5 text-sm outline-none transition-all"
              style={{ borderColor: '#d1dcea', color: '#1a2a4a' }}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#1a56db')}
              onBlur={(e) => (e.currentTarget.style.borderColor = '#d1dcea')}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          {error && (
            <p className="text-sm text-center" style={{ color: '#e53e3e' }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-1 py-3 rounded-lg text-white font-semibold text-sm transition-all hover:opacity-90 active:scale-95 disabled:opacity-60"
            style={{ background: '#1a56db' }}
          >
            {loading ? 'กำลังเข้าสู่ระบบ...' : 'Login'}
          </button>
        </form>

        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:underline"
            style={{ color: '#1a56db' }}
          >
            กลับหน้าหลัก
          </Link>
        </div>
      </div>
    </div>
  )
}
