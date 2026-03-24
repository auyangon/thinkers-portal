import { Megaphone, Search, Bell, AlertTriangle, Info } from 'lucide-react';
import { useState } from 'react';
import { useStudent } from '../../context/StudentContext';
import LoadingSpinner from '../UI/LoadingSpinner';

const PRIORITY_CONFIG = {
  high:   { bg:'#fef2f2', border:'#fecaca', color:'#dc2626', icon: AlertTriangle, label:'🔴 Urgent', barColor:'#ef4444' },
  medium: { bg:'#fffbeb', border:'#fde68a', color:'#d97706', icon: Bell,          label:'🟡 Notice', barColor:'#f59e0b' },
  low:    { bg:'#f0f9ff', border:'#bae6fd', color:'#0369a1', icon: Info,          label:'🔵 Info',   barColor:'#0ea5e9' },
};

export default function Announcements() {
  const { announcements, loading } = useStudent();
  const [search, setSearch]        = useState('');
  const [priFilter, setPriFilter]  = useState<string>('all');
  if (loading) return <LoadingSpinner message="Loading announcements…" />;

  const sorted = [...announcements]
    .sort((a,b) => new Date(b.Date).getTime() - new Date(a.Date).getTime());

  const filtered = sorted.filter(a => {
    const matchSearch = !search || a.Title?.toLowerCase().includes(search.toLowerCase()) ||
      a.Content?.toLowerCase().includes(search.toLowerCase());
    const matchPri = priFilter === 'all' || a.Priority?.toLowerCase() === priFilter;
    return matchSearch && matchPri;
  });

  const urgentCount = announcements.filter(a => a.Priority?.toLowerCase() === 'high').length;

  return (
    <div className="space-y-7 animate-fade-up pb-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-extrabold text-[26px]" style={{ color:'#0f1923' }}>📢 Announcements</h1>
          <p style={{ color:'#8896a8', marginTop:4 }}>{announcements.length} total · {urgentCount} urgent</p>
        </div>
        {urgentCount > 0 && (
          <div
            className="flex items-center gap-3 px-5 py-3 rounded-2xl"
            style={{ background:'#fef2f2', border:'1.5px solid #fecaca' }}
          >
            <AlertTriangle className="w-5 h-5" style={{ color:'#dc2626' }} />
            <p className="text-sm font-semibold" style={{ color:'#dc2626' }}>
              {urgentCount} urgent announcement{urgentCount > 1 ? 's' : ''}
            </p>
          </div>
        )}
      </div>

      {/* Search + filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color:'#8896a8' }} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search announcements…"
            className="input-field"
            style={{ paddingLeft: 42 }}
          />
        </div>
        <div className="flex gap-2">
          {['all','high','medium','low'].map(p => (
            <button
              key={p}
              onClick={() => setPriFilter(p)}
              className="px-4 py-2 rounded-xl text-xs font-semibold capitalize transition-all"
              style={priFilter === p ? {
                background:'linear-gradient(135deg,#1a5f4c,#1e7a5f)', color:'#fff',
                boxShadow:'0 4px 12px rgba(26,95,76,0.3)',
              } : {
                background:'#f4f6f9', color:'#5a6475', border:'1.5px solid #e2e5eb',
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="bento-card p-16 text-center">
          <Megaphone className="w-12 h-12 mx-auto mb-3" style={{ color:'#e2e5eb' }} />
          <p style={{ color:'#8896a8' }}>No announcements found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((ann, i) => {
            const pri    = (ann.Priority?.toLowerCase() || 'low') as keyof typeof PRIORITY_CONFIG;
            const config = PRIORITY_CONFIG[pri] || PRIORITY_CONFIG.low;
            const Icon   = config.icon;

            return (
              <div
                key={i}
                className="rounded-2xl overflow-hidden transition-all duration-200 animate-fade-up"
                style={{
                  background: config.bg,
                  border: `1.5px solid ${config.border}`,
                  animationDelay:`${i*0.04}s`,
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateX(4px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 24px ${config.barColor}18`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateX(0)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                <div className="flex">
                  {/* Left bar */}
                  <div style={{ width:4, background: config.barColor, flexShrink:0 }} />
                  <div className="flex-1 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span
                            className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-md"
                            style={{ background: config.barColor + '20', color: config.color }}
                          >
                            {config.label}
                          </span>
                          <span className="text-[10px]" style={{ color:'#8896a8' }}>{ann.Date}</span>
                        </div>
                        <h3 className="font-bold text-[15px] leading-tight" style={{ color:'#0f1923' }}>
                          {ann.Title}
                        </h3>
                        <p className="text-sm mt-2 leading-relaxed" style={{ color:'#5a6475' }}>
                          {ann.Content}
                        </p>
                        {ann.Author && (
                          <p className="text-xs mt-3 font-medium" style={{ color: config.color }}>
                            — {ann.Author}
                          </p>
                        )}
                      </div>
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: config.border }}
                      >
                        <Icon className="w-5 h-5" style={{ color: config.color }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
