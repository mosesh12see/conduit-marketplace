interface IconProps {
  name: string;
  size?: number;
  className?: string;
}

const paths: Record<string, string> = {
  sun: 'M10 2v2m0 12v2M4.93 4.93l1.41 1.41m7.32 7.32l1.41 1.41M2 10h2m12 0h2M4.93 15.07l1.41-1.41m7.32-7.32l1.41-1.41M13 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0z',
  home: 'M3 10.5L10 4l7 6.5V17a1 1 0 0 1-1 1h-4v-4H8v4H4a1 1 0 0 1-1-1v-6.5z',
  shield: 'M10 2L3 5.5v4.5c0 4.5 3 8.5 7 10 4-1.5 7-5.5 7-10V5.5L10 2z',
  building: 'M4 18V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14M2 18h16M7 7h2M11 7h2M7 11h2M11 11h2M8 18v-3h4v3',
  grid: 'M3 3h6v6H3zM11 3h6v6h-6zM3 11h6v6H3zM11 11h6v6h-6z',
  briefcase: 'M3 7h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1zM7 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M2 11h16',
  star: 'M10 2l2.47 5.01L18 7.74l-4 3.9.94 5.5L10 14.27 5.06 17.14l.94-5.5-4-3.9 5.53-.73L10 2z',
  bell: 'M14 14.5a4 4 0 0 1-8 0M10 3a1 1 0 0 1 1 1v1a5 5 0 0 1 4 4.9V13l1.5 1.5H3.5L5 13V9.9A5 5 0 0 1 9 5V4a1 1 0 0 1 1-1z',
  settings: 'M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM16.5 10a6.5 6.5 0 0 1-.07.86l1.82 1.43-1.5 2.6-2.1-.73a6.4 6.4 0 0 1-1.5.86L12.8 17H9.8l-.35-2a6.4 6.4 0 0 1-1.5-.86l-2.1.73-1.5-2.6 1.82-1.43A6.5 6.5 0 0 1 6.1 10c0-.29.02-.58.07-.86L4.35 7.71l1.5-2.6 2.1.73a6.4 6.4 0 0 1 1.5-.86L9.8 3h3l.35 2a6.4 6.4 0 0 1 1.5.86l2.1-.73 1.5 2.6-1.82 1.43c.05.28.07.57.07.86z',
  search: 'M8.5 14a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 13l4 4',
  filter: 'M2 3h16M5 8h10M7 13h6',
  zap: 'M11 2L4 11h5.5l-1 7L16 9h-5.5L11 2z',
  plus: 'M10 4v12M4 10h12',
  check: 'M4 10l4 4 8-8',
  arrowUp: 'M10 16V4M5 9l5-5 5 5',
  arrowDown: 'M10 4v12M5 11l5 5 5-5',
  clock: 'M10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM10 6v4l2.5 2.5',
  eye: 'M2 10s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6zM10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  x: 'M5 5l10 10M15 5L5 15',
  user: 'M10 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM4 17.5c0-3 2.7-5 6-5s6 2 6 5',
  phone: 'M5 2.5h3l1.5 4L7.5 8.5a9 9 0 0 0 4 4L13.5 10.5l4 1.5v3c0 1-1 2-2 2C8 17 3 12 3 4.5c0-1 1-2 2-2z',
  mail: 'M3 5h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM2 5l8 6 8-6',
  pin: 'M10 17.5c-4-4.5-6-7-6-9.5a6 6 0 0 1 12 0c0 2.5-2 5-6 9.5zM10 10.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  trending: 'M3 15l4-4 3 3 7-8M13 6h4v4',
  sparkle: 'M10 2l1.5 5.5L17 9l-5.5 1.5L10 16l-1.5-5.5L3 9l5.5-1.5L10 2z',
  activity: 'M2 10h3l2-6 3 12 2-6h6',
  heart: 'M10 16.5s-7-4.5-7-8.5a3.5 3.5 0 0 1 7 0 3.5 3.5 0 0 1 7 0c0 4-7 8.5-7 8.5z',
};

export default function Icon({ name, size = 20, className = '' }: IconProps) {
  const d = paths[name];
  if (!d) return null;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d={d} />
    </svg>
  );
}
