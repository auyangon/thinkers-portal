import { useState } from 'react';
import { useStudent } from '../context/StudentContext';
import { Mail, ArrowRight, Sparkles, BookOpen, Users, Award, ChevronDown } from 'lucide-react';

const stats = [
  { value: '2,400+', label: 'Students', icon: Users },
  { value: '50+',    label: 'Courses',  icon: BookOpen },
  { value: '98%',    label: 'Satisfaction', icon: Award },
];

export default function Login() {
  const { login, students, loading } = useStudent();
  const [email, setEmail]           = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [hoveredStudent, setHoveredStudent] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) login(email.trim());
  };

  return (
    <div className="min-h-screen flex" style={{ background: '#f4f6f9', fontFamily: 'Poppins, sans-serif' }}>

      {/* ── LEFT BRANDING PANEL ────────────────────────────────── */}
      <div
        className="hidden lg:flex lg:w-[52%] relative overflow-hidden flex-col"
        style={{
          background: 'linear-gradient(145deg, #081812 0%, #0f2a22 35%, #1a5f4c 75%, #1e7a5f 100%)',
        }}
      >
        {/* Decorative blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div style={{
            position:'absolute', top:'-80px', right:'-80px',
            width:400, height:400, borderRadius:'50%',
            background:'radial-gradient(circle, rgba(212,175,55,0.18) 0%, transparent 70%)',
          }} />
          <div style={{
            position:'absolute', bottom:'10%', left:'-60px',
            width:320, height:320, borderRadius:'50%',
            background:'radial-gradient(circle, rgba(30,122,95,0.4) 0%, transparent 70%)',
          }} />
          <div style={{
            position:'absolute', top:'40%', left:'30%',
            width:160, height:160, borderRadius:'50%',
            background:'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)',
          }} />
          {/* Grid overlay */}
          <div style={{
            position:'absolute', inset:0,
            backgroundImage:`linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize:'48px 48px',
          }} />
        </div>

        <div className="relative z-10 flex flex-col justify-between h-full p-14">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div style={{
              width:44, height:44, borderRadius:14,
              background:'linear-gradient(135deg, #d4af37 0%, #f0cc55 100%)',
              display:'flex', alignItems:'center', justifyContent:'center',
              boxShadow:'0 8px 24px rgba(212,175,55,0.4)',
            }}>
              <span style={{ fontSize:22 }}>🎓</span>
            </div>
            <div>
              <p className="font-bold text-white text-lg leading-none">AUY Portal</p>
              <p style={{ color:'rgba(255,255,255,0.45)', fontSize:11 }}>American University of Yangon</p>
            </div>
          </div>

          {/* Hero text */}
          <div className="animate-fade-in">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8"
              style={{
                background:'rgba(212,175,55,0.15)',
                border:'1px solid rgba(212,175,55,0.3)',
              }}
            >
              <Sparkles className="w-3.5 h-3.5" style={{ color:'#d4af37' }} />
              <span style={{ color:'#d4af37', fontSize:11, fontWeight:600, letterSpacing:'0.06em' }}>
                STUDENT PORTAL 2025
              </span>
            </div>

            <h1 className="font-extrabold text-white leading-[1.1] mb-6" style={{ fontSize: 'clamp(2.4rem, 4vw, 3.4rem)' }}>
              Your Academic<br />
              <span style={{
                background:'linear-gradient(135deg, #d4af37 0%, #f0cc55 100%)',
                WebkitBackgroundClip:'text',
                WebkitTextFillColor:'transparent',
              }}>
                Journey
              </span>{' '}
              Starts<br />Here.
            </h1>

            <p style={{ color:'rgba(255,255,255,0.6)', fontSize:'1.05rem', lineHeight:1.7, maxWidth:380 }}>
              Access courses, track progress, manage assignments, and explore our digital library — all in one beautiful place.
            </p>

            {/* Stats row */}
            <div className="flex gap-8 mt-12">
              {stats.map((s, i) => (
                <div key={i} className="flex flex-col">
                  <span className="font-bold text-white text-2xl">{s.value}</span>
                  <span style={{ color:'rgba(255,255,255,0.45)', fontSize:12, marginTop:2 }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom testimonial */}
          <div
            className="p-5 rounded-2xl"
            style={{
              background:'rgba(255,255,255,0.07)',
              border:'1px solid rgba(255,255,255,0.1)',
              backdropFilter:'blur(10px)',
            }}
          >
            <p style={{ color:'rgba(255,255,255,0.75)', fontSize:13, lineHeight:1.6 }}>
              "The AUY Portal has transformed how I manage my academics. Everything I need is right here."
            </p>
            <div className="flex items-center gap-3 mt-4">
              <div style={{
                width:34, height:34, borderRadius:10,
                background:'linear-gradient(135deg, #1a5f4c, #d4af37)',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:14, fontWeight:700, color:'#fff',
              }}>
                TM
              </div>
              <div>
                <p style={{ color:'#fff', fontWeight:600, fontSize:13 }}>Thura Min</p>
                <p style={{ color:'rgba(255,255,255,0.4)', fontSize:11 }}>Year 3 · Business Administration</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT LOGIN PANEL ─────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-[420px] animate-fade-in">

          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div style={{
              width:42, height:42, borderRadius:13,
              background:'linear-gradient(135deg, #1a5f4c 0%, #1e7a5f 100%)',
              display:'flex', alignItems:'center', justifyContent:'center',
              boxShadow:'0 6px 20px rgba(26,95,76,0.3)',
            }}>
              <span style={{ fontSize:20 }}>🎓</span>
            </div>
            <div>
              <p className="font-bold text-[17px]" style={{ color:'#0f1923' }}>AUY Portal</p>
              <p style={{ color:'#8896a8', fontSize:11 }}>Student Dashboard</p>
            </div>
          </div>

          {/* Heading */}
          <div className="mb-9">
            <h2 className="font-extrabold text-[28px]" style={{ color:'#0f1923', lineHeight:1.2 }}>
              Welcome back 👋
            </h2>
            <p style={{ color:'#8896a8', fontSize:'0.92rem', marginTop:6 }}>
              Sign in to access your student portal
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color:'#0f1923' }}>
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5"
                  style={{ color:'#8896a8' }}
                />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your.email@auymyanmar.edu.mm"
                  className="input-field"
                  style={{ paddingLeft: 44 }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !email.trim()}
              className="btn-primary w-full"
              style={{ height: 50, fontSize: '0.95rem' }}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="30 70" />
                  </svg>
                  Signing in…
                </span>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-7">
            <div className="flex-1 h-px" style={{ background:'#e2e5eb' }} />
            <span className="text-xs font-medium" style={{ color:'#8896a8' }}>or continue with</span>
            <div className="flex-1 h-px" style={{ background:'#e2e5eb' }} />
          </div>

          {/* Quick login */}
          <button
            onClick={() => setShowPicker(!showPicker)}
            className="w-full flex items-center justify-between px-4 py-3.5 rounded-2xl font-medium text-sm transition-all"
            style={{
              background: showPicker ? '#fff' : '#f4f6f9',
              border: `1.5px solid ${showPicker ? '#1a5f4c' : '#e2e5eb'}`,
              color: '#0f1923',
              boxShadow: showPicker ? '0 0 0 4px rgba(26,95,76,0.10)' : 'none',
            }}
          >
            <div className="flex items-center gap-2">
              <span>⚡</span>
              <span>Quick Student Login</span>
            </div>
            <ChevronDown
              className="w-4 h-4 transition-transform"
              style={{
                transform: showPicker ? 'rotate(180deg)' : 'rotate(0deg)',
                color:'#8896a8',
              }}
            />
          </button>

          {showPicker && students.length > 0 && (
            <div
              className="mt-2 p-2 rounded-2xl overflow-hidden animate-fade-in"
              style={{
                background:'#fff',
                border:'1.5px solid #e2e5eb',
                boxShadow:'0 16px 48px rgba(15,25,35,0.12)',
                maxHeight: 260,
                overflowY:'auto',
              }}
            >
              {students.slice(0, 8).map((student) => {
                const initials = student.Name
                  ?.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase();
                const isHovered = hoveredStudent === student.StudentID;
                return (
                  <button
                    key={student.StudentID}
                    onClick={() => login(student.Email, student.Name)}
                    onMouseEnter={() => setHoveredStudent(student.StudentID)}
                    onMouseLeave={() => setHoveredStudent(null)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all"
                    style={{ background: isHovered ? '#f4f6f9' : 'transparent' }}
                  >
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{
                        background: 'linear-gradient(135deg, #1a5f4c, #1e7a5f)',
                        color: '#d4af37',
                      }}
                    >
                      {initials}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold truncate" style={{ color:'#0f1923' }}>
                        {student.Name}
                      </p>
                      <p className="text-xs truncate" style={{ color:'#8896a8' }}>
                        {student.Email}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 ml-auto flex-shrink-0" style={{ color: isHovered ? '#1a5f4c' : '#e2e5eb' }} />
                  </button>
                );
              })}
            </div>
          )}

          <p className="text-center text-xs mt-8" style={{ color:'#b0b9c6' }}>
            © 2025 American University of Yangon. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
