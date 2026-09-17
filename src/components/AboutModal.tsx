import { X, Wrench } from 'lucide-react';

interface AboutModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AboutModal({ open, onClose }: AboutModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative glass-strong rounded-2xl p-8 max-w-sm w-full text-center animate-slide-down"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 rounded-lg hover:bg-white/10 transition-colors"
        >
          <X className="w-4 h-4 text-muted hover:text-text-main" strokeWidth={1.5} />
        </button>
        <div className="w-14 h-14 rounded-full bg-accent-warm/10 flex items-center justify-center mx-auto mb-4 ring-1 ring-accent-warm/30">
          <Wrench className="w-6 h-6 text-accent-warm animate-pulse-slow" strokeWidth={1.5} />
        </div>
        <h2 className="font-display text-xl font-semibold text-text-main mb-2">
          Under Maintenance
        </h2>
        <p className="text-sm text-muted leading-relaxed">
          This section is being worked on. Check back soon — something cool is coming.
        </p>
      </div>
    </div>
  );
}
