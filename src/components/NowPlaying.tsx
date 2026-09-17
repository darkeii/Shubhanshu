import { Music2 } from 'lucide-react';

export default function NowPlaying() {
  return (
    <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl glass">
      {/* Animated bars */}
      <div className="flex items-end gap-0.5 h-4">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-0.5 rounded-full bg-accent"
            style={{
              animation: `barBounce 1s ease-in-out ${i * 0.15}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="flex flex-col">
        <span className="text-[9px] uppercase tracking-widest text-muted leading-none mb-0.5">
          Listening to
        </span>
        <span className="font-hand text-lg text-text-main leading-tight">
          <span className="text-accent">Midnight City</span>
          <span className="text-muted mx-1.5">—</span>
          <span className="text-text-main/80">M83</span>
        </span>
      </div>

      <Music2 className="w-3.5 h-3.5 text-accent/60 ml-1" strokeWidth={1.5} />

      <style>{`
        @keyframes barBounce {
          0%, 100% { height: 30%; opacity: 0.5; }
          50% { height: 100%; opacity: 1; }
        }
      `}</style>
    </div>
  );
}
