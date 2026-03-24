import { useState } from 'react';
import { StudentProvider, useStudent } from './context/StudentContext';
import Sidebar from './components/Layout/Sidebar';
import Login from './components/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Courses from './components/Courses/Courses';
import Quests from './components/Quests/Quests';
import Materials from './components/Materials/Materials';
import Schedule from './components/Schedule/Schedule';
import Attendance from './components/Attendance/Attendance';
import Announcements from './components/Announcements/Announcements';
import Requests from './components/Requests/Requests';
import Library from './components/Library/Library';
import type { NavigationPage } from './types';

function PortalContent() {
  const { currentStudent } = useStudent();
  const [currentPage, setCurrentPage] = useState<NavigationPage>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!currentStudent) {
    return <Login />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'courses':
        return <Courses />;
      case 'quests':
        return <Quests />;
      case 'materials':
        return <Materials />;
      case 'schedule':
        return <Schedule />;
      case 'attendance':
        return <Attendance />;
      case 'announcements':
        return <Announcements />;
      case 'requests':
        return <Requests />;
      case 'library':
        return <Library />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen" style={{ background:'#f4f6f9' }}>
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(p => !p)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      {/* Mobile menu button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-30 lg:hidden w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
        style={{ background:'#1a5f4c', color:'#fff' }}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <rect y="2" width="18" height="2" rx="1" fill="currentColor"/>
          <rect y="8" width="18" height="2" rx="1" fill="currentColor"/>
          <rect y="14" width="18" height="2" rx="1" fill="currentColor"/>
        </svg>
      </button>

      <main
        style={{
          marginLeft: sidebarCollapsed ? 76 : 272,
          transition: 'margin-left 0.3s cubic-bezier(0.4,0,0.2,1)',
          minHeight: '100vh',
        }}
        className="lg:block"
      >
        <div className="p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8 max-w-[1400px] mx-auto">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <StudentProvider>
      <PortalContent />
    </StudentProvider>
  );
}
