interface Props { message?: string; }

export default function LoadingSpinner({ message = 'Loading…' }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
      {/* Animated ring */}
      <div className="relative w-16 h-16">
        <svg className="w-full h-full animate-spin" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="28" stroke="#e8eaf0" strokeWidth="4" />
          <circle
            cx="32" cy="32" r="28"
            stroke="url(#spinGrad)" strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="60 116"
          />
          <defs>
            <linearGradient id="spinGrad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1a5f4c" />
              <stop offset="100%" stopColor="#d4af37" />
            </linearGradient>
          </defs>
        </svg>
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ fontSize: 22 }}
        >
          🎓
        </div>
      </div>

      {/* Skeleton bars */}
      <div className="space-y-2 w-48">
        <div className="skeleton h-3 w-full" />
        <div className="skeleton h-3 w-3/4 mx-auto" />
        <div className="skeleton h-3 w-1/2 mx-auto" />
      </div>

      <p className="text-sm font-medium" style={{ color:'#8896a8' }}>{message}</p>
    </div>
  );
}
