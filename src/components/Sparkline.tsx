import { useMemo } from 'react';

interface Props {
  data?: number[];
  width?: number;
  height?: number;
  color?: string;
}

export default function Sparkline({ data, width = 72, height = 24, color = 'var(--accent)' }: Props) {
  const points = useMemo(() => {
    const d = data || Array.from({ length: 10 }, () => Math.random());
    const min = Math.min(...d);
    const max = Math.max(...d);
    const range = max - min || 1;
    return d.map((v, i) => {
      const x = (i / (d.length - 1)) * width;
      const y = height - ((v - min) / range) * (height - 4) - 2;
      return `${x},${y}`;
    }).join(' ');
  }, [data, width, height]);

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
      <polyline points={points} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
