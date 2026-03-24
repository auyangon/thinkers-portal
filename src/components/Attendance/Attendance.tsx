import { CheckCircle2, XCircle, MinusCircle, TrendingUp, Calendar } from 'lucide-react';
import { useState } from 'react';
import { useStudent } from '../../context/StudentContext';
import LoadingSpinner from '../UI/LoadingSpinner';

const STATUS_STYLE = {
  present: { bg:'#dcfce7', color:'#16a34a', icon: CheckCircle2, dot:'#16a34a' },
  absent:  { bg:'#fee2e2', color:'#dc2626', icon: XCircle,      dot:'#dc2626' },
  late:    { bg:'#fef3c7', color:'#d97706', icon: MinusCircle,  dot:'#d97706' },
};

export default function Attendance() {
  const { attendance, courses, enrollments, currentStudent, loading } = useStudent();
  const [filter, setFilter] = useState('all');
  if (loading) return <LoadingSpinner message="Loading attendance…" />;

  const mine = attendance.filter(a => a.StudentID === currentStudent?.StudentID);
  const present  = mine.filter(a => a.Status?.toLowerCase() === 'present').length;
  const absent   = mine.filter(a => a.Status?.toLowerCase() === 'absent').length;
  const late     = mine.filter(a => a.Status?.toLowerCase() === 'late').length;
  const rate     = mine.length > 0 ? Math.round((present / mine.length) * 100) : 100;

  const enrolledIds = enrollments
    .filter(e => e.StudentID === currentStudent?.StudentID)
    .map(e => e.CourseID);

  const enrolledCourses = courses.filter(c => enrolledIds.includes(c.CourseID));

  const filtered = filter === 'all'
    ? mine
    : mine.filter(a => a.Status?.toLowerCase() === filter);

  const sorted = [...filtered].sort((a,b) => new Date(b.Date).getTime() - new Date(a.Date).getTime());

  const rateColor = rate >= 90 ? '#16a34a' : rate >= 75 ? '#d97706' : '#dc2626';

  return (
    <div className="space-y-7 animate-fade-up pb-4">
      {/* Header */}
      <div>
        <h1 className="font-extrabold text-[26px]" style={{ color:'#0f1923' }}>✅ Attendance</h1>
        <p style={{ color:'#8896a8', marginTop:4 }}>Track your class attendance records</p>
      </div>

      {/* Main stat hero */}
      <div
        className="rounded-3xl p-8 relative overflow-hidden shimmer-hover"
        style={{
          background: `linear-gradient(135deg, ${rateColor === '#16a34a' ? '#0f2a22 0%, #1a5f4c 100%' : rateColor === '#d97706' ? '#451a03 0%, #78350f 100%' : '#450a0a 0%, #7f1d1d 100%'})`,
        }}
      >
        <div style={{
          position:'absolute', top:-40, right:-40,
          width:200, height:200, borderRadius:'50%',
          background:'rgba(255,255,255,0.07)',
        }} />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-8">
          {/* Big rate circle */}
          <div className="relative w-32 h-32 flex-shrink-0">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="8" />
              <circle
                cx="50" cy="50" r="40" fill="none"
                stroke="#d4af37" strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${rate * 2.513} ${251.3 - rate * 2.513}`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-extrabold text-white text-2xl">{rate}%</span>
              <span style={{ color:'rgba(255,255,255,0.55)', fontSize:10 }}>Rate</span>
            </div>
          </div>

          <div className="flex-1">
            <p className="font-bold text-white text-xl mb-1">Attendance Rate</p>
            <p style={{ color:'rgba(255,255,255,0.55)', fontSize:14 }}>
              {rate >= 90 ? '🎉 Excellent! Keep it up.' : rate >= 75 ? '⚠️ Good, aim for 90%+.' : '🚨 Below threshold. Please improve.'}
            </p>
            <div className="grid grid-cols-3 gap-4 mt-6">
              {[
                { label:'Present', value: present, color:'#86efac' },
                { label:'Absent',  value: absent,  color:'#fca5a5' },
                { label:'Late',    value: late,     color:'#fde68a' },
              ].map(s => (
                <div key={s.label}>
                  <p className="font-bold text-2xl" style={{ color: s.color }}>{s.value}</p>
                  <p style={{ color:'rgba(255,255,255,0.45)', fontSize:11, marginTop:2 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Per-course breakdown */}
      <div className="bento-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background:'#e0f2fe' }}>
            <TrendingUp className="w-4 h-4" style={{ color:'#0369a1' }} />
          </div>
          <h2 className="font-bold text-[15px]" style={{ color:'#0f1923' }}>Per-Course Breakdown</h2>
        </div>
        <div className="space-y-4">
          {enrolledCourses.map((course) => {
            const courseAtt  = mine.filter(a => a.CourseID === course.CourseID);
            const coursePres = courseAtt.filter(a => a.Status?.toLowerCase() === 'present').length;
            const courseRate = courseAtt.length > 0 ? Math.round((coursePres / courseAtt.length) * 100) : 100;
            const fillColor  = courseRate >= 90 ? '#16a34a' : courseRate >= 75 ? '#f59e0b' : '#ef4444';

            return (
              <div key={course.CourseID}>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold" style={{ color:'#0f1923' }}>{course.CourseName}</p>
                  <span className="text-sm font-bold" style={{ color: fillColor }}>{courseRate}%</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width:`${courseRate}%`, background: fillColor }}
                  />
                </div>
                <p className="text-[10px] mt-1" style={{ color:'#8896a8' }}>
                  {coursePres}/{courseAtt.length} sessions attended
                </p>
              </div>
            );
          })}
          {enrolledCourses.length === 0 && (
            <p className="text-center py-6 text-sm" style={{ color:'#8896a8' }}>No course data available</p>
          )}
        </div>
      </div>

      {/* Filter + Records */}
      <div className="bento-card p-6">
        <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background:'#f0fdf4' }}>
              <Calendar className="w-4 h-4" style={{ color:'#16a34a' }} />
            </div>
            <h2 className="font-bold text-[15px]" style={{ color:'#0f1923' }}>Attendance Records</h2>
          </div>
          <div className="flex gap-2">
            {['all','present','absent','late'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-3 py-1.5 rounded-full text-[11px] font-semibold capitalize transition-all"
                style={filter === f ? {
                  background:'linear-gradient(135deg,#1a5f4c,#1e7a5f)', color:'#fff',
                } : {
                  background:'#f4f6f9', color:'#5a6475', border:'1.5px solid #e2e5eb',
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {sorted.length === 0 ? (
          <p className="text-center py-10 text-sm" style={{ color:'#8896a8' }}>No records found</p>
        ) : (
          <div className="space-y-2">
            {sorted.slice(0, 30).map((record, i) => {
              const st  = (record.Status?.toLowerCase() || 'present') as keyof typeof STATUS_STYLE;
              const sty = STATUS_STYLE[st] || STATUS_STYLE.present;
              const Icon = sty.icon;
              return (
                <div
                  key={i}
                  className="flex items-center gap-4 p-3.5 rounded-2xl transition-all"
                  style={{ background:'#f8f9fc' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#fff'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#f8f9fc'}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" style={{ color: sty.color }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate" style={{ color:'#0f1923' }}>
                      {courses.find(c=>c.CourseID===record.CourseID)?.CourseName || record.CourseID}
                    </p>
                    <p className="text-xs" style={{ color:'#8896a8' }}>{record.Date}</p>
                  </div>
                  <span
                    className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase"
                    style={{ background: sty.bg, color: sty.color }}
                  >
                    {record.Status}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
