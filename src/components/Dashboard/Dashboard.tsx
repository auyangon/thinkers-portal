import {
  BookOpen, TrendingUp, Clock, Award, CalendarDays,
  CheckCircle2, AlertCircle, Zap, ArrowUpRight, Flame,
} from 'lucide-react';
import { useStudent } from '../../context/StudentContext';
import isLoadingSpinner from '../UI/isLoadingSpinner';

const CARD_THEMES = [
  {
    bg: 'linear-gradient(135deg, #1a5f4c 0%, #1e7a5f 100%)',
    iconBg: 'rgba(255,255,255,0.15)',
    accent: '#d4af37',
    text: '#fff',
    shadow: '0 16px 40px rgba(26,95,76,0.35)',
  },
  {
    bg: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    iconBg: 'rgba(255,255,255,0.15)',
    accent: '#c4b5fd',
    text: '#fff',
    shadow: '0 16px 40px rgba(99,102,241,0.35)',
  },
  {
    bg: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
    iconBg: 'rgba(255,255,255,0.15)',
    accent: '#fff',
    text: '#fff',
    shadow: '0 16px 40px rgba(245,158,11,0.35)',
  },
  {
    bg: 'linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)',
    iconBg: 'rgba(255,255,255,0.15)',
    accent: '#bae6fd',
    text: '#fff',
    shadow: '0 16px 40px rgba(14,165,233,0.35)',
  },
];

const PRIORITY_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  high:   { bg: '#fef2f2', color: '#dc2626', label: 'ðŸ”´ Urgent' },
  medium: { bg: '#fffbeb', color: '#d97706', label: 'ðŸŸ¡ Notice' },
  low:    { bg: '#f0fdf4', color: '#16a34a', label: 'ðŸŸ¢ Info'   },
};

