import {
  LayoutDashboard, BookOpen, Swords, FolderOpen, Calendar,
  ClipboardCheck, Megaphone, FileText, Library, LogOut,
  GraduationCap, Menu, X, ChevronRight,
} from 'lucide-react';
import type { NavigationPage } from '../../types';
import { useStudent } from '../../context/StudentContext';

const navItems: { id: NavigationPage; label: string; icon: typeof LayoutDashboard; emoji: string }[] = [
  { id: 'dashboard',     label: 'Dashboard',     icon: LayoutDashboard, emoji: '🏠' },
  { id: 'courses',       label: 'Courses',        icon: BookOpen,        emoji: '📘' },
  { id: 'quests',        label: 'Quests',         icon: Swords,          emoji: '⚔️' },
  { id: 'materials',     label: 'Materials',      icon: FolderOpen,      emoji: '📂' },
  { id: 'schedule',      label: 'Schedule',       icon: Calendar,        emoji: '📅' },
  { id: 'attendance',    label: 'Attendance',     icon: ClipboardCheck,  emoji: '✅' },
  { id: 'announcements', label: 'Announcements',  icon: Megaphone,       emoji: '📢' },
  { id: 'requests',      label: 'Requests',       icon: FileText,        emoji: '📝' },
  { id: 'library',       label: 'Library',        icon: Library,         emoji: '📚' },
];

interface SidebarProps {
  currentPage: NavigationPage;
  onNavigate: (page: NavigationPage) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export default function Sidebar({
  currentPage, onNavigate, collapsed, onToggleCollapse, mobileOpen, onCloseMobile,
}: SidebarProps) {
  const { currentStudent, logout } = useStudent();

  const handleNav = (page: NavigationPage) => { onNavigate(page); onCloseMobile(); };

  const initials = currentStudent?.Name
    ? currentStudent.Name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()
    : 'ST';

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
          onClick={onCloseMobile}
        />
      )}

      {/* Mobile toggle */}
      <button
        onClick={() => mobileOpen ? onCloseMobile() : onToggleCollapse()}
        className="fixed top-4 left-4 z-50 lg:hidden w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
        style={{ background: '#1a5f4c', color: '#fff' }}
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <aside
        style={{
          background: 'linear-gradient(180deg, #0c1f19 0%, #112b22 50%, #0c1f19 100%)',
          width: collapsed ? 76 : 272,
          transition: 'width 0.3s cubic-bezier(0.4,0,0.2,1)',
        }}
        className={`fixed top-0 left-0 h-full z-50 flex flex-col
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        {/* Logo area */}
        <div
          className={`flex items-center h-[70px] flex-shrink-0 border-b transition-all duration-300 ${collapsed ? 'justify-center px-4' : 'px-5'}`}
          style={{ borderColor: 'rgba(255,255,255,0.08)' }}
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 shimmer-hover"
            style={{
              background: 'linear-gradient(135deg, #d4af37 0%, #f0cc55 100%)',
              boxShadow: '0 4px 16px rgba(212,175,55,0.4)',
            }}
          >
            <GraduationCap className="w-5 h-5" style={{ color: '#0c1f19' }} />
          </div>
          {!collapsed && (
            <div className="ml-3 min-w-0">
              <h1 className="text-[15px] font-bold text-white leading-tight tracking-tight">AUY Portal</h1>
              <p className="text-[10px] font-medium" style={{ color: 'rgba(255,255,255,0.4)' }}>
                Student Dashboard
              </p>
            </div>
          )}
          {!collapsed && (
            <button
              onClick={onToggleCollapse}
              className="ml-auto p-1.5 rounded-lg hidden lg:flex items-center justify-center transition-all"
              style={{ color: 'rgba(255,255,255,0.35)', background: 'transparent' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
            </button>
          )}
          {collapsed && (
            <button
              onClick={onToggleCollapse}
              className="hidden lg:flex"
              style={{ display: 'none' }}
            />
          )}
        </div>

        {/* Collapse toggle (collapsed state) */}
        {collapsed && (
          <button
            onClick={onToggleCollapse}
            className="hidden lg:flex mx-auto mt-2 w-8 h-8 items-center justify-center rounded-lg"
            style={{ color: 'rgba(255,255,255,0.35)' }}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}

        {/* Section label */}
        {!collapsed && (
          <div className="px-5 pt-5 pb-1">
            <p className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.28)' }}>
              Navigation
            </p>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-2 px-3 space-y-0.5">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                title={collapsed ? item.label : undefined}
                style={isActive ? {
                  background: 'linear-gradient(135deg, rgba(212,175,55,0.18) 0%, rgba(212,175,55,0.08) 100%)',
                  border: '1px solid rgba(212,175,55,0.25)',
                  color: '#d4af37',
                  borderRadius: 14,
                } : {
                  color: 'rgba(255,255,255,0.5)',
                  borderRadius: 14,
                  border: '1px solid transparent',
                  background: 'transparent',
                }}
                className={`w-full flex items-center transition-all duration-200 group relative
                  ${collapsed ? 'justify-center p-2.5' : 'gap-3 px-3 py-2.5'}
                `}
                onMouseEnter={e => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.border = '1px solid rgba(255,255,255,0.08)';
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
                    e.currentTarget.style.border = '1px solid transparent';
                  }
                }}
              >
                <Icon
                  className="w-[18px] h-[18px] flex-shrink-0"
                  style={{ color: isActive ? '#d4af37' : 'inherit' }}
                />
                {!collapsed && (
                  <span className="text-[13.5px] font-medium">{item.label}</span>
                )}
                {!collapsed && item.id === 'library' && (
                  <span
                    className="ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded-md"
                    style={{ background: 'rgba(212,175,55,0.2)', color: '#d4af37' }}
                  >
                    NEW
                  </span>
                )}
                {/* Tooltip */}
                {collapsed && (
                  <div
                    className="absolute left-full ml-3 px-2.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap
                      opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50"
                    style={{ background: '#1e3a2f', color: '#fff', boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}
                  >
                    {item.label}
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Divider */}
        <div className="mx-4 my-2" style={{ height: 1, background: 'rgba(255,255,255,0.07)' }} />

        {/* User section */}
        <div className={`px-3 pb-5 ${collapsed ? 'flex flex-col items-center gap-2' : ''}`}>
          {!collapsed ? (
            <div
              className="flex items-center gap-3 p-3 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0"
                style={{
                  background: 'linear-gradient(135deg, #1a5f4c 0%, #22796080 100%)',
                  color: '#d4af37',
                  border: '1.5px solid rgba(212,175,55,0.3)',
                }}
              >
                {initials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[12px] font-semibold text-white truncate">
                  {currentStudent?.Name || 'Student'}
                </p>
                <p className="text-[10px] truncate" style={{ color: 'rgba(255,255,255,0.38)' }}>
                  {currentStudent?.Email || ''}
                </p>
              </div>
              <button
                onClick={logout}
                className="p-1.5 rounded-lg transition-all flex-shrink-0"
                style={{ color: 'rgba(255,255,255,0.35)' }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(239,68,68,0.15)';
                  e.currentTarget.style.color = '#ef4444';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.35)';
                }}
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold"
                style={{
                  background: 'linear-gradient(135deg, #1a5f4c 0%, #22796080 100%)',
                  color: '#d4af37',
                }}
              >
                {initials}
              </div>
              <button
                onClick={logout}
                className="p-2 rounded-lg transition-all"
                style={{ color: 'rgba(255,255,255,0.35)' }}
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </aside>
    </>
  );
}
