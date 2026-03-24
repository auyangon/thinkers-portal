import { Zap, CheckCircle2, Clock, AlertCircle, Award, Filter } from 'lucide-react';
import { useState } from 'react';
import { useStudent } from '../../context/StudentContext';
import LoadingSpinner from '../UI/LoadingSpinner';

const STATUS_STYLES: Record<string, { bg:string; color:string; icon:typeof CheckCircle2; label:string }> = {
  completed: { bg:'#dcfce7', color:'#16a34a', icon: CheckCircle2, label:'Completed' },
  graded:    { bg:'#dbeafe', color:'#2563eb', icon: Award,         label:'Graded'    },
  pending:   { bg:'#fef3c7', color:'#d97706', icon: Clock,         label:'Pending'   },
  overdue:   { bg:'#fee2e2', color:'#dc2626', icon: AlertCircle,   label:'Overdue'   },
};

const TYPE_COLORS: Record<string, { bg:string; color:string }> = {
  assignment: { bg:'#ede9fe', color:'#7c3aed' },
  project:    { bg:'#dcfce7', color:'#15803d' },
  quiz:       { bg:'#fef3c7', color:'#d97706' },
  exam:       { bg:'#fee2e2', color:'#dc2626' },
  lab:        { bg:'#e0f2fe', color:'#0369a1' },
};

export default function Quests() {
  const { quests, studentQuests, currentStudent, loading } = useStudent();
  const [filter, setFilter] = useState<string>('all');
  if (loading) return <LoadingSpinner message="Loading quests…" />;

  const myQuests = studentQuests.filter(sq => sq.StudentID === currentStudent?.StudentID);
  const totalPts = myQuests.filter(sq => ['completed','graded'].includes(sq.Status?.toLowerCase()))
    .reduce((s, sq) => s + (parseInt(sq.Score) || 0), 0);

  const enriched = quests
    .filter(q => myQuests.some(mq => mq.QuestID === q.QuestID))
    .map(q => ({
      ...q,
      myData: myQuests.find(mq => mq.QuestID === q.QuestID),
    }))
    .filter(q => filter === 'all' || q.myData?.Status?.toLowerCase() === filter);

  const stats = [
    { label:'Total', value: myQuests.length, color:'#6366f1', bg:'#ede9fe' },
    { label:'Completed', value: myQuests.filter(s=>['completed','graded'].includes(s.Status?.toLowerCase())).length, color:'#16a34a', bg:'#dcfce7' },
    { label:'Pending', value: myQuests.filter(s=>s.Status?.toLowerCase()==='pending').length, color:'#d97706', bg:'#fef3c7' },
    { label:'Points Earned', value: totalPts, color:'#0ea5e9', bg:'#e0f2fe' },
  ];

  return (
    <div className="space-y-7 animate-fade-up pb-4">
      {/* Header */}
      <div>
        <h1 className="font-extrabold text-[26px]" style={{ color:'#0f1923' }}>⚔️ Quests</h1>
        <p style={{ color:'#8896a8', marginTop:4 }}>Track your assignments, projects, and exams</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="bento-card p-5">
            <p className="font-extrabold text-2xl" style={{ color: s.color }}>{s.value}</p>
            <p className="text-xs mt-1.5 font-medium" style={{ color:'#8896a8' }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2 flex-wrap">
        <Filter className="w-4 h-4" style={{ color:'#8896a8' }} />
        {['all','pending','completed','graded','overdue'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-4 py-1.5 rounded-full text-xs font-semibold capitalize transition-all"
            style={filter === f ? {
              background:'linear-gradient(135deg,#1a5f4c,#1e7a5f)',
              color:'#fff',
              boxShadow:'0 4px 12px rgba(26,95,76,0.3)',
            } : {
              background:'#f4f6f9',
              color:'#5a6475',
              border:'1.5px solid #e2e5eb',
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Quest list */}
      {enriched.length === 0 ? (
        <div className="bento-card p-16 text-center">
          <p className="text-5xl mb-3">⚔️</p>
          <p style={{ color:'#8896a8' }}>No quests found for this filter</p>
        </div>
      ) : (
        <div className="space-y-3">
          {enriched.map((quest, i) => {
            const status = (quest.myData?.Status?.toLowerCase() || 'pending') as keyof typeof STATUS_STYLES;
            const style  = STATUS_STYLES[status] || STATUS_STYLES.pending;
            const StatusIcon = style.icon;
            const typeStyle = TYPE_COLORS[(quest.Type?.toLowerCase() || 'assignment')] || TYPE_COLORS.assignment;

            return (
              <div
                key={quest.QuestID}
                className="bento-card p-5 flex flex-col sm:flex-row sm:items-center gap-4 animate-fade-up"
                style={{ animationDelay:`${i*0.04}s` }}
              >
                {/* Status indicator */}
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: style.bg }}
                >
                  <StatusIcon className="w-5 h-5" style={{ color: style.color }} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span
                      className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-md"
                      style={{ background: typeStyle.bg, color: typeStyle.color }}
                    >
                      {quest.Type}
                    </span>
                    <span
                      className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-md"
                      style={{ background: style.bg, color: style.color }}
                    >
                      {style.label}
                    </span>
                  </div>
                  <p className="font-semibold text-sm" style={{ color:'#0f1923' }}>{quest.Title}</p>
                  {quest.Description && (
                    <p className="text-xs mt-0.5 line-clamp-1" style={{ color:'#8896a8' }}>{quest.Description}</p>
                  )}
                  {quest.myData?.Feedback && (
                    <p className="text-xs mt-1 italic" style={{ color:'#6366f1' }}>
                      💬 "{quest.myData.Feedback}"
                    </p>
                  )}
                </div>

                <div className="flex sm:flex-col items-center sm:items-end gap-3 flex-shrink-0">
                  <div
                    className="px-3 py-1.5 rounded-xl text-center"
                    style={{ background:'linear-gradient(135deg,#9333ea18,#6366f118)' }}
                  >
                    <p className="font-bold text-sm" style={{ color:'#7c3aed' }}>
                      {quest.myData?.Score || quest.Points} pts
                    </p>
                  </div>
                  <p className="text-[11px]" style={{ color:'#8896a8' }}>
                    📅 {quest.Deadline}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* XP Banner */}
      <div
        className="rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-5"
        style={{
          background:'linear-gradient(135deg, #0f2a22 0%, #1a5f4c 100%)',
        }}
      >
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background:'rgba(212,175,55,0.2)', border:'1px solid rgba(212,175,55,0.3)' }}>
          <Zap className="w-7 h-7" style={{ color:'#d4af37' }} />
        </div>
        <div>
          <p className="font-bold text-white text-lg">⚡ {totalPts} Experience Points Earned</p>
          <p style={{ color:'rgba(255,255,255,0.55)', fontSize:13, marginTop:4 }}>
            Complete more quests to level up your academic rank. You're doing great, keep going!
          </p>
        </div>
        <div
          className="ml-auto px-5 py-2.5 rounded-xl font-bold text-sm flex-shrink-0"
          style={{ background:'rgba(212,175,55,0.2)', color:'#d4af37', border:'1px solid rgba(212,175,55,0.3)' }}
        >
          Rank: {totalPts >= 500 ? '🥇 Gold' : totalPts >= 200 ? '🥈 Silver' : '🥉 Bronze'}
        </div>
      </div>
    </div>
  );
}