export default function Dashboard() {
  const { currentStudent, students, courses, enrollments, attendance, quests, studentQuests, announcements, schedule, isLoading } = useStudent();

  if (isLoading) return <isLoadingSpinner message="isLoading dashboardâ€¦" />;

  const studentEnrollments = enrollments.filter(e => e.StudentID === currentStudent?.StudentID);
  const enrolledCourseIds  = studentEnrollments.map(e => e.CourseID);
  const enrolledCourses    = courses.filter(c => enrolledCourseIds.includes(c.CourseID));

  const studentAtt  = attendance.filter(a => a.StudentID === currentStudent?.StudentID);
  const presentCnt  = studentAtt.filter(a => a.Status?.toLowerCase() === 'present').length;
  const attRate     = studentAtt.length > 0 ? Math.round((presentCnt / studentAtt.length) * 100) : 100;

  const myQuests    = studentQuests.filter(sq => sq.StudentID === currentStudent?.StudentID);
  const doneSQs    = myQuests.filter(sq => ['completed','graded'].includes(sq.Status?.toLowerCase()));
  const totalPts   = doneSQs.reduce((s, sq) => s + (parseInt(sq.Score) || 0), 0);

  const recentAnn  = [...announcements]
    .sort((a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime())
    .slice(0, 4);

  const today       = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const todaySched  = schedule.filter(
    s => s.Day?.toLowerCase() === today.toLowerCase() && enrolledCourseIds.includes(s.CourseID)
  );

  const statCards = [
    { label: 'Courses',      value: enrolledCourses.length,      icon: BookOpen,   suffix: '', theme: CARD_THEMES[0] },
    { label: 'GPA',          value: currentStudent?.GPA || 'â€”',  icon: TrendingUp, suffix: '', theme: CARD_THEMES[1] },
    { label: 'Attendance',   value: attRate,                      icon: Clock,      suffix: '%', theme: CARD_THEMES[2] },
    { label: 'Quest Points', value: totalPts,                     icon: Award,      suffix: 'pts', theme: CARD_THEMES[3] },
  ];

  const firstName = currentStudent?.Name?.split(' ')[0] || 'Student';

  const dayColors = ['#6366f1','#10b981','#f59e0b','#ef4444','#8b5cf6','#0ea5e9','#ec4899'];
  const dayColorIndex = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday']
    .indexOf(today.toLowerCase());
  const dayColor = dayColors[dayColorIndex >= 0 ? dayColorIndex : 0];

  return (
    <div className="space-y-7 animate-fade-up pb-4">      {/* ===== DEBUG PANEL (shows raw data) ===== */}
      <div style="background:#f0f0f0; border:3px solid red; padding:1rem; margin-bottom:1rem; border-radius:12px;">
        <h3 style="color:black;">🐛 DEBUG – Raw Data</h3>
        <p style="color:black;"><strong>Student email:</strong> {currentStudent?.email}</p>
        <p style="color:black;"><strong>Students total:</strong> {students?.length}</p>
        <p style="color:black;"><strong>Courses total:</strong> {courses?.length}</p>
        <p style="color:black;"><strong>Enrollments total:</strong> {enrollments?.length}</p>
        <details>
          <summary style="color:black;">Show first 3 enrollments</summary>
          <pre style="color:black;">{JSON.stringify(enrollments?.slice(0,3), null, 2)}</pre>
        </details>
        <details>
          <summary style="color:black;">Show first 2 courses</summary>
          <pre style="color:black;">{JSON.stringify(courses?.slice(0,2), null, 2)}</pre>
        </details>
      </div>

      {/* â”€â”€ HERO WELCOME â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div
        className="rounded-3xl overflow-hidden relative shimmer-hover"
        style={{
          background: 'linear-gradient(135deg, #0f2a22 0%, #1a5f4c 60%, #1e7a5f 100%)',
          minHeight: 160,
        }}
      >
        {/* Decorative circles */}
        <div style={{
          position:'absolute', top:-40, right:-40,
          width:220, height:220, borderRadius:'50%',
          background:'radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%)',
        }} />
        <div style={{
          position:'absolute', bottom:-30, left:'30%',
          width:160, height:160, borderRadius:'50%',
          background:'radial-gradient(circle, rgba(30,122,95,0.5) 0%, transparent 70%)',
        }} />
        {/* Grid */}
        <div style={{
          position:'absolute', inset:0, opacity:0.08,
          backgroundImage:`linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
          backgroundSize:'40px 40px',
        }} />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-8">
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4"
              style={{ background:'rgba(212,175,55,0.18)', border:'1px solid rgba(212,175,55,0.3)' }}
            >
              <Flame className="w-3 h-3" style={{ color:'#d4af37' }} />
              <span style={{ color:'#d4af37', fontSize:10, fontWeight:700, letterSpacing:'0.07em' }}>
                STUDENT DASHBOARD
              </span>
            </div>
            <h1 className="font-extrabold text-white" style={{ fontSize:'clamp(1.6rem,3vw,2.4rem)', lineHeight:1.15 }}>
              Hey, {firstName} ðŸ‘‹
            </h1>
            <p style={{ color:'rgba(255,255,255,0.6)', marginTop:8, fontSize:'0.9rem' }}>
              {new Date().toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric', year:'numeric' })}
            </p>
          </div>
          <div className="flex gap-4 flex-wrap">
            <div
              className="px-5 py-3.5 rounded-2xl text-center"
              style={{ background:'rgba(255,255,255,0.1)', backdropFilter:'blur(8px)', border:'1px solid rgba(255,255,255,0.15)', minWidth:90 }}
            >
              <p className="font-bold text-white text-xl">{enrolledCourses.length}</p>
              <p style={{ color:'rgba(255,255,255,0.55)', fontSize:11, marginTop:2 }}>Courses</p>
            </div>
            <div
              className="px-5 py-3.5 rounded-2xl text-center"
              style={{ background:'rgba(212,175,55,0.18)', backdropFilter:'blur(8px)', border:'1px solid rgba(212,175,55,0.3)', minWidth:90 }}
            >
              <p className="font-bold text-white text-xl" style={{ color:'#d4af37' }}>{currentStudent?.GPA || 'â€”'}</p>
              <p style={{ color:'rgba(255,255,255,0.55)', fontSize:11, marginTop:2 }}>GPA</p>
            </div>
            <div
              className="px-5 py-3.5 rounded-2xl text-center"
              style={{ background:'rgba(255,255,255,0.1)', backdropFilter:'blur(8px)', border:'1px solid rgba(255,255,255,0.15)', minWidth:90 }}
            >
              <p className="font-bold text-white text-xl">{attRate}%</p>
              <p style={{ color:'rgba(255,255,255,0.55)', fontSize:11, marginTop:2 }}>Attendance</p>
            </div>
          </div>
        </div>
      </div>

      {/* â”€â”€ STAT CARDS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s, i) => (
          <div
            key={s.label}
            className="stat-card animate-fade-up"
            style={{ background: s.theme.bg, boxShadow: s.theme.shadow, animationDelay: `${i * 0.07}s` }}
          >
            <div className="flex items-start justify-between mb-5">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: s.theme.iconBg }}
              >
                <s.icon className="w-5 h-5" style={{ color: s.theme.accent }} />
              </div>
              <ArrowUpRight className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.4)' }} />
            </div>
            <p className="font-bold text-white" style={{ fontSize: '1.75rem', lineHeight: 1 }}>
              {s.value}{s.suffix && <span style={{ fontSize:'1rem', marginLeft:3, opacity:0.7 }}>{s.suffix}</span>}
            </p>
            <p style={{ color:'rgba(255,255,255,0.6)', fontSize:12, marginTop:5, fontWeight:500 }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* â”€â”€ MAIN GRID â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Today's Schedule */}
        <div className="bento-card p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background:'#f0fdf4' }}>
                <CalendarDays className="w-5 h-5" style={{ color:'#1a5f4c' }} />
              </div>
              <div>
                <h2 className="font-bold text-[15px]" style={{ color:'#0f1923' }}>Today's Schedule</h2>
                <p className="text-xs" style={{ color:'#8896a8' }}>{today}</p>
              </div>
            </div>
            <span
              className="px-3 py-1 rounded-full text-xs font-semibold"
              style={{ background: dayColor + '18', color: dayColor }}
            >
              {todaySched.length} {todaySched.length === 1 ? 'class' : 'classes'}
            </span>
          </div>

          {todaySched.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <div className="text-5xl">ðŸ˜´</div>
              <p className="text-sm font-medium" style={{ color:'#8896a8' }}>No classes today â€” enjoy your break!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {todaySched.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 rounded-2xl transition-all group"
                  style={{ background:'#f8f9fc', border:'1.5px solid transparent' }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = '#fff';
                    (e.currentTarget as HTMLElement).style.border = '1.5px solid #e2e5eb';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.06)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = '#f8f9fc';
                    (e.currentTarget as HTMLElement).style.border = '1.5px solid transparent';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-xl flex flex-col items-center justify-center flex-shrink-0"
                    style={{ background: dayColor + '18' }}
                  >
                    <span className="text-xs font-bold" style={{ color: dayColor }}>{item.StartTime}</span>
                    <span className="text-[9px] font-medium" style={{ color: dayColor + 'aa' }}>{item.EndTime}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate" style={{ color:'#0f1923' }}>{item.CourseName}</p>
                    <p className="text-xs mt-0.5" style={{ color:'#8896a8' }}>
                      {item.Instructor} Â· Room {item.Room}
                    </p>
                  </div>
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: dayColor, boxShadow: `0 0 0 3px ${dayColor}30` }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Announcements */}
        <div className="bento-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background:'#fefce8' }}>
              <AlertCircle className="w-5 h-5" style={{ color:'#d97706' }} />
            </div>
            <div>
              <h2 className="font-bold text-[15px]" style={{ color:'#0f1923' }}>Announcements</h2>
              <p className="text-xs" style={{ color:'#8896a8' }}>{recentAnn.length} recent</p>
            </div>
          </div>
          {recentAnn.length === 0 ? (
            <p className="text-sm text-center py-10" style={{ color:'#8896a8' }}>No announcements</p>
          ) : (
            <div className="space-y-3">
              {recentAnn.map((a, i) => {
                const pri  = (a.Priority?.toLowerCase() || 'low') as keyof typeof PRIORITY_STYLES;
                const style = PRIORITY_STYLES[pri] || PRIORITY_STYLES.low;
                return (
                  <div
                    key={i}
                    className="p-3.5 rounded-2xl transition-all"
                    style={{ background: style.bg, border:`1px solid ${style.color}22` }}
                  >      {/* ===== DEBUG PANEL (shows raw data) ===== */}
      <div style="background:#f0f0f0; border:3px solid red; padding:1rem; margin-bottom:1rem; border-radius:12px;">
        <h3 style="color:black;">🐛 DEBUG – Raw Data</h3>
        <p style="color:black;"><strong>Student email:</strong> {currentStudent?.email}</p>
        <p style="color:black;"><strong>Students total:</strong> {students?.length}</p>
        <p style="color:black;"><strong>Courses total:</strong> {courses?.length}</p>
        <p style="color:black;"><strong>Enrollments total:</strong> {enrollments?.length}</p>
        <details>
          <summary style="color:black;">Show first 3 enrollments</summary>
          <pre style="color:black;">{JSON.stringify(enrollments?.slice(0,3), null, 2)}</pre>
        </details>
        <details>
          <summary style="color:black;">Show first 2 courses</summary>
          <pre style="color:black;">{JSON.stringify(courses?.slice(0,2), null, 2)}</pre>
        </details>
      </div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold" style={{ color: style.color }}>{style.label}</span>
                    </div>
                    <p className="text-sm font-semibold line-clamp-1" style={{ color:'#0f1923' }}>{a.Title}</p>
                    <p className="text-xs line-clamp-2 mt-1" style={{ color:'#5a6475' }}>{a.Content}</p>
                    <p className="text-[10px] mt-2" style={{ color:'#8896a8' }}>{a.Date}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* â”€â”€ ACTIVE QUESTS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="bento-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background:'#fdf2ff' }}>
              <Zap className="w-5 h-5" style={{ color:'#9333ea' }} />
            </div>
            <div>
              <h2 className="font-bold text-[15px]" style={{ color:'#0f1923' }}>Active Quests</h2>
              <p className="text-xs" style={{ color:'#8896a8' }}>
                {doneSQs.length} / {myQuests.length} completed Â· {totalPts} pts earned
              </p>
            </div>
          </div>
          <div
            className="px-3 py-1.5 rounded-xl text-xs font-semibold"
            style={{ background:'linear-gradient(135deg, #9333ea20, #6366f120)', color:'#9333ea' }}
          >
            {totalPts} pts total
          </div>
        </div>

        {myQuests.length === 0 ? (
          <div className="flex flex-col items-center py-10 gap-2">
            <span className="text-4xl">ðŸŽ¯</span>
            <p className="text-sm" style={{ color:'#8896a8' }}>No active quests assigned yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {quests
              .filter(q => myQuests.some(mq => mq.QuestID === q.QuestID))
              .slice(0, 6)
              .map((quest) => {
                const myQ   = myQuests.find(mq => mq.QuestID === quest.QuestID);
                const done  = ['completed','graded'].includes(myQ?.Status?.toLowerCase() || '');
                return (
                  <div
                    key={quest.QuestID}
                    className="p-4 rounded-2xl transition-all"
                    style={{
                      background: done
                        ? 'linear-gradient(135deg, #f0fdf4, #dcfce7)'
                        : 'linear-gradient(135deg, #fafbfc, #f4f6f9)',
                      border: `1.5px solid ${done ? '#86efac' : '#e2e5eb'}`,
                    }}
                  >      {/* ===== DEBUG PANEL (shows raw data) ===== */}
      <div style="background:#f0f0f0; border:3px solid red; padding:1rem; margin-bottom:1rem; border-radius:12px;">
        <h3 style="color:black;">🐛 DEBUG – Raw Data</h3>
        <p style="color:black;"><strong>Student email:</strong> {currentStudent?.email}</p>
        <p style="color:black;"><strong>Students total:</strong> {students?.length}</p>
        <p style="color:black;"><strong>Courses total:</strong> {courses?.length}</p>
        <p style="color:black;"><strong>Enrollments total:</strong> {enrollments?.length}</p>
        <details>
          <summary style="color:black;">Show first 3 enrollments</summary>
          <pre style="color:black;">{JSON.stringify(enrollments?.slice(0,3), null, 2)}</pre>
        </details>
        <details>
          <summary style="color:black;">Show first 2 courses</summary>
          <pre style="color:black;">{JSON.stringify(courses?.slice(0,2), null, 2)}</pre>
        </details>
      </div>
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md"
                        style={{
                          background: done ? '#dcfce7' : '#f0f0ff',
                          color: done ? '#16a34a' : '#6366f1',
                        }}
                      >
                        {quest.Type}
                      </span>
                      {done
                        ? <CheckCircle2 className="w-4 h-4" style={{ color:'#16a34a' }} />
                        : <Clock className="w-4 h-4" style={{ color:'#f59e0b' }} />
                      }
                    </div>
                    <p className="text-sm font-semibold line-clamp-1" style={{ color:'#0f1923' }}>{quest.Title}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs font-semibold" style={{ color:'#9333ea' }}>{quest.Points} pts</span>
                      <span className="text-xs" style={{ color:'#8896a8' }}>Due {quest.Deadline}</span>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}




