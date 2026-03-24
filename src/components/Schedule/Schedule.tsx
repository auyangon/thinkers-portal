import { Clock, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useStudent } from '../../context/StudentContext';
import LoadingSpinner from '../UI/LoadingSpinner';

const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

const DAY_THEMES = [
  { color:'#6366f1', light:'#ede9fe', label:'Mon' },
  { color:'#1a5f4c', light:'#dcfce7', label:'Tue' },
  { color:'#f59e0b', light:'#fef3c7', label:'Wed' },
  { color:'#ef4444', light:'#fee2e2', label:'Thu' },
  { color:'#8b5cf6', light:'#f5f3ff', label:'Fri' },
  { color:'#0ea5e9', light:'#e0f2fe', label:'Sat' },
  { color:'#ec4899', light:'#fce7f3', label:'Sun' },
];

export default function Schedule() {
  const { schedule, enrollments, currentStudent, loading } = useStudent();
  const [view, setView] = useState<'week'|'day'>('week');
  const [dayIndex, setDayIndex] = useState(
    Math.max(0, DAYS.indexOf(new Date().toLocaleDateString('en-US',{weekday:'long'})))
  );
  if (loading) return <LoadingSpinner message="Loading schedule…" />;

  const enrolledIds = enrollments
    .filter(e => e.StudentID === currentStudent?.StudentID)
    .map(e => e.CourseID);

  const mySchedule = schedule.filter(s => enrolledIds.includes(s.CourseID));
  const today      = new Date().toLocaleDateString('en-US',{weekday:'long'});

  const getDay = (day: string) =>
    mySchedule.filter(s => s.Day?.toLowerCase() === day.toLowerCase())
      .sort((a,b) => (a.StartTime||'').localeCompare(b.StartTime||''));

  return (
    <div className="space-y-7 animate-fade-up pb-4">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-extrabold text-[26px]" style={{ color:'#0f1923' }}>📅 Schedule</h1>
          <p style={{ color:'#8896a8', marginTop:4 }}>Your weekly class timetable</p>
        </div>
        <div className="flex gap-2">
          {(['week','day'] as const).map(v => (
            <button
              key={v}
              onClick={() => setView(v)}
              className="px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-all"
              style={view === v ? {
                background:'linear-gradient(135deg,#1a5f4c,#1e7a5f)',
                color:'#fff',
                boxShadow:'0 4px 14px rgba(26,95,76,0.3)',
              } : {
                background:'#f4f6f9',
                color:'#5a6475',
                border:'1.5px solid #e2e5eb',
              }}
            >
              {v === 'week' ? '🗓 Week' : '📆 Day'}
            </button>
          ))}
        </div>
      </div>

      {/* Week view */}
      {view === 'week' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {DAYS.map((day, di) => {
            const classes  = getDay(day);
            const theme    = DAY_THEMES[di];
            const isToday  = day.toLowerCase() === today.toLowerCase();

            return (
              <div
                key={day}
                className="bento-card overflow-hidden"
                style={{
                  border: isToday ? `2px solid ${theme.color}` : undefined,
                  boxShadow: isToday ? `0 0 0 4px ${theme.color}18` : undefined,
                }}
              >
                {/* Day header */}
                <div className="px-5 py-4 flex items-center justify-between" style={{ background: theme.light }}>
                  <div>
                    <p className="font-bold text-sm" style={{ color: theme.color }}>{day}</p>
                    {isToday && (
                      <span
                        className="text-[9px] font-bold uppercase tracking-wider"
                        style={{ color: theme.color }}
                      >
                        Today
                      </span>
                    )}
                  </div>
                  <div
                    className="w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold"
                    style={{ background: theme.color, color:'#fff' }}
                  >
                    {classes.length}
                  </div>
                </div>

                {/* Classes */}
                <div className="p-3 space-y-2">
                  {classes.length === 0 ? (
                    <p className="text-center text-xs py-4" style={{ color:'#b0b9c6' }}>No classes</p>
                  ) : (
                    classes.map((item, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl"
                        style={{ background:'#f8f9fc', borderLeft:`3px solid ${theme.color}` }}
                      >
                        <p className="font-semibold text-xs" style={{ color:'#0f1923' }} >{item.CourseName}</p>
                        <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                          <span className="flex items-center gap-1 text-[10px]" style={{ color:'#8896a8' }}>
                            <Clock className="w-3 h-3" />
                            {item.StartTime}–{item.EndTime}
                          </span>
                          <span className="flex items-center gap-1 text-[10px]" style={{ color:'#8896a8' }}>
                            <MapPin className="w-3 h-3" />
                            {item.Room}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Day view */}
      {view === 'day' && (
        <div className="bento-card overflow-hidden">
          {/* Day nav */}
          <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom:'1.5px solid #e8eaf0' }}>
            <button
              onClick={() => setDayIndex(Math.max(0, dayIndex-1))}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all btn-ghost"
              disabled={dayIndex === 0}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="text-center">
              <p className="font-bold text-lg" style={{ color:'#0f1923' }}>{DAYS[dayIndex]}</p>
              {DAYS[dayIndex].toLowerCase() === today.toLowerCase() && (
                <span
                  className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                  style={{ background: DAY_THEMES[dayIndex].light, color: DAY_THEMES[dayIndex].color }}
                >
                  Today
                </span>
              )}
            </div>
            <button
              onClick={() => setDayIndex(Math.min(DAYS.length-1, dayIndex+1))}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all btn-ghost"
              disabled={dayIndex === DAYS.length-1}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Timeline */}
          <div className="p-6">
            {(() => {
              const classes = getDay(DAYS[dayIndex]);
              const theme   = DAY_THEMES[dayIndex];
              return classes.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-5xl mb-3">😴</p>
                  <p style={{ color:'#8896a8' }}>No classes on {DAYS[dayIndex]}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {classes.map((item, i) => (
                    <div
                      key={i}
                      className="flex gap-5 animate-fade-up"
                      style={{ animationDelay:`${i*0.08}s` }}
                    >
                      {/* Time column */}
                      <div className="w-24 text-right flex-shrink-0 pt-1">
                        <p className="font-bold text-sm" style={{ color: theme.color }}>{item.StartTime}</p>
                        <p className="text-[10px]" style={{ color:'#b0b9c6' }}>{item.EndTime}</p>
                      </div>
                      {/* Timeline line */}
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full flex-shrink-0 mt-1.5" style={{ background: theme.color, boxShadow:`0 0 0 4px ${theme.color}25` }} />
                        {i < classes.length-1 && (
                          <div className="w-0.5 flex-1 mt-1" style={{ background: theme.light, minHeight:40 }} />
                        )}
                      </div>
                      {/* Class card */}
                      <div
                        className="flex-1 p-5 rounded-2xl mb-4"
                        style={{ background: theme.light, borderLeft:`4px solid ${theme.color}` }}
                      >
                        <p className="font-bold text-[15px]" style={{ color:'#0f1923' }}>{item.CourseName}</p>
                        <p className="text-sm mt-1" style={{ color:'#5a6475' }}>{item.Instructor}</p>
                        <div className="flex items-center gap-4 mt-3 flex-wrap">
                          <span className="flex items-center gap-1.5 text-xs font-medium" style={{ color: theme.color }}>
                            <MapPin className="w-3.5 h-3.5" /> Room {item.Room}
                          </span>
                          <span className="flex items-center gap-1.5 text-xs font-medium" style={{ color: theme.color }}>
                            <Clock className="w-3.5 h-3.5" /> {item.StartTime} – {item.EndTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
