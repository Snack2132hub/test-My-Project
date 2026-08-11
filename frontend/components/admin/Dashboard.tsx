'use client'

import { useState, type Dispatch, type SetStateAction } from 'react'
import HealthCheckupManager from '@/components/admin/HealthCheckupManager'
import {
  LayoutDashboard,
  Hospital,
  HeartPulse,
  Stethoscope,
  Bell,
  ClipboardCheck,
  ClipboardList,
  PhoneCall,
  LogOut,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  type LucideIcon,
} from 'lucide-react'

interface Props {
  username: string
  onLogout: () => void
}

interface SidebarProps {
  expandedMenus: Record<string, boolean>
  setExpandedMenus: Dispatch<SetStateAction<Record<string, boolean>>>
  activeNav: string
  setActiveNav: (id: string) => void
  setSidebarOpen: (open: boolean) => void
  onLogout: () => void
}

type NavItem = {
  id: string
  icon: LucideIcon
  label: string
  hasChildren?: boolean
  isLogout?: boolean
}

type NavSection = {
  label: string | null
  items: NavItem[]
}

const navSections: NavSection[] = [
  {
    label: null,
    items: [{ id: 'home', icon: LayoutDashboard, label: 'หน้าแรก' }],
  },
  {
    label: 'ลงข้อมูล',
    items: [
      { id: 'hospital', icon: Hospital, label: 'ข้อมูลโรงพยาบาล', hasChildren: true },
      { id: 'patient', icon: HeartPulse, label: 'ศูนย์บริการผู้ป่วย', hasChildren: true },
      { id: 'doctor', icon: Stethoscope, label: 'แพทย์ รพ.ปากช่องนานา' },
      { id: 'news', icon: Bell, label: 'ข่าวสารทางการแพทย์/กิจกรรม' },
    ],
  },
  {
    label: 'PAGES',
    items: [
      { id: 'register', icon: ClipboardCheck, label: 'ลงข้อมูลเรียบร้อย' },
      { id: 'verify', icon: ClipboardList, label: 'ตรวจสอบข้อมูล (Admin)' },
      { id: 'contact', icon: PhoneCall, label: 'ติดต่อเจ้าหน้าที่ IT' },
      { id: 'logout-nav', icon: LogOut, label: 'ออกจากระบบ', isLogout: true },
    ],
  },
]

const recentUpdates = [
  { date: '4/10/2565', actor: 'องค์กรแพทย์', detail: 'ลงข้อมูลแพทย์ นางปนัดดา เขมรัตน์ตระกูล' },
  { date: '4/10/2565', actor: 'องค์กรแพทย์', detail: 'ลงข้อมูลแพทย์ นางปนัดดา เขมรัตน์ตระกูล' },
  { date: '4/10/2565', actor: 'องค์กรแพทย์', detail: 'ลงข้อมูลแพทย์ นางปนัดดา เขมรัตน์ตระกูล' },
]

const hospitalImages = [
  'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=900&h=500&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900&h=500&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=900&h=500&fit=crop&auto=format',
]

