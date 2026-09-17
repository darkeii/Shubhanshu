import { useMemo } from 'react';

const WEEKS = 20;
const DAYS = 7;

// GitHub-style contribution colors
const LEVELS = [
  'rgba(255,255,255,0.04)', // 0 - no contributions
  'rgba(94, 234, 212, 0.25)', // 1
  'rgba(94, 234, 212, 0.45)', // 2
  'rgba(94, 234, 212, 0.65)', // 3
  'rgba(94, 234, 212, 0.85)', // 4
];

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function generateGrid(): number[][] {
  const rng = seededRandom(137);
  const grid: number[][] = [];
  for (let w = 0; w < WEEKS; w++) {
    const col: number[] = [];
    for (let d = 0; d < DAYS; d++) {
      const r = rng();
      // Weight toward fewer contributions
      let level = 0;
      if (r > 0.85) level = 4;
      else if (r > 0.7) level = 3;
      else if (r > 0.5) level = 2;
      else if (r > 0.3) level = 1;
      col.push(level);
    }
    grid.push(col);
  }
  return grid;
}

const MONTH_LABELS = ['Jun', 'Jul', 'Aug', 'Sep'];
const DAY_LABELS = ['M', 'W', 'F'];

export default function ContributionCalendar() {
  const grid = useMemo(() => generateGrid(), []);
  const totalContribs = useMemo(
    () => grid.flat().reduce((sum, level) => sum + level * 2, 0),
    [grid]
  );

  return (
    <div className="flex flex-col items-center gap-3 select-none">
      <div className="flex items-center justify-between w-full px-1">
        <span className="text-[10px] font-display tracking-wider uppercase text-muted">
          {totalContribs} contributions
        </span>
        <div className="flex items-center gap-1">
          <span className="text-[9px] text-muted">Less</span>
          {LEVELS.map((color, i) => (
            <span
              key={i}
              className="w-2 h-2 rounded-[3px]"
              style={{ background: color }}
            />
          ))}
          <span className="text-[9px] text-muted">More</span>
        </div>
      </div>

      <div className="flex gap-2">
        {/* Day labels */}
        <div className="flex flex-col gap-[3px] pt-4">
          {DAY_LABELS.map((d, i) => (
            <span
              key={i}
              className="text-[8px] text-muted h-[10px] leading-[10px] text-right w-2"
            >
              {d}
            </span>
          ))}
        </div>

        <div className="overflow-hidden">
          {/* Month labels */}
          <div className="flex gap-[3px] mb-1">
            {MONTH_LABELS.map((m, i) => (
              <span
                key={i}
                className="text-[8px] text-muted"
                style={{ width: `calc((${WEEKS / MONTH_LABELS.length} * (10px + 3px)))` }}
              >
                {m}
              </span>
            ))}
          </div>

          {/* Grid */}
          <div className="flex gap-[3px]">
            {grid.map((col, w) => (
              <div key={w} className="flex flex-col gap-[3px]">
                {col.map((level, d) => (
                  <div
                    key={d}
                    className="w-[10px] h-[10px] rounded-[2px] transition-all duration-200 hover:ring-1 hover:ring-accent/40 hover:scale-125"
                    style={{ background: LEVELS[level] }}
                    title={`${level * 2} contributions`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <span className="text-[9px] text-muted/60 font-display tracking-wide">
        GitHub Activity
      </span>
    </div>
  );
}
