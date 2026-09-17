import { useState, useEffect } from 'react';
import { Code2, Gamepad2, Moon, Circle } from 'lucide-react';

type Status = 'online' | 'sleep' | 'offline';
type Activity = 'coding-vscode' | 'coding-zed' | 'gaming-eldenring' | 'idle';

const activityConfig: Record<
  Activity,
  { icon: typeof Code2; label: string; detail: string; color: string }
> = {
  'coding-vscode': {
    icon: Code2,
    label: 'Coding in VS Code',
    detail: 'Editing portfolio',
    color: '#3b82f6',
  },
  'coding-zed': {
    icon: Code2,
    label: 'Coding in Zed',
    detail: 'Working on a project',
    color: '#f97316',
  },
  'gaming-eldenring': {
    icon: Gamepad2,
    label: 'Playing Elden Ring',
    detail: 'Exploring the Lands Between',
    color: '#fbbf24',
  },
  idle: {
    icon: Circle,
    label: 'Idle',
    detail: '',
    color: '#8888a0',
  },
};

const statusConfig: Record<
  Status,
  { label: string; color: string; dotClass: string }
> = {
  online: { label: 'Online', color: '#5eead4', dotClass: 'bg-accent' },
  sleep: { label: 'Sleep', color: '#a78bfa', dotClass: 'bg-purple-400' },
  offline: { label: 'Offline', color: '#8888a0', dotClass: 'bg-gray-500' },
};

export default function DiscordActivity() {
  const [status, setStatus] = useState<Status>('online');
  const [activity, setActivity] = useState<Activity>('coding-vscode');

  // Cycle through activities for demo
  useEffect(() => {
    const activities: Activity[] = [
      'coding-vscode',
      'coding-zed',
      'gaming-eldenring',
      'coding-vscode',
    ];
    const statuses: Status[] = ['online', 'online', 'online', 'sleep'];
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % activities.length;
      setActivity(activities[i]);
      setStatus(statuses[i]);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const act = activityConfig[activity];
  const sts = statusConfig[status];
  const ActIcon = act.icon;

  return (
    <div className="w-full px-3 py-2.5 rounded-xl glass space-y-2">
      {/* Status row */}
      <div className="flex items-center gap-2">
        <div className="relative">
          <span
            className={`block w-2 h-2 rounded-full ${sts.dotClass} ${status === 'online' ? 'animate-pulse-slow' : ''}`}
          />
          {status === 'online' && (
            <span
              className="absolute inset-0 rounded-full animate-ping opacity-40"
              style={{ background: sts.color }}
            />
          )}
        </div>
        <span className="text-[10px] font-display tracking-wider uppercase text-muted">
          {sts.label}
        </span>
      </div>

      {/* Activity row */}
      <div className="flex items-center gap-2.5">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: `${act.color}1a`, border: `1px solid ${act.color}33` }}
        >
          <ActIcon
            className="w-4 h-4"
            strokeWidth={1.5}
            style={{ color: act.color }}
          />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-[11px] font-medium text-text-main truncate leading-tight">
            {act.label}
          </span>
          {act.detail && (
            <span className="text-[9px] text-muted truncate leading-tight mt-0.5">
              {act.detail}
            </span>
          )}
        </div>
        {activity !== 'idle' && (
          <Moon
            className="w-3 h-3 text-muted/50 ml-auto shrink-0"
            strokeWidth={1.5}
          />
        )}
      </div>
    </div>
  );
}
