import { ExternalLink, Star, Sparkles, BookMarked, GraduationCap, FlaskConical, Search, Newspaper } from 'lucide-react';
import { useState } from 'react';

interface Resource {
  name: string;
  emoji: string;
  tagline: string;
  description: string;
  url: string;
  category: string;
  tag?: string;
  tagColor?: string;
  accent: string;      // card left/top accent color
  bg: string;          // card body gradient
  iconBg: string;
}

const resources: Resource[] = [
  {
    name: 'Project Gutenberg',
    emoji: '📖',
    tagline: '70,000+ Free eBooks',
    description: 'The oldest digital library — classic literature, philosophy, and academic texts completely free.',
    url: 'https://gutenberg.org',
    category: 'eBooks',
    tag: 'Most Popular',
    tagColor: '#ef4444',
    accent: '#ef4444',
    bg: 'linear-gradient(135deg, #fff5f5 0%, #fff 100%)',
    iconBg: '#fef2f2',
  },
  {
    name: 'OpenStax',
    emoji: '📚',
    tagline: 'Free College Textbooks',
    description: 'Peer-reviewed, openly licensed textbooks for college courses — professionally written and regularly updated.',
    url: 'https://openstax.org',
    category: 'Textbooks',
    tag: 'Recommended',
    tagColor: '#1a5f4c',
    accent: '#1a5f4c',
    bg: 'linear-gradient(135deg, #f0fdf4 0%, #fff 100%)',
    iconBg: '#dcfce7',
  },
  {
    name: 'Khan Academy',
    emoji: '🎓',
    tagline: 'Free Video Lessons',
    description: 'World-class education for everyone — interactive exercises, videos, and a personalized dashboard.',
    url: 'https://khanacademy.org',
    category: 'Video Courses',
    tag: 'Essential',
    tagColor: '#d97706',
    accent: '#d97706',
    bg: 'linear-gradient(135deg, #fffbeb 0%, #fff 100%)',
    iconBg: '#fef3c7',
  },
  {
    name: 'Open Yale Courses',
    emoji: '🏛️',
    tagline: 'Ivy League, Free',
    description: "Access Yale University's introductory courses with full video lectures, syllabi, and reading lists.",
    url: 'https://oyc.yale.edu',
    category: 'University',
    accent: '#0284c7',
    bg: 'linear-gradient(135deg, #f0f9ff 0%, #fff 100%)',
    iconBg: '#e0f2fe',
  },
  {
    name: 'MIT OpenCourseWare',
    emoji: '🔬',
    tagline: 'MIT Courses, Free',
    description: 'Virtually all MIT course materials — lecture notes, problem sets, exams, and video lectures.',
    url: 'https://ocw.mit.edu',
    category: 'University',
    tag: 'Premium',
    tagColor: '#7c3aed',
    accent: '#7c3aed',
    bg: 'linear-gradient(135deg, #faf5ff 0%, #fff 100%)',
    iconBg: '#ede9fe',
  },
  {
    name: 'JSTOR',
    emoji: '📄',
    tagline: 'Academic Journals',
    description: 'Millions of academic journal articles, books, and primary sources across every discipline.',
    url: 'https://jstor.org',
    category: 'Journals',
    accent: '#0f766e',
    bg: 'linear-gradient(135deg, #f0fdfa 0%, #fff 100%)',
    iconBg: '#ccfbf1',
  },
  {
    name: 'Google Scholar',
    emoji: '🔍',
    tagline: 'Search 200M+ Papers',
    description: 'Search scholarly literature across all disciplines — articles, theses, books, and conference papers.',
    url: 'https://scholar.google.com',
    category: 'Search',
    tag: 'Fast',
    tagColor: '#2563eb',
    accent: '#2563eb',
    bg: 'linear-gradient(135deg, #eff6ff 0%, #fff 100%)',
    iconBg: '#dbeafe',
  },
  {
    name: 'Internet Archive',
    emoji: '🌐',
    tagline: '35M+ Books & Texts',
    description: 'A digital library of internet sites and cultural artifacts — borrow books, access historical texts.',
    url: 'https://archive.org',
    category: 'Archive',
    accent: '#b45309',
    bg: 'linear-gradient(135deg, #fffbeb 0%, #fff 100%)',
    iconBg: '#fef3c7',
  },
];

const firstYearPicks = ['OpenStax', 'Khan Academy', 'Google Scholar', 'JSTOR'];

const categoryIcons: Record<string, typeof BookMarked> = {
  eBooks:         BookMarked,
  Textbooks:      BookMarked,
  'Video Courses': GraduationCap,
  University:     GraduationCap,
  Journals:       Newspaper,
  Search:         Search,
  Archive:        BookMarked,
};

