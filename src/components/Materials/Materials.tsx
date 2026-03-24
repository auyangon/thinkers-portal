import { FolderOpen, Search, Download, FileText, Video, Link2, Image, File } from 'lucide-react';
import { useState } from 'react';
import { useStudent } from '../../context/StudentContext';
import LoadingSpinner from '../UI/LoadingSpinner';

const FILE_TYPES: Record<string, { icon: typeof FileText; color: string; bg: string; label: string }> = {
  pdf:   { icon: FileText, color:'#dc2626', bg:'#fee2e2', label:'PDF'   },
  video: { icon: Video,    color:'#7c3aed', bg:'#ede9fe', label:'Video' },
  link:  { icon: Link2,    color:'#0369a1', bg:'#e0f2fe', label:'Link'  },
  image: { icon: Image,    color:'#d97706', bg:'#fef3c7', label:'Image' },
  doc:   { icon: FileText, color:'#1d4ed8', bg:'#dbeafe', label:'Doc'   },
  slide: { icon: File,     color:'#059669', bg:'#d1fae5', label:'Slides'},
};

// Simulate materials from enrolled courses
function useMaterials() {
  const { courses, enrollments, currentStudent } = useStudent();
  const enrolledIds = enrollments
    .filter(e => e.StudentID === currentStudent?.StudentID)
    .map(e => e.CourseID);
  const enrolledCourses = courses.filter(c => enrolledIds.includes(c.CourseID));

  const materials = enrolledCourses.flatMap((course) => [
    { id:`${course.CourseID}-1`, courseId: course.CourseID, courseName: course.CourseName,
      title:`${course.CourseName} - Lecture Notes Week 1`, type:'pdf', size:'2.4 MB', date:'2025-01-10', downloads: 45 },
    { id:`${course.CourseID}-2`, courseId: course.CourseID, courseName: course.CourseName,
      title:`${course.CourseName} - Course Syllabus`, type:'pdf', size:'0.8 MB', date:'2025-01-05', downloads: 120 },
    { id:`${course.CourseID}-3`, courseId: course.CourseID, courseName: course.CourseName,
      title:`${course.CourseName} - Introduction Slides`, type:'slide', size:'5.1 MB', date:'2025-01-08', downloads: 67 },
  ]);

  return { materials, enrolledCourses };
}

export default function Materials() {
  const { loading } = useStudent();
  const { materials, enrolledCourses } = useMaterials();
  const [search, setSearch] = useState('');
  const [courseFilter, setCourseFilter] = useState('all');

  if (loading) return <LoadingSpinner message="Loading materials…" />;

  const filtered = materials.filter(m => {
    const matchSearch = !search ||
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.courseName.toLowerCase().includes(search.toLowerCase());
    const matchCourse = courseFilter === 'all' || m.courseId === courseFilter;
    return matchSearch && matchCourse;
  });

  return (
    <div className="space-y-7 animate-fade-up pb-4">
      {/* Header */}
      <div>
        <h1 className="font-extrabold text-[26px]" style={{ color:'#0f1923' }}>📂 Materials</h1>
        <p style={{ color:'#8896a8', marginTop:4 }}>{materials.length} files across {enrolledCourses.length} courses</p>
      </div>

      {/* Search + filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color:'#8896a8' }} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search materials…"
            className="input-field"
            style={{ paddingLeft: 42 }}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setCourseFilter('all')}
            className="px-4 py-2 rounded-xl text-xs font-semibold transition-all"
            style={courseFilter === 'all' ? {
              background:'linear-gradient(135deg,#1a5f4c,#1e7a5f)', color:'#fff',
              boxShadow:'0 4px 12px rgba(26,95,76,0.3)',
            } : {
              background:'#f4f6f9', color:'#5a6475', border:'1.5px solid #e2e5eb',
            }}
          >
            All Courses
          </button>
          {enrolledCourses.slice(0, 4).map(c => (
            <button
              key={c.CourseID}
              onClick={() => setCourseFilter(c.CourseID)}
              className="px-4 py-2 rounded-xl text-xs font-semibold transition-all"
              style={courseFilter === c.CourseID ? {
                background:'linear-gradient(135deg,#1a5f4c,#1e7a5f)', color:'#fff',
                boxShadow:'0 4px 12px rgba(26,95,76,0.3)',
              } : {
                background:'#f4f6f9', color:'#5a6475', border:'1.5px solid #e2e5eb',
              }}
            >
              {c.CourseID}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Object.entries(FILE_TYPES).slice(0, 4).map(([type, cfg]) => {
          const count = materials.filter(m => m.type === type).length;
          const Icon = cfg.icon;
          return (
            <div key={type} className="bento-card p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: cfg.bg }}>
                <Icon className="w-4 h-4" style={{ color: cfg.color }} />
              </div>
              <div>
                <p className="font-bold text-lg" style={{ color:'#0f1923' }}>{count}</p>
                <p className="text-[11px]" style={{ color:'#8896a8' }}>{cfg.label}s</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Materials grid */}
      {filtered.length === 0 ? (
        <div className="bento-card p-16 text-center">
          <FolderOpen className="w-12 h-12 mx-auto mb-3" style={{ color:'#e2e5eb' }} />
          <p style={{ color:'#8896a8' }}>No materials found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((material, i) => {
            const type   = (material.type || 'pdf') as keyof typeof FILE_TYPES;
            const config = FILE_TYPES[type] || FILE_TYPES.pdf;
            const Icon   = config.icon;

            return (
              <div
                key={material.id}
                className="bento-card p-5 flex flex-col gap-4 animate-fade-up"
                style={{ animationDelay:`${i*0.05}s` }}
              >
                {/* File icon */}
                <div className="flex items-start justify-between">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{ background: config.bg }}
                  >
                    <Icon className="w-6 h-6" style={{ color: config.color }} />
                  </div>
                  <span
                    className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md"
                    style={{ background: config.bg, color: config.color }}
                  >
                    {config.label}
                  </span>
                </div>

                {/* Info */}
                <div className="flex-1">
                  <p className="font-semibold text-[13px] leading-tight" style={{ color:'#0f1923' }}>
                    {material.title}
                  </p>
                  <p className="text-xs mt-1.5" style={{ color:'#8896a8' }}>{material.courseName}</p>
                  <div className="flex items-center gap-3 mt-3 text-[11px]" style={{ color:'#b0b9c6' }}>
                    <span>{material.size}</span>
                    <span>·</span>
                    <span>{material.date}</span>
                    <span>·</span>
                    <span>{material.downloads} downloads</span>
                  </div>
                </div>

                {/* Download button */}
                <button
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all"
                  style={{
                    background: config.bg,
                    color: config.color,
                    border:`1.5px solid ${config.color}30`,
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = config.color;
                    (e.currentTarget as HTMLElement).style.color = '#fff';
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 6px 20px ${config.color}40`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = config.bg;
                    (e.currentTarget as HTMLElement).style.color = config.color;
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  }}
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
