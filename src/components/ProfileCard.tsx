import { Cake, Mail, MessageCircle } from 'lucide-react';
import DiscordActivity from '@/components/DiscordActivity';

const infoItems = [
  { icon: Cake, label: 'Birthday', value: '19 January' },
  { icon: Mail, label: 'Mail', value: 'mail@darkeii.dev' },
  { icon: MessageCircle, label: 'Discord', value: 'itzzdark' },
];

export default function ProfileCard() {
  return (
    <div className="flex flex-col items-center gap-3 select-none w-44">
      {/* Profile picture — doubled radius (128px diameter) */}
      <div className="relative">
        <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-accent/40 to-accent-warm/30 blur-md opacity-60" />
        <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-white/10 ring-1 ring-accent/30">
          <img
            src="/gallery/01.jpg"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-accent border-2 border-bg animate-pulse-slow" />
      </div>

      {/* Info rows — no copy, just display */}
      <div className="flex flex-col gap-1.5 w-full">
        {infoItems.map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-left"
          >
            <Icon className="w-3.5 h-3.5 text-accent shrink-0" strokeWidth={1.5} />
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] uppercase tracking-wider text-muted leading-none">
                {label}
              </span>
              <span className="text-xs text-text-main font-medium truncate">
                {value}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Discord activity widget */}
      <DiscordActivity />
    </div>
  );
}
