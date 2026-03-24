import { User, Star, TrendingUp, Lock, CheckCircle } from 'lucide-react';
import { useStudent } from '../../context/StudentContext';
import LoadingSpinner from '../UI/LoadingSpinner';

const GRADE_COLORS: Record<string, { bg: string; color: string }> = {
  'A+': { bg:'#dcfce7', color:'#16a34a' },
  'A':  { bg:'#dcfce7', color:'#16a34a' },
  'A-': { bg:'#d1fae5', color:'#059669' },
  'B+': { bg:'#dbeafe', color:'#1d4ed8' },
  'B':  { bg:'#dbeafe', color:'#2563eb' },
  'B-': { bg:'#eff6ff', color:'#3b82f6' },
  'C+': { bg:'#fef3c7', color:'#d97706' },
  'C':  { bg:'#fef3c7', color:'#d97706' },
  'C-': { bg:'#ffedd5', color:'#ea580c' },
  'D':  { bg:'#fee2e2', color:'#dc2626' },
  'F':  { bg:'#fee2e2', color:'#dc2626' },
};

const COURSE_ACCENTS = [
  { accent:'#6366f1', bg:'linear-gradient(135deg,#6366f1,#8b5cf6)', light:'#ede9fe' },
  { accent:'#1a5f4c', bg:'linear-gradient(135deg,#1a5f4c,#1e7a5f)', light:'#dcfce7' },
  { accent:'#f59e0b', bg:'linear-gradient(135deg,#f59e0b,#f97316)', light:'#fef3c7' },
  { accent:'#0ea5e9', bg:'linear-gradient(135deg,#0ea5e9,#6366f1)', light:'#e0f2fe' },
  { accent:'#ec4899', bg:'linear-gradient(135deg,#ec4899,#f43f5e)', light:'#fce7f3' },
  { accent:'#14b8a6', bg:'linear-gradient(135deg,#14b8a6,#0ea5e9)', light:'#ccfbf1' },
];

export default function Courses() {
  const { courses, enrollments, currentStudent, loading } = useStudent();
  if (loading) return <LoadingSpinner message="Loading courses…" />;

  const studentEnrollments = enrollments.filter(e => e.StudentID === currentStudent?.StudentID);
  const enrolledIds        = studentEnrollments.map(e => e.CourseID);
  const enrolledCourses    = courses.filter(c => enrolledIds.includes(c.CourseID));
  const availableCourses   = courses.filter(c => !enrolledIds.includes(c.CourseID));

  return (
    <div className="space-y-8 animate-fade-up pb-4">

      {/* Page header */}
      <div>
        <h1 className="font-extrabold text-[26px]" style={{ color:'#0f1923' }}>My Courses</h1>
        <p style={{ color:'#8896a8', marginTop:4 }}>
          {enrolledCourses.length} enrolled · {availableCourses.length} available
        </p>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label:'Enrolled', value: enrolledCourses.length, color:'#1a5f4c', bg:'#f0fdf4' },
          { label:'Credits', value: enrolledCourses.reduce((s,c)=>s+(parseInt(c.Credits)||0),0), color:'#6366f1', bg:'#faf5ff' },
          { label:'Available', value: availableCourses.length, color:'#f59e0b', bg:'#fffbeb' },
        ].map(s => (
          <div key={s.label} className="bento-card p-5 text-center">
            <p className="font-extrabold text-2xl" style={{ color: s.color }}>{s.value}</p>
            <p className="text-xs mt-1 font-medium" style={{ color:'#8896a8' }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Enrolled courses */}
      <div>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background:'#dcfce7' }}>
            <CheckCircle className="w-4 h-4" style={{ color:'#16a34a' }} />
          </div>
          <h2 className="font-bold text-[16px]" style={{ color:'#0f1923' }}>Enrolled Courses</h2>
        </div>

        {enrolledCourses.length === 0 ? (
          <div className="bento-card p-12 text-center">
            <p className="text-4xl mb-3">📚</p>
            <p style={{ color:'#8896a8' }}>No courses enrolled yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {enrolledCourses.map((course, i) => {
              const enrollment = studentEnrollments.find(e => e.CourseID === course.CourseID);
              const grade      = enrollment?.Grade || '—';
              const gradeStyle = GRADE_COLORS[grade] || { bg:'#f4f6f9', color:'#5a6475' };
              const theme      = COURSE_ACCENTS[i % COURSE_ACCENTS.length];

              return (
                <div
                  key={course.CourseID}
                  className="bento-card overflow-hidden animate-fade-up"
                  style={{ animationDelay:`${i*0.07}s` }}
                >
                  {/* Header strip */}
                  <div
                    className="h-28 relative flex items-end p-5 shimmer-hover"
                    style={{ background: theme.bg }}
                  >
                    <div style={{
                      position:'absolute', top:-20, right:-20,
                      width:100, height:100, borderRadius:'50%',
                      background:'rgba(255,255,255,0.12)',
                    }} />
                    <div>
                      <span
                        className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md"
                        style={{ background:'rgba(255,255,255,0.25)', color:'#fff' }}
                      >
                        {course.CourseID}
                      </span>
                      <p className="font-bold text-white text-[15px] mt-1 leading-tight line-clamp-1">
                        {course.CourseName}
                      </p>
                    </div>
                    <div
                      className="absolute top-4 right-4 px-2.5 py-1 rounded-xl text-xs font-bold"
                      style={{ background: gradeStyle.bg, color: gradeStyle.color }}
                    >
                      {grade}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" style={{ color:'#8896a8' }} />
                      <span className="text-sm" style={{ color:'#5a6475' }}>{course.Instructor || 'TBA'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4" style={{ color:'#8896a8' }} />
                        <span className="text-sm" style={{ color:'#5a6475' }}>
                          {course.Credits || 0} Credits
                        </span>
                      </div>
                      <span
                        className="text-xs font-semibold px-2.5 py-1 rounded-xl"
                        style={{ background: theme.light, color: theme.accent }}
                      >
                        Enrolled ✓
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Available courses */}
      {availableCourses.length > 0 && (
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background:'#ede9fe' }}>
              <TrendingUp className="w-4 h-4" style={{ color:'#7c3aed' }} />
            </div>
            <h2 className="font-bold text-[16px]" style={{ color:'#0f1923' }}>Available Courses</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {availableCourses.map((course, i) => (
              <div
                key={course.CourseID}
                className="bento-card p-5 flex items-start gap-4 animate-fade-up"
                style={{ animationDelay:`${i*0.05}s`, opacity:0.85 }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background:'#f4f6f9' }}>
                  <Lock className="w-4 h-4" style={{ color:'#8896a8' }} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-sm truncate" style={{ color:'#0f1923' }}>{course.CourseName}</p>
                  <p className="text-xs mt-0.5" style={{ color:'#8896a8' }}>
                    {course.CourseID} · {course.Credits || 0} Credits
                  </p>
                  <p className="text-xs mt-1" style={{ color:'#8896a8' }}>
                    <User className="w-3 h-3 inline mr-1" />{course.Instructor || 'TBA'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
