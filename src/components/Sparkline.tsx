import { useMemo } from 'react';

interface SparklineProps {
  data?: number[];
  width?: number;
  height?: number;
  color?: string;
}

function randomWalk(count: number): number[] {
  const pts: number[] = [50];
  for (let i = 1; i < count; i++) {
    const delta = (Math.random() - 0.45) * 20;
    pts.push(Math.max(5, Math.min(95, pts[i - 1] + delta)));
  }
  return pts;
}

export default function Sparkline({
  data,
  width = 80,
  height = 28,
  color = 'var(--accent)',
}: SparklineProps) {
  const points = useMemo(() => {
    const raw = data && data.length > 1 ? data : randomWalk(8 + Math.floor(Math.random() * 5));
    const min = Math.min(...raw);
    const max = Math.max(...raw);
    const range = max - min || 1;
    const padY = 2;
    const usableH = height - padY * 2;

    return raw
      .map((v, i) => {
        const x = (i / (raw.length - 1)) * width;
        const y = padY + usableH - ((v - min) / range) * usableH;
        return `${x},${y}`;
      })
      .join(' ');
  }, [data, width, height]);

  return (
    <svg width={width} height={height} className="sparkline">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
