import { useState } from 'react';
import ProfileCard from '@/components/ProfileCard';
import NavMenu from '@/components/NavMenu';
import AboutModal from '@/components/AboutModal';
import GalleryPage from '@/components/GalleryPage';
import ContributionCalendar from '@/components/ContributionCalendar';
import NowPlaying from '@/components/NowPlaying';
import SocialLinks from '@/components/SocialLinks';

type Page = 'home' | 'gallery';

function App() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [page, setPage] = useState<Page>('home');

  return (
    <div className="relative w-full h-full overflow-hidden bg-bg">
      {/* Dark background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/bg.jpg)' }}
      />
      {/* Gradient overlay on top of background image */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg/80 via-bg/70 to-bg/90" />
      <div className="absolute inset-0 bg-gradient-to-tr from-bg/85 via-transparent to-bg/80" />

      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-0 w-[40vw] h-[40vh] rounded-full blur-[120px] opacity-20"
          style={{ background: 'radial-gradient(circle, #5eead4, transparent 70%)' }}
        />
        <div
          className="absolute bottom-0 right-0 w-[35vw] h-[35vh] rounded-full blur-[120px] opacity-15"
          style={{ background: 'radial-gradient(circle, #fbbf24, transparent 70%)' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30vw] h-[30vh] rounded-full blur-[100px] opacity-10"
          style={{ background: 'radial-gradient(circle, #5eead4, transparent 70%)' }}
        />
      </div>

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Main layout — desktop: no scroll, fixed positioning */}
      <div className="relative z-10 w-full h-full flex flex-col p-6 md:p-8">
        {/* Top row: profile (left) + nav (right) */}
        <div className="flex items-start justify-between gap-4">
          <div className="animate-fade-in-up">
            <ProfileCard />
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <NavMenu
              onAbout={() => setAboutOpen(true)}
              onGallery={() => setPage('gallery')}
              galleryOpen={page === 'gallery'}
            />
          </div>
        </div>

        {/* Middle: GitHub contribution calendar */}
        <div className="flex-1 flex items-center justify-center min-h-0 py-4">
          <div
            className="glass rounded-2xl px-6 py-5 animate-fade-in"
            style={{ animationDelay: '0.2s' }}
          >
            <ContributionCalendar />
          </div>
        </div>

        {/* Bottom: now playing + social links */}
        <div className="flex flex-col items-center gap-4 pb-2">
          <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <NowPlaying />
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <SocialLinks />
          </div>
        </div>
      </div>

      {/* About modal */}
      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />

      {/* Gallery full page */}
      {page === 'gallery' && <GalleryPage onBack={() => setPage('home')} />}
    </div>
  );
}

export default App;
