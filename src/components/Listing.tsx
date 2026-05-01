import Icon from './Icon';
import type { Listing as ListingType } from '../types';
import { VERTICAL_LABELS, VERTICAL_ICONS } from '../data/constants';

interface Props {
  listing: ListingType;
  onBid: (listing: ListingType) => void;
  isWon: boolean;
}

function formatAge(seconds: number): string {
  if (seconds < 60) return `${seconds}s ago`;
  return `${Math.floor(seconds / 60)}m ago`;
}

function formatExpiry(seconds: number): string {
  if (seconds <= 0) return 'expired';
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

export default function ListingCard({ listing, onBid, isWon }: Props) {
  const expired = listing.expiresIn <= 0;
  const cardClass = `listing-card${listing.fresh ? ' fresh' : ''}${expired || isWon ? '' : ''}${expired && !isWon ? ' sold' : ''}`;

  return (
    <div className={cardClass} onClick={() => !expired && !isWon && onBid(listing)}>
      <div className="listing-avatar">
        {listing.initials}
        <span className={`tier-dot ${listing.tier}`} />
      </div>

      <div className="listing-main">
        <div className="listing-row1">
          <span className="listing-name">{listing.name}</span>
          <span className={`tier-badge ${listing.tier}`}>{listing.tier}</span>
          {listing.fresh && (
            <span className="new-pill"><span className="new-dot" />New</span>
          )}
          <span className="listing-loc">
            · <Icon name={VERTICAL_ICONS[listing.vertical]} size={13} /> {VERTICAL_LABELS[listing.vertical]} · {listing.city}, {listing.state}
          </span>
        </div>
        <div className="listing-row2">
          {listing.tags.map((tag, i) => (
            <span key={i} className="intent-tag">{tag}</span>
          ))}
          <span className="source-tag">via {listing.source}</span>
        </div>
      </div>

      <div className="listing-meta">
        <span className="listing-age mono">{formatAge(listing.age)}</span>
        <span className="listing-bids"><Icon name="user" size={12} /> {listing.bids} bid{listing.bids !== 1 ? 's' : ''}</span>
        <span className="listing-expires"><Icon name="clock" size={12} /> {formatExpiry(listing.expiresIn)}</span>
      </div>

      <div className="listing-cta">
        <span className="cta-label">Asking</span>
        <span className="cta-price mono">${listing.price}</span>
        {isWon ? (
          <button className="bid-btn won">✓ Won</button>
        ) : expired ? (
          <button className="bid-btn sold" disabled>Sold</button>
        ) : (
          <button className="bid-btn" onClick={(e) => { e.stopPropagation(); onBid(listing); }}>Place bid</button>
        )}
      </div>
    </div>
  );
}
