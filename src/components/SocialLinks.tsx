import { Github, Twitter, Linkedin, Instagram, Globe, Mail } from 'lucide-react';

const socials = [
  { icon: Github, label: 'GitHub', url: 'https://github.com/' },
  { icon: Twitter, label: 'Twitter', url: 'https://twitter.com/' },
  { icon: Instagram, label: 'Instagram', url: 'https://instagram.com/' },
  { icon: Linkedin, label: 'LinkedIn', url: 'https://linkedin.com/' },
  { icon: Globe, label: 'Website', url: 'https://darkeii.dev' },
  { icon: Mail, label: 'Email', url: 'mailto:mail@darkeii.dev' },
];

export default function SocialLinks() {
  return (
    <div className="flex items-center gap-3">
      {socials.map(({ icon: Icon, label, url }) => (
        <a
          key={label}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="group relative w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-accent/10 transition-all duration-300 hover:scale-110 hover:-translate-y-0.5"
        >
          <Icon
            className="w-4 h-4 text-muted group-hover:text-accent transition-colors"
            strokeWidth={1.5}
          />
          <div className="absolute -inset-0.5 rounded-full bg-accent/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
          {/* Tooltip */}
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-display text-text-main bg-bg-soft px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-border">
            {label}
          </span>
        </a>
      ))}
    </div>
  );
}
