import Icon from './Icon';
import Sparkline from './Sparkline';

interface StatCardProps {
  label: string;
  value: string;
  delta: string;
  positive: boolean;
  data?: number[];
}

export default function StatCard({ label, value, delta, positive, data }: StatCardProps) {
  return (
    <div className="stat-card">
      <span className="stat-card-label">{label}</span>
      <span className="stat-card-value mono">{value}</span>
      <span className={`stat-card-delta ${positive ? 'positive' : 'negative'}`}>
        <Icon name={positive ? 'arrowUp' : 'arrowDown'} size={12} className="delta-arrow" />
        {delta}
      </span>
      <Sparkline data={data} color={positive ? 'var(--green)' : 'var(--red)'} />
    </div>
  );
}
