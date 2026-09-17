import { User, Images } from 'lucide-react';

interface NavMenuProps {
  onAbout: () => void;
  onGallery: () => void;
  galleryOpen: boolean;
}

export default function NavMenu({ onAbout, onGallery, galleryOpen }: NavMenuProps) {
  return (
    <nav className="flex items-center gap-2">
      <button
        onClick={onAbout}
        className="group flex items-center gap-2 px-4 py-2 rounded-lg glass hover:bg-white/10 transition-all duration-200 text-sm font-display font-medium text-text-main hover:text-accent"
      >
        <User className="w-4 h-4 text-muted group-hover:text-accent transition-colors" strokeWidth={1.5} />
        About
      </button>
      <button
        onClick={onGallery}
        className={`group flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 text-sm font-display font-medium ${
          galleryOpen
            ? 'bg-accent text-bg glow-accent'
            : 'glass hover:bg-white/10 text-text-main hover:text-accent'
        }`}
      >
        <Images className="w-4 h-4 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
        Gallery
      </button>
    </nav>
  );
}
