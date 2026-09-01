'use client'

import { useState, useRef, useEffect, type Dispatch, type SetStateAction } from 'react'
import {
  LayoutDashboard,
  Hospital,
  HeartPulse,
  Stethoscope,
  ClipboardList,
  PhoneCall,
  LogOut,
  Megaphone,
  ImageIcon,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  type LucideIcon,
} from 'lucide-react'
import HealthCheckupManager from '@/components/admin/HealthCheckupManager'
import DoctorManager from '@/components/admin/DoctorManager'
import NewsManager from '@/components/admin/NewsManager'
import ProcurementManager from '@/components/admin/ProcurementManager'
import CentersManager from '@/components/admin/CentersManager'
import AboutManager from '@/components/admin/AboutManager'
import BannerManager from '@/components/admin/BannerManager'
import DepartmentManager from '@/components/admin/DepartmentManager'
import PatientRegistrationManager from '@/components/admin/PatientRegistrationManager'
import AfterHoursManager from '@/components/admin/AfterHoursManager'

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
      { id: 'banner', icon: ImageIcon, label: 'แบนเนอร์หน้าแรก' },
      { id: 'hospital', icon: Hospital, label: 'เกี่ยวกับ', hasChildren: true },
      { id: 'patient', icon: HeartPulse, label: 'ศูนย์บริการผู้ป่วย', hasChildren: true },
      { id: 'doctor', icon: Stethoscope, label: 'ค้นหาแพทย์' },
      { id: 'announcements', icon: Megaphone, label: 'ข่าวสารและประกาศ' },
      { id: 'services', icon: ClipboardList, label: 'งานบริการ', hasChildren: true },
    ],
  },
  {
    label: 'PAGES',
    items: [
      { id: 'contact', icon: PhoneCall, label: 'ติดต่อเจ้าหน้าที่ IT' },
      { id: 'logout-nav', icon: LogOut, label: 'ออกจากระบบ', isLogout: true },
    ],
  },
]