function Sidebar({ expandedMenus, setExpandedMenus, activeNav, setActiveNav, setSidebarOpen, onLogout }: SidebarProps) {
  return (
    <aside
      className="h-full flex flex-col py-4 overflow-y-auto"
      style={{ background: '#ffffff', borderRight: '1px solid #d1dcea' }}
    >
      {navSections.map((section, si) => (
        <div key={si} className="mb-2">
          {section.label && (
            <p className="px-5 py-1 text-xs font-semibold uppercase tracking-widest" style={{ color: '#6b7a99' }}>
              {section.label}
            </p>
          )}
          {section.items.map((item) => {
            const Icon = item.icon
            const isActive = activeNav === item.id
            return (
              <div
                key={item.id}
                onMouseEnter={() => { if ('hasChildren' in item && item.hasChildren) setExpandedMenus((p) => ({ ...p, [item.id]: true })) }}
                onMouseLeave={() => { if ('hasChildren' in item && item.hasChildren) setExpandedMenus((p) => ({ ...p, [item.id]: false })) }}
              >
                <button
                  onClick={() => {
                    if ('isLogout' in item && item.isLogout) {
                      onLogout()
                    } else if (!('hasChildren' in item && item.hasChildren)) {
                      setActiveNav(item.id)
                      setSidebarOpen(false)
                    }
                  }}
                  className="w-full flex items-center justify-between px-5 py-2.5 text-sm transition-all duration-150 group"
                  style={{
                    color: isActive ? '#1a56db' : '#1a2a4a',
                    background: isActive ? '#e8f0fd' : 'transparent',
                    borderLeft: isActive ? '3px solid #1a56db' : '3px solid transparent',
                    fontWeight: isActive ? 600 : 400,
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = '#f0f4fd'
                      e.currentTarget.style.color = '#1a56db'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.color = '#1a2a4a'
                    }
                  }}
                >
                  <span className="flex items-center gap-3">
                    <Icon size={22} strokeWidth={1.8} className="flex-shrink-0" />
                    {item.label}
                  </span>
                  {'hasChildren' in item && item.hasChildren && (
                    expandedMenus[item.id]
                      ? <ChevronUp size={14} className="opacity-50" />
                      : <ChevronDown size={14} className="opacity-50" />
                  )}
                </button>

                {'hasChildren' in item && item.hasChildren && expandedMenus[item.id] && (
                  <div className="pl-12 py-1 flex flex-col gap-0.5">
                    {item.id === 'hospital' && (
                      <>
                        <button
                          className="text-left text-sm py-1.5 px-2 rounded-md transition-colors duration-150 flex items-center gap-2"
                          style={{ color: '#6b7a99' }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = '#f0f4fd'; e.currentTarget.style.color = '#1a56db' }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#6b7a99' }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full border border-current inline-block flex-shrink-0" />
                          ประวัติโรงพยาบาล
                        </button>
                        <button
                          className="text-left text-sm py-1.5 px-2 rounded-md transition-colors duration-150 flex items-center gap-2"
                          style={{ color: '#6b7a99' }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = '#f0f4fd'; e.currentTarget.style.color = '#1a56db' }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#6b7a99' }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full border border-current inline-block flex-shrink-0" />
                          วิสัยทัศน์-พันธกิจ
                        </button>
                      </>
                    )}
                    {item.id === 'patient' && (
                      <>
                        <button
                          onClick={() => { setActiveNav('health-checkup'); setSidebarOpen(false) }}
                          className="text-left text-sm py-1.5 px-2 rounded-md transition-colors duration-150 flex items-center gap-2"
                          style={{
                            color: activeNav === 'health-checkup' ? '#1a56db' : '#6b7a99',
                            fontWeight: activeNav === 'health-checkup' ? 600 : 400,
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = '#f0f4fd'; e.currentTarget.style.color = '#1a56db' }}
                          onMouseLeave={(e) => {
                            if (activeNav !== 'health-checkup') {
                              e.currentTarget.style.background = 'transparent'
                              e.currentTarget.style.color = '#6b7a99'
                            }
                          }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full border border-current inline-block flex-shrink-0" />
                          ศูนย์ตรวจสุขภาพ
                        </button>
                        <button
                          className="text-left text-sm py-1.5 px-2 rounded-md transition-colors duration-150 flex items-center gap-2"
                          style={{ color: '#6b7a99' }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = '#f0f4fd'; e.currentTarget.style.color = '#1a56db' }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#6b7a99' }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full border border-current inline-block flex-shrink-0" />
                          ศูนย์รักษาเฉพาะทาง
                        </button>
                        <button
                          className="text-left text-sm py-1.5 px-2 rounded-md transition-colors duration-150 flex items-center gap-2"
                          style={{ color: '#6b7a99' }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = '#f0f4fd'; e.currentTarget.style.color = '#1a56db' }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#6b7a99' }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full border border-current inline-block flex-shrink-0" />
                          ศูนย์รักษาพิเศษ
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      ))}
    </aside>
  )
}

export default function Dashboard({ username, onLogout }: Props) {
  const [activeNav, setActiveNav] = useState('home')
  const [slideIndex, setSlideIndex] = useState(0)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({})
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const prevSlide = () => setSlideIndex((i) => (i - 1 + hospitalImages.length) % hospitalImages.length)
  const nextSlide = () => setSlideIndex((i) => (i + 1) % hospitalImages.length)

  return (
    <div className="flex flex-col min-h-screen" style={{ background: '#eef3f9' }}>
      {/* Top navbar */}
      <header
        className="flex items-center justify-between px-4 md:px-6 py-3 shadow-sm z-30 relative"
        style={{ background: '#ffffff', borderBottom: '1px solid #d1dcea' }}
      >
        <div className="flex items-center gap-3">
          {/* Hamburger - mobile only */}
          <button
            className="md:hidden p-1.5 rounded-lg hover:bg-blue-50 transition-colors"
            onClick={() => setSidebarOpen((o) => !o)}
            style={{ color: '#1a56db' }}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
            style={{ background: '#1a56db' }}
          >
            P
          </div>
          <span className="font-bold text-lg tracking-wide" style={{ color: '#1a3a6b' }}>
            PNNH
          </span>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setUserMenuOpen(true)}
          onMouseLeave={() => setUserMenuOpen(false)}
        >
          <button
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors hover:bg-blue-50 text-sm font-semibold"
            style={{ color: '#1a56db' }}
          >
            <span className="hidden sm:inline">{username}</span>
            <ChevronDown size={14} />
          </button>
          {userMenuOpen && (
            <div
              className="absolute right-0 top-full mt-1 w-48 rounded-xl shadow-xl py-2 z-50"
              style={{ background: '#fff', border: '1px solid #d1dcea' }}
            >
              <div className="px-4 py-2 text-sm font-semibold border-b" style={{ color: '#1a2a4a', borderColor: '#d1dcea' }}>
                {username}
              </div>
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm transition-colors hover:bg-blue-50"
                style={{ color: '#6b7a99' }}
              >
                <LogOut size={14} />
                ออกจากระบบ
              </button>
            </div>
          )}
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-20 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar — fixed on mobile, static on desktop */}
        <div
          className={`
            fixed top-0 left-0 h-full w-64 z-20 pt-14 transition-transform duration-300
            md:static md:translate-x-0 md:pt-0 md:h-auto md:z-auto
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          <Sidebar
            expandedMenus={expandedMenus}
            setExpandedMenus={setExpandedMenus}
            activeNav={activeNav}
            setActiveNav={setActiveNav}
            setSidebarOpen={setSidebarOpen}
            onLogout={onLogout}
          />
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          {activeNav === 'health-checkup' ? (
            <div className="max-w-6xl mx-auto">
              <HealthCheckupManager />
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-6 max-w-6xl mx-auto">
              {/* Slider */}
            <div className="flex-1 min-w-0">
              <div className="relative rounded-2xl overflow-hidden shadow-md aspect-video bg-gray-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={hospitalImages[slideIndex]}
                  alt="โรงพยาบาลปากช่องนานา"
                  className="w-full h-full object-cover transition-all duration-500"
                />
                <button
                  onClick={prevSlide}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white transition-colors flex items-center justify-center shadow text-gray-700"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white transition-colors flex items-center justify-center shadow text-gray-700"
                >
                  <ChevronRight size={18} />
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {hospitalImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setSlideIndex(i)}
                      className="w-2 h-2 rounded-full transition-all"
                      style={{ background: i === slideIndex ? '#1a56db' : 'rgba(255,255,255,0.7)' }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Recent updates panel */}
            <div
              className="w-full lg:w-72 flex-shrink-0 rounded-2xl p-5 shadow-md"
              style={{ background: '#fff', border: '1px solid #d1dcea' }}
            >
              <h2 className="font-semibold text-sm mb-4" style={{ color: '#1a2a4a' }}>
                ข้อมูลที่อัพเดทล่าสุด
              </h2>
              <div className="flex flex-col gap-4">
                {recentUpdates.map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="flex flex-col items-center pt-0.5 gap-1">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#22c55e' }} />
                      {i < recentUpdates.length - 1 && (
                        <div className="w-px flex-1 min-h-4" style={{ background: '#d1dcea' }} />
                      )}
                    </div>
                    <div className="pb-2">
                      <p className="text-xs mb-0.5" style={{ color: '#6b7a99' }}>{item.date}</p>
                      <p className="text-xs font-semibold" style={{ color: '#1a56db' }}>{item.actor}</p>
                      <p className="text-xs mt-0.5 leading-relaxed" style={{ color: '#4a5a7a' }}>{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          )}
        </main>
      </div>

    </div>
  )
}