const categories = ['All', ...Array.from(new Set(resources.map(r => r.category)))];

export default function Library() {
  const [active, setActive]   = useState('All');
  const [hovered, setHovered] = useState<string | null>(null);

  const filtered = active === 'All' ? resources : resources.filter(r => r.category === active);

  return (
    <div className="pb-8 space-y-8 animate-fade-up">

      {/* ── HERO HEADER ──────────────────────────────────────── */}
      <div
        className="relative overflow-hidden rounded-3xl"
        style={{
          background: 'linear-gradient(135deg, #0f2a22 0%, #1a5f4c 55%, #1e7a5f 100%)',
          minHeight: 200,
        }}
      >
        {/* Decorative */}
        <div style={{
          position:'absolute', top:-60, right:-60,
          width:280, height:280, borderRadius:'50%',
          background:'radial-gradient(circle, rgba(212,175,55,0.2) 0%, transparent 70%)',
        }} />
        <div style={{
          position:'absolute', bottom:-40, left:'20%',
          width:200, height:200, borderRadius:'50%',
          background:'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)',
        }} />
        <div style={{
          position:'absolute', inset:0, opacity:0.06,
          backgroundImage:`linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
          backgroundSize:'36px 36px',
        }} />

        <div className="relative z-10 p-8 sm:p-12">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5"
            style={{ background:'rgba(212,175,55,0.18)', border:'1px solid rgba(212,175,55,0.3)' }}
          >
            <Sparkles className="w-3 h-3" style={{ color:'#d4af37' }} />
            <span style={{ color:'#d4af37', fontSize:10, fontWeight:700, letterSpacing:'0.08em' }}>
              AUY DIGITAL LIBRARY
            </span>
          </div>
          <h1 className="font-extrabold text-white mb-3" style={{ fontSize:'clamp(1.8rem,3vw,2.8rem)', lineHeight:1.15 }}>
            📚 Free Academic Resources
          </h1>
          <p style={{ color:'rgba(255,255,255,0.65)', fontSize:'1rem', maxWidth:520, lineHeight:1.7 }}>
            Curated, world-class learning resources for liberal arts and science students — completely free, no paywall.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            {[
              { n:'8', l:'Resources' },
              { n:'200M+', l:'Papers & Books' },
              { n:'100%', l:'Free Access' },
            ].map(s => (
              <div
                key={s.l}
                className="px-5 py-3 rounded-2xl"
                style={{ background:'rgba(255,255,255,0.1)', backdropFilter:'blur(8px)', border:'1px solid rgba(255,255,255,0.15)' }}
              >
                <p className="font-bold text-white text-lg leading-none">{s.n}</p>
                <p style={{ color:'rgba(255,255,255,0.5)', fontSize:11, marginTop:3 }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FIRST-YEAR BANNER ────────────────────────────────── */}
      <div
        className="rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4"
        style={{
          background: 'linear-gradient(135deg, #fffbeb 0%, #fef9ec 100%)',
          border: '1.5px solid #fde68a',
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background:'#fef3c7' }}
          >
            <Star className="w-5 h-5" style={{ color:'#d97706' }} />
          </div>
          <div>
            <p className="font-bold text-[14px]" style={{ color:'#92400e' }}>
              ⭐ Recommended for First-Year Students
            </p>
            <p className="text-xs" style={{ color:'#b45309' }}>
              Start with these four resources to build strong academic foundations
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 sm:ml-auto">
          {firstYearPicks.map(name => (
            <span
              key={name}
              className="px-3 py-1 rounded-full text-xs font-semibold"
              style={{ background:'#fde68a', color:'#92400e' }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      {/* ── CATEGORY FILTER ──────────────────────────────────── */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-semibold mr-1" style={{ color:'#8896a8' }}>Filter:</span>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className="px-4 py-1.5 rounded-full text-xs font-semibold transition-all"
            style={active === cat ? {
              background: 'linear-gradient(135deg, #1a5f4c, #1e7a5f)',
              color:'#fff',
              boxShadow:'0 4px 12px rgba(26,95,76,0.3)',
            } : {
              background:'#f4f6f9',
              color:'#5a6475',
              border:'1.5px solid #e2e5eb',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── RESOURCE CARDS GRID ──────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {filtered.map((res, i) => {
          const isHov = hovered === res.name;
          const CatIcon = categoryIcons[res.category] || BookMarked;
          return (
            <div
              key={res.name}
              className="animate-fade-up"
              style={{ animationDelay: `${i * 0.06}s`, animationFillMode:'both' }}
              onMouseEnter={() => setHovered(res.name)}
              onMouseLeave={() => setHovered(null)}
            >
              <div
                className="rounded-3xl overflow-hidden h-full flex flex-col transition-all duration-300 cursor-pointer"
                style={{
                  background: res.bg,
                  border: `1.5px solid ${isHov ? res.accent + '60' : '#e8eaf0'}`,
                  boxShadow: isHov
                    ? `0 20px 48px ${res.accent}25, 0 4px 16px rgba(0,0,0,0.06)`
                    : '0 2px 8px rgba(15,25,35,0.05)',
                  transform: isHov ? 'translateY(-6px) scale(1.015)' : 'translateY(0) scale(1)',
                }}
              >
                {/* Top accent stripe */}
                <div style={{ height: 4, background: res.accent, width:'100%', flexShrink:0 }} />

                <div className="p-6 flex flex-col flex-1">
                  {/* Icon + badge row */}
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl transition-transform duration-300"
                      style={{
                        background: res.iconBg,
                        transform: isHov ? 'scale(1.1) rotate(-4deg)' : 'scale(1) rotate(0deg)',
                      }}
                    >
                      {res.emoji}
                    </div>
                    {res.tag && (
                      <span
                        className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide"
                        style={{ background: res.tagColor + '18', color: res.tagColor }}
                      >
                        {res.tag}
                      </span>
                    )}
                  </div>

                  {/* Category chip */}
                  <div className="flex items-center gap-1.5 mb-3">
                    <CatIcon className="w-3 h-3" style={{ color: res.accent }} />
                    <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: res.accent }}>
                      {res.category}
                    </span>
                  </div>

                  {/* Name */}
                  <h3 className="font-bold text-[15px] leading-tight mb-1" style={{ color:'#0f1923' }}>
                    {res.name}
                  </h3>

                  {/* Tagline */}
                  <p className="font-semibold text-xs mb-3" style={{ color: res.accent }}>
                    {res.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-xs leading-relaxed flex-1" style={{ color:'#5a6475' }}>
                    {res.description}
                  </p>

                  {/* CTA */}
                  <a
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                    style={{
                      background: isHov
                        ? res.accent
                        : res.accent + '14',
                      color: isHov ? '#fff' : res.accent,
                      boxShadow: isHov ? `0 6px 20px ${res.accent}40` : 'none',
                    }}
                    onClick={e => e.stopPropagation()}
                  >
                    Visit Resource
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── RESEARCH TOOLS SECTION ───────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            icon: '🔬',
            title: 'Research Tools',
            desc: 'Use Google Scholar for finding papers, JSTOR for journal access, and Internet Archive for historical documents.',
            bg: '#faf5ff', border: '#e9d5ff', heading: '#7c3aed',
          },
          {
            icon: '📝',
            title: 'Citation Help',
            desc: 'Use APA 7th edition for social sciences, MLA for humanities, and Chicago style for history papers.',
            bg: '#eff6ff', border: '#bfdbfe', heading: '#1d4ed8',
          },
          {
            icon: '💡',
            title: 'Study Tips',
            desc: 'Combine MIT OCW lectures with OpenStax textbooks for a complete self-study experience in any subject.',
            bg: '#f0fdf4', border: '#bbf7d0', heading: '#15803d',
          },
        ].map((card, i) => (
          <div
            key={i}
            className="rounded-2xl p-5 transition-all duration-200 bento-card"
            style={{ background: card.bg, border: `1.5px solid ${card.border}` }}
          >
            <div className="text-3xl mb-3">{card.icon}</div>
            <h3 className="font-bold text-[14px] mb-2" style={{ color: card.heading }}>{card.title}</h3>
            <p className="text-xs leading-relaxed" style={{ color:'#5a6475' }}>{card.desc}</p>
          </div>
        ))}
      </div>

      {/* ── FOOTER NOTE ──────────────────────────────────────── */}
      <div
        className="rounded-2xl p-5 flex items-center gap-4"
        style={{ background:'#f8f9fc', border:'1.5px solid #e8eaf0' }}
      >
        <FlaskConical className="w-5 h-5 flex-shrink-0" style={{ color:'#8896a8' }} />
        <p className="text-xs" style={{ color:'#8896a8' }}>
          All resources listed are free to access. Some (like JSTOR) may require a free account registration.
          Contact your academic advisor or library staff for premium database access via the university subscription.
        </p>
      </div>
    </div>
  );
}
