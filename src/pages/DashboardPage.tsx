export function DashboardPage() {
  const { profile } = useAuth();

  // 🔥 IMPORTANT: show loading instead of blank
  if (!profile) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-slate-400">
        Loading dashboard...
      </div>
    );
  }

  switch (profile.role) {
    case 'student':
      return <StudentDashboard profile={profile} />;
    case 'teacher':
      return <TeacherDashboard profile={profile} />;
    case 'admin':
      return <AdminDashboard profile={profile} />;
    default:
      return <div className="p-6">No role assigned.</div>;
  }
}