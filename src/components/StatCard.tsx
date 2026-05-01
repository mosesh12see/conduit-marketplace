import Sparkline from './Sparkline';
import Icon from './Icon';

interface Props {
  label: string;
  value: string;
  delta: string;
  positive: boolean;
  data?: number[];
}

export default function StatCard({ label, value, delta, positive }: Props) {
  return (
    <div className="stat-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div className="stat-label">{label}</div>
          <div className="stat-value mono">{value}</div>
          <div className={`stat-delta ${positive ? 'up' : 'down'}`}>
            <Icon name={positive ? 'arrowUp' : 'arrowDown'} size={12} />
            {delta}
          </div>
        </div>
        <div className="stat-sparkline">
          <Sparkline width={72} height={24} color={positive ? 'var(--accent)' : 'var(--ink-4)'} />
        </div>
      </div>
    </div>
  );
}
