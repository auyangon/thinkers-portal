import { FileText, Plus, CheckCircle2, Clock, XCircle, Send, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useStudent } from '../../context/StudentContext';
import LoadingSpinner from '../UI/LoadingSpinner';

const STATUS_STYLES = {
  approved: { bg:'#dcfce7', color:'#16a34a', icon: CheckCircle2, label:'Approved' },
  pending:  { bg:'#fef3c7', color:'#d97706', icon: Clock,         label:'Pending'  },
  rejected: { bg:'#fee2e2', color:'#dc2626', icon: XCircle,       label:'Rejected' },
};

const REQUEST_TYPES = [
  'Grade Appeal','Certificate Request','Transcript Request',
  'Leave of Absence','Course Drop/Add','Financial Aid',
  'Dormitory Request','Library Access','Other',
];

export default function Requests() {
  const { requests, currentStudent, loading } = useStudent();
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ type:'', subject:'', detail:'' });

  if (loading) return <LoadingSpinner message="Loading requests…" />;

  const myRequests = requests.filter(r => r.StudentID === currentStudent?.StudentID);
  const sorted     = [...myRequests].sort((a,b) => new Date(b.SubmittedDate||'').getTime() - new Date(a.SubmittedDate||'').getTime());

  const pending  = myRequests.filter(r => r.Status?.toLowerCase() === 'pending').length;
  const approved = myRequests.filter(r => r.Status?.toLowerCase() === 'approved').length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setShowForm(false); setForm({ type:'', subject:'', detail:'' }); }, 2500);
  };

  return (
    <div className="space-y-7 animate-fade-up pb-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-extrabold text-[26px]" style={{ color:'#0f1923' }}>📝 Requests</h1>
          <p style={{ color:'#8896a8', marginTop:4 }}>Submit and track your academic requests</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary"
        >
          <Plus className="w-4 h-4" />
          New Request
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label:'Total',    value: myRequests.length, color:'#6366f1', bg:'#ede9fe' },
          { label:'Pending',  value: pending,            color:'#d97706', bg:'#fef3c7' },
          { label:'Approved', value: approved,           color:'#16a34a', bg:'#dcfce7' },
        ].map(s => (
          <div key={s.label} className="bento-card p-5 text-center">
            <p className="font-extrabold text-2xl" style={{ color: s.color }}>{s.value}</p>
            <p className="text-xs mt-1 font-medium" style={{ color:'#8896a8' }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* New request form */}
      {showForm && (
        <div
          className="bento-card overflow-hidden animate-scale-in"
          style={{ border:'2px solid #1a5f4c40' }}
        >
          {/* Form header */}
          <div
            className="px-6 py-4 flex items-center justify-between"
            style={{ background:'linear-gradient(135deg,#0f2a22,#1a5f4c)', borderBottom:'1px solid rgba(255,255,255,0.1)' }}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background:'rgba(212,175,55,0.2)' }}>
                <FileText className="w-4 h-4" style={{ color:'#d4af37' }} />
              </div>
              <p className="font-bold text-white">New Academic Request</p>
            </div>
            <button
              onClick={() => setShowForm(false)}
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background:'rgba(255,255,255,0.1)', color:'rgba(255,255,255,0.6)' }}
            >
              ×
            </button>
          </div>

          {submitted ? (
            <div className="p-12 text-center">
              <div className="text-5xl mb-3">✅</div>
              <p className="font-bold text-lg" style={{ color:'#16a34a' }}>Request Submitted!</p>
              <p className="text-sm mt-1" style={{ color:'#8896a8' }}>Your request has been received and will be reviewed shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Request type */}
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color:'#0f1923' }}>Request Type</label>
                <div className="relative">
                  <select
                    value={form.type}
                    onChange={e => setForm({...form, type:e.target.value})}
                    className="input-field appearance-none pr-10"
                    required
                  >
                    <option value="">Select request type…</option>
                    {REQUEST_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color:'#8896a8' }} />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color:'#0f1923' }}>Subject</label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={e => setForm({...form, subject:e.target.value})}
                  placeholder="Brief subject of your request"
                  className="input-field"
                  required
                />
              </div>

              {/* Details */}
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color:'#0f1923' }}>Details</label>
                <textarea
                  value={form.detail}
                  onChange={e => setForm({...form, detail:e.target.value})}
                  placeholder="Provide detailed information about your request…"
                  rows={4}
                  className="input-field resize-none"
                  required
                />
              </div>

              <div className="flex gap-3">
                <button type="submit" className="btn-primary flex-1">
                  <Send className="w-4 h-4" />
                  Submit Request
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="btn-ghost px-6"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Requests list */}
      <div className="bento-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background:'#ede9fe' }}>
            <FileText className="w-4 h-4" style={{ color:'#7c3aed' }} />
          </div>
          <h2 className="font-bold text-[15px]" style={{ color:'#0f1923' }}>My Requests</h2>
        </div>

        {sorted.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-5xl mb-3">📋</p>
            <p style={{ color:'#8896a8' }}>No requests submitted yet</p>
            <button
              onClick={() => setShowForm(true)}
              className="btn-primary mt-6"
            >
              <Plus className="w-4 h-4" />
              Submit First Request
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {sorted.map((req, i) => {
              const st  = (req.Status?.toLowerCase() || 'pending') as keyof typeof STATUS_STYLES;
              const sty = STATUS_STYLES[st] || STATUS_STYLES.pending;
              const Icon = sty.icon;

              return (
                <div
                  key={i}
                  className="p-5 rounded-2xl transition-all animate-fade-up"
                  style={{
                    background:'#f8f9fc',
                    border:'1.5px solid #e8eaf0',
                    animationDelay:`${i*0.04}s`,
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = '#fff';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.06)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = '#f8f9fc';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: sty.bg }}
                    >
                      <Icon className="w-5 h-5" style={{ color: sty.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
                        <p className="font-semibold text-sm" style={{ color:'#0f1923' }}>
                          {req.Type || req.Subject || 'Request'}
                        </p>
                        <span
                          className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase"
                          style={{ background: sty.bg, color: sty.color }}
                        >
                          {sty.label}
                        </span>
                      </div>
                      {req.Description && (
                        <p className="text-xs mt-1 line-clamp-2" style={{ color:'#5a6475' }}>{req.Description}</p>
                      )}
                      {req.Response && (
                        <div
                          className="mt-3 p-3 rounded-xl text-xs"
                          style={{ background:'#ede9fe', color:'#7c3aed', border:'1px solid #ddd6fe' }}
                        >
                          <span className="font-semibold">Admin Response: </span>{req.Response}
                        </div>
                      )}
                      <p className="text-[10px] mt-2" style={{ color:'#8896a8' }}>Submitted: {req.SubmittedDate}</p>
                    </div>
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
