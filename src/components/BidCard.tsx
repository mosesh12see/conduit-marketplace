import Icon from './Icon';
import type { ActiveBid } from '../types';
import { VERTICAL_LABELS, VERTICAL_ICONS } from '../data/constants';

interface Props {
  bid: ActiveBid;
}

function formatCountdown(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

export default function BidCard({ bid }: Props) {
  const maxTime = 600;
  const pct = Math.max(0, Math.min(100, (bid.expiresIn / maxTime) * 100));
  const urgent = bid.expiresIn < 60;

  return (
    <div className={`bid-card ${bid.status}`}>
      <div className="bid-card-head">
        <span className="bid-card-name">
          {bid.name}
          <span className={`tier-badge ${bid.tier}`}>{bid.tier}</span>
        </span>
        <span className={`bid-card-status ${bid.status}`}>{bid.status}</span>
      </div>
      <div className="bid-card-sub">
        <Icon name={VERTICAL_ICONS[bid.vertical]} size={13} />
        {VERTICAL_LABELS[bid.vertical]} · {bid.city}
      </div>
      <div className="bid-card-body">
        <span className="bid-card-amount mono">${bid.yourBid}</span>
        <span className="bid-card-label">your bid</span>
        {bid.status === 'outbid' && (
          <span className="bid-card-label">· top: <span className="mono" style={{ fontWeight: 600 }}>${bid.topBid}</span></span>
        )}
      </div>
      <div className="bid-card-timer">
        <div className="bid-bar">
          <div className={`bid-bar-fill ${bid.status}`} style={{ width: `${pct}%` }} />
        </div>
        <div className={`bid-countdown${urgent ? ' urgent' : ''}`}>{formatCountdown(bid.expiresIn)}</div>
      </div>
    </div>
  );
}
