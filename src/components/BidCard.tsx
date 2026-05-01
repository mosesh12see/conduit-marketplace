import Icon from './Icon';
import { VERTICAL_ICONS, VERTICAL_LABELS } from '../data/constants';
import type { ActiveBid } from '../types';

interface BidCardProps {
  bid: ActiveBid;
}

export default function BidCard({ bid }: BidCardProps) {
  const statusClass = bid.status === 'leading' ? 'status-leading' : bid.status === 'outbid' ? 'status-outbid' : `status-${bid.status}`;
  const minutes = Math.floor(bid.expiresIn / 60);
  const seconds = bid.expiresIn % 60;
  const progressPct = Math.min(100, (bid.expiresIn / 600) * 100);

  return (
    <div className={`bid-card ${statusClass}`}>
      <div className="bid-card-head">
        <span className="bid-card-name">{bid.name}</span>
        <span className={`tier-badge tier-${bid.tier}`}>{bid.tier}</span>
        <span className={`status-pill ${statusClass}`}>{bid.status}</span>
      </div>

      <div className="bid-card-sub">
        <Icon name={VERTICAL_ICONS[bid.vertical]} size={13} />
        <span>{VERTICAL_LABELS[bid.vertical]}</span>
        <span className="dot-sep">&middot;</span>
        <span>{bid.city}, {bid.state}</span>
      </div>

      <div className="bid-card-body">
        <div className="bid-amount-group">
          <span className="bid-amount mono">${bid.yourBid}</span>
          <span className="bid-amount-label">your bid</span>
        </div>
        {bid.status === 'outbid' && (
          <div className="bid-amount-group top-bid">
            <span className="bid-amount mono">${bid.topBid}</span>
            <span className="bid-amount-label">top bid</span>
          </div>
        )}
      </div>

      <div className="bid-card-timer">
        <div className="timer-bar">
          <div className="timer-fill" style={{ width: `${progressPct}%` }} />
        </div>
        <span className="timer-text mono">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
}
