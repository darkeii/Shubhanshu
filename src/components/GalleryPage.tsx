import { useRef, useState, useCallback, useEffect, useMemo } from 'react';
import { ArrowLeft, Move } from 'lucide-react';

const GALLERY_IMAGES = [
  '/gallery/01.jpg',
  '/gallery/02.jpg',
  '/gallery/03.jpg',
  '/gallery/04.jpg',
  '/gallery/05.jpg',
  '/gallery/06.jpg',
  '/gallery/07.jpg',
  '/gallery/08.jpg',
  '/gallery/09.jpg',
  '/gallery/10.jpg',
  '/gallery/11.jpg',
  '/gallery/12.jpg',
];

const TOTAL = GALLERY_IMAGES.length;

// Size of the virtual world that wraps around
const WORLD_W = 2800;
const WORLD_H = 2800;

const TILE_SIZES = [150, 170, 190, 210, 130, 160];

interface TilePos {
  x: number;
  y: number;
  w: number;
  h: number;
  rotation: number;
  imgIndex: number;
}

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

// Place tiles with collision avoidance: try random positions, reject if overlapping existing tiles
function generateTiles(): TilePos[] {
  const rng = seededRandom(7);
  const tiles: TilePos[] = [];
  const padding = 20; // minimum gap between tiles
  const maxAttempts = 200;
  let imgIdx = 0;

  for (let i = 0; i < 24; i++) {
    const sizeIdx = Math.floor(rng() * TILE_SIZES.length);
    const w = TILE_SIZES[sizeIdx];
    const h = w;

    let placed = false;
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const x = rng() * (WORLD_W - w - 100) + 50;
      const y = rng() * (WORLD_H - h - 100) + 50;
      const rotation = (rng() - 0.5) * 14;

      // Check collision with all existing tiles (account for rotation roughly by using bounding box + padding)
      let collides = false;
      for (const t of tiles) {
        const minGap = padding;
        if (
          x < t.x + t.w + minGap &&
          x + w + minGap > t.x &&
          y < t.y + t.h + minGap &&
          y + h + minGap > t.y
        ) {
          collides = true;
          break;
        }
      }

      if (!collides) {
        tiles.push({ x, y, w, h, rotation, imgIndex: imgIdx % TOTAL });
        imgIdx++;
        placed = true;
        break;
      }
    }

    // If we couldn't place after maxAttempts, skip this tile
    if (!placed) continue;
  }

  return tiles;
}

interface GalleryPageProps {
  onBack: () => void;
}

export default function GalleryPage({ onBack }: GalleryPageProps) {
  const offsetRef = useRef({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragState = useRef({
    dragging: false,
    startX: 0,
    startY: 0,
    offsetX: 0,
    offsetY: 0,
  });
  const [showHint, setShowHint] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const tiles = useMemo(() => generateTiles(), []);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('[data-no-drag]')) return;
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    dragState.current = {
      dragging: true,
      startX: e.clientX,
      startY: e.clientY,
      offsetX: offsetRef.current.x,
      offsetY: offsetRef.current.y,
    };
    setShowHint(false);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragState.current.dragging) return;
    const dx = e.clientX - dragState.current.startX;
    const dy = e.clientY - dragState.current.startY;

    let nx = dragState.current.offsetX + dx;
    let ny = dragState.current.offsetY + dy;

    nx = ((nx % WORLD_W) + WORLD_W) % WORLD_W;
    ny = ((ny % WORLD_H) + WORLD_H) % WORLD_H;

    offsetRef.current = { x: nx, y: ny };
    setOffset({ x: nx, y: ny });
  }, []);

  const onPointerUp = useCallback(() => {
    dragState.current.dragging = false;
  }, []);

  useEffect(() => {
    return () => {
      offsetRef.current = { x: 0, y: 0 };
    };
  }, []);

  const renderTiles: React.ReactNode[] = [];
  for (let i = 0; i < tiles.length; i++) {
    const t = tiles[i];
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        const px = t.x + dx * WORLD_W + offset.x - WORLD_W / 2;
        const py = t.y + dy * WORLD_H + offset.y - WORLD_H / 2;
        const isHovered = hoveredIndex === i;
        renderTiles.push(
          <div
            key={`${i}-${dx}-${dy}`}
            className="absolute rounded-xl overflow-hidden transition-all duration-200"
            style={{
              width: t.w,
              height: t.h,
              transform: `translate(${px}px, ${py}px) rotate(${t.rotation}deg)`,
              opacity: isHovered ? 1 : 0.7,
              zIndex: isHovered ? 10 : 1,
              boxShadow: isHovered
                ? '0 0 30px rgba(94,234,212,0.3), 0 8px 24px rgba(0,0,0,0.6)'
                : '0 4px 16px rgba(0,0,0,0.4)',
              border: isHovered
                ? '1px solid rgba(94,234,212,0.5)'
                : '1px solid rgba(255,255,255,0.06)',
              scale: isHovered ? '1.08' : '1',
            }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <img
              src={GALLERY_IMAGES[t.imgIndex]}
              alt=""
              draggable={false}
              className="w-full h-full object-cover pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
          </div>
        );
      }
    }
  }

  return (
    <div className="fixed inset-0 z-40 bg-bg animate-fade-in">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-[30vw] h-[30vh] rounded-full blur-[120px] opacity-10"
          style={{ background: 'radial-gradient(circle, #5eead4, transparent 70%)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[25vw] h-[25vh] rounded-full blur-[120px] opacity-10"
          style={{ background: 'radial-gradient(circle, #fbbf24, transparent 70%)' }}
        />
      </div>

      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        className="absolute inset-0 overflow-hidden cursor-grab active:cursor-grabbing touch-none"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative" style={{ width: WORLD_W, height: WORLD_H }}>
            {renderTiles}
          </div>
        </div>

        {showHint && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-pulse-slow">
            <div className="flex flex-col items-center gap-2 text-muted">
              <Move className="w-8 h-8" strokeWidth={1} />
              <span className="text-xs font-display tracking-wider uppercase">Drag to explore</span>
            </div>
          </div>
        )}
      </div>

      <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 z-20" data-no-drag>
        <button
          onClick={onBack}
          className="flex items-center gap-2 glass rounded-lg px-4 py-2 hover:bg-white/10 transition-all text-sm font-display font-medium text-text-main hover:text-accent"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
          Back
        </button>
        <div className="flex items-center gap-2 glass rounded-lg px-3 py-2">
          <span className="text-xs font-display text-text-main tracking-wide">Gallery</span>
        </div>
      </div>
    </div>
  );
}