interface RecentItem {
  date: string;
  actor: string;
  detail: string;
}


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
            const patientNavIds = ['centers-specialized', 'hc-checkup', 'hc-vaccines', 'dept-emergency', 'dept-internal', 'dept-surgery', 'patient-reg']
            const servicesNavIds = ['news', 'procurement', 'centers-special', 'after-hours']
            const isActive =
              activeNav === item.id ||
              (item.id === 'hospital' && ['executives', 'org-chart'].includes(activeNav)) ||
              (item.id === 'patient' && patientNavIds.includes(activeNav)) ||
              (item.id === 'services' && servicesNavIds.includes(activeNav))

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
                    <Icon size={22} strokeWidth={1.8} className="shrink-0" />
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
                        {([
                          { label: 'ผู้บริหารโรงพยาบาล', nav: 'executives' },
                          { label: 'โครงสร้างองค์กร', nav: 'org-chart' },
                        ] as { label: string; nav: string }[]).map(({ label, nav }) => {
                          const childActive = nav !== '' && activeNav === nav;
                          return (
                            <button key={label}
                              onClick={() => { if (nav) { setActiveNav(nav); setSidebarOpen(false); } }}
                              className="text-left text-sm py-1.5 px-2 rounded-md transition-colors duration-150 flex items-center gap-2"
                              style={{ color: childActive ? '#1a56db' : '#6b7a99', fontWeight: childActive ? 600 : 400 }}
                              onMouseEnter={(e) => { if (!childActive) { e.currentTarget.style.background = '#f0f4fd'; e.currentTarget.style.color = '#1a56db' } }}
                              onMouseLeave={(e) => { if (!childActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#6b7a99' } }}
                            >
                              <span className="w-1.5 h-1.5 rounded-full border border-current inline-block shrink-0" />
                              {label}
                            </button>
                          );
                        })}
                      </>
                    )}
                    {item.id === 'patient' && (
                      <>
                        {([
                          { label: 'ศูนย์รักษาเฉพาะทาง', nav: 'centers-specialized' },
                          { label: 'โปรแกรมตรวจสุขภาพ', nav: 'hc-checkup' },
                          { label: 'โปรแกรมฉีดวัคซีน', nav: 'hc-vaccines' },
                          { label: 'ศูนย์อุบัติเหตุ-ฉุกเฉิน', nav: 'dept-emergency' },
                          { label: 'ศูนย์อายุรกรรม', nav: 'dept-internal' },
                          { label: 'ศูนย์ศัลยกรรม', nav: 'dept-surgery' },
                          { label: 'ลงทะเบียนผู้ป่วยใหม่', nav: 'patient-reg' },
                        ] as { label: string; nav: string }[]).map(({ label, nav }) => {
                          const childActive = nav !== '' && activeNav === nav
                          const isPlaceholder = nav === ''
                          return (
                            <button key={label}
                              onClick={() => { if (nav) { setActiveNav(nav); setSidebarOpen(false); } }}
                              className="text-left text-sm py-1.5 px-2 rounded-md transition-colors duration-150 flex items-center gap-2"
                              style={{ color: childActive ? '#1a56db' : isPlaceholder ? '#b0b8cc' : '#6b7a99', fontWeight: childActive ? 600 : 400, cursor: isPlaceholder ? 'default' : 'pointer' }}
                              onMouseEnter={(e) => { if (!childActive && !isPlaceholder) { e.currentTarget.style.background = '#f0f4fd'; e.currentTarget.style.color = '#1a56db' } }}
                              onMouseLeave={(e) => { if (!childActive && !isPlaceholder) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#6b7a99' } }}
                            >
                              <span className="w-1.5 h-1.5 rounded-full border border-current inline-block shrink-0" />
                              {label}
                              {isPlaceholder && <span className="text-xs ml-auto opacity-50">เร็วๆนี้</span>}
                            </button>
                          )
                        })}
                      </>
                    )}
                    {item.id === 'services' && (
                      <>
                        {([
                          { label: 'ข่าวสารและกิจกรรมภายใน', nav: 'news' },
                          { label: 'งานจัดซื้อจัดจ้าง / สมัครงาน', nav: 'procurement' },
                          { label: 'คลินิกพิเศษนอกเวลา', nav: 'after-hours' },
                          { label: 'ศูนย์รักษาพิเศษ', nav: 'centers-special' },
                        ] as { label: string; nav: string }[]).map(({ label, nav }) => {
                          const childActive = nav !== '' && activeNav === nav
                          const isPlaceholder = nav === ''
                          return (
                            <button key={label}
                              onClick={() => { if (nav) { setActiveNav(nav); setSidebarOpen(false); } }}
                              className="text-left text-sm py-1.5 px-2 rounded-md transition-colors duration-150 flex items-center gap-2"
                              style={{ color: childActive ? '#1a56db' : isPlaceholder ? '#b0b8cc' : '#6b7a99', fontWeight: childActive ? 600 : 400, cursor: isPlaceholder ? 'default' : 'pointer' }}
                              onMouseEnter={(e) => { if (!childActive && !isPlaceholder) { e.currentTarget.style.background = '#f0f4fd'; e.currentTarget.style.color = '#1a56db' } }}
                              onMouseLeave={(e) => { if (!childActive && !isPlaceholder) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#6b7a99' } }}
                            >
                              <span className="w-1.5 h-1.5 rounded-full border border-current inline-block shrink-0" />
                              {label}
                              {isPlaceholder && <span className="text-xs ml-auto opacity-50">เร็วๆนี้</span>}
                            </button>
                          )
                        })}
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
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({})
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [recentUpdates, setRecentUpdates] = useState<RecentItem[]>([])
  const [loadingActivity, setLoadingActivity] = useState(true)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    fetch('/api/admin/activity')
      .then(r => r.json())
      .then(json => { if (json.ok) setRecentUpdates(json.data) })
      .catch(() => {})
      .finally(() => setLoadingActivity(false))
  }, [])

  const openSidebar = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setSidebarOpen(true)
  }
  const closeSidebar = () => {
    closeTimer.current = setTimeout(() => setSidebarOpen(false), 150)
  }

  return (
    <div className="flex flex-col min-h-screen" style={{ background: '#eef3f9' }}>
      {/* Top navbar */}
      <header
        className="flex items-center justify-between px-4 md:px-6 py-1 shadow-sm z-30 relative"
        style={{ background: '#ffffff', borderBottom: '1px solid #d1dcea' }}
      >
        <div className="flex items-center gap-3">
          {/* Hamburger - mobile only */}
          <button
            className="md:hidden p-1.5 rounded-lg hover:bg-blue-50 transition-colors"
            onMouseEnter={openSidebar}
            onMouseLeave={closeSidebar}
            style={{ color: '#1a56db' }}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <img
            src="/img/logopnnh.png"
            alt="PNNH Logo"
            className="w-24 h-24 object-contain shrink-0"
          />
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
            fixed top-0 left-0 h-full w-64 z-20 pt-28 transition-transform duration-300
            md:static md:translate-x-0 md:pt-0 md:h-auto md:z-auto
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
          onMouseEnter={openSidebar}
          onMouseLeave={closeSidebar}
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
          {activeNav === 'banner' ? (
            <div className="max-w-6xl mx-auto">
              <BannerManager />
            </div>
          ) : activeNav === 'executives' ? (
            <div className="max-w-6xl mx-auto">
              <AboutManager initialTab="executives" />
            </div>
          ) : activeNav === 'org-chart' ? (
            <div className="max-w-6xl mx-auto">
              <AboutManager initialTab="org-chart" />
            </div>
          ) : activeNav === 'announcements' ? (
            <div className="max-w-6xl mx-auto">
              <HealthCheckupManager initialTab="announcements" />
            </div>
          ) : activeNav === 'hc-checkup' ? (
            <div className="max-w-6xl mx-auto">
              <HealthCheckupManager initialTab="checkup" />
            </div>
          ) : activeNav === 'hc-vaccines' ? (
            <div className="max-w-6xl mx-auto">
              <HealthCheckupManager initialTab="vaccines" />
            </div>
          ) : activeNav === 'doctor' ? (
            <div className="max-w-6xl mx-auto">
              <DoctorManager />
            </div>
          ) : activeNav === 'news' ? (
            <div className="max-w-6xl mx-auto">
              <NewsManager />
            </div>
          ) : activeNav === 'procurement' ? (
            <div className="max-w-6xl mx-auto">
              <ProcurementManager />
            </div>
          ) : activeNav === 'centers-specialized' ? (
            <div className="max-w-6xl mx-auto">
              <CentersManager initialTab="specialized" />
            </div>
          ) : activeNav === 'centers-special' ? (
            <div className="max-w-6xl mx-auto">
              <CentersManager initialTab="special" />
            </div>
          ) : activeNav === 'dept-emergency' ? (
            <div className="max-w-6xl mx-auto">
              <DepartmentManager initialDept="emergency" />
            </div>
          ) : activeNav === 'dept-internal' ? (
            <div className="max-w-6xl mx-auto">
              <DepartmentManager initialDept="internal" />
            </div>
          ) : activeNav === 'dept-surgery' ? (
            <div className="max-w-6xl mx-auto">
              <DepartmentManager initialDept="surgery" />
            </div>
          ) : activeNav === 'patient-reg' ? (
            <div className="max-w-6xl mx-auto">
              <PatientRegistrationManager />
            </div>
          ) : activeNav === 'after-hours' ? (
            <div className="max-w-6xl mx-auto">
              <AfterHoursManager />
            </div>
          ) : (
            <div className="max-w-6xl mx-auto">
              <div
                className="rounded-2xl p-6 shadow-md"
                style={{ background: '#fff', border: '1px solid #d1dcea' }}
              >
                <h2 className="font-semibold text-lg mb-6" style={{ color: '#1a2a4a' }}>
                  ข้อมูลที่อัพเดทล่าสุด
                </h2>
                {loadingActivity ? (
                  <p className="text-sm text-center py-8" style={{ color: '#6b7a99' }}>กำลังโหลด...</p>
                ) : recentUpdates.length === 0 ? (
                  <p className="text-sm text-center py-8" style={{ color: '#6b7a99' }}>ยังไม่มีข้อมูล</p>
                ) : (
                  <div className="flex flex-col gap-5">
                    {recentUpdates.map((item, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="flex flex-col items-center pt-1 gap-1">
                          <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: '#22c55e' }} />
                          {i < recentUpdates.length - 1 && (
                            <div className="w-px flex-1 min-h-5" style={{ background: '#d1dcea' }} />
                          )}
                        </div>
                        <div className="pb-3">
                          <p className="text-xs mb-0.5" style={{ color: '#6b7a99' }}>{item.date}</p>
                          <p className="text-sm font-semibold" style={{ color: '#1a56db' }}>{item.actor}</p>
                          <p className="text-sm mt-0.5 leading-relaxed" style={{ color: '#4a5a7a' }}>{item.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>

    </div>
  )
}
