import Icon from './Icon';
import { VERTICAL_ICONS, VERTICAL_LABELS } from '../data/constants';
import type { Listing as ListingType } from '../types';

interface ListingProps {
  listing: ListingType;
  onBid: (listing: ListingType) => void;
  isWon: boolean;
}

function formatAge(seconds: number): string {
  if (seconds >= 60) return `${Math.floor(seconds / 60)}m ago`;
  return `${seconds}s ago`;
}

export default function Listing({ listing, onBid, isWon }: ListingProps) {
  const expired = listing.expiresIn <= 0;

  return (
    <div className={`listing-card${listing.fresh ? ' fresh' : ''}`}>
      <div className="listing-top">
        <div className="listing-avatar">
          <span className="listing-initials">{listing.initials}</span>
          <span className={`tier-dot tier-${listing.tier}`} />
        </div>

        <div className="listing-main">
          <div className="listing-name-row">
            <span className="listing-name">{listing.name}</span>
            <span className={`tier-badge tier-${listing.tier}`}>{listing.tier}</span>
            {listing.fresh && <span className="fresh-pill">&#9679; New</span>}
          </div>
          <div className="listing-location">
            <Icon name={VERTICAL_ICONS[listing.vertical]} size={14} className="vertical-icon" />
            <span>{VERTICAL_LABELS[listing.vertical]}</span>
            <span className="dot-sep">&middot;</span>
            <span>{listing.city}, {listing.state}</span>
          </div>
        </div>
      </div>

      <div className="listing-tags">
        {listing.tags.map((tag, i) => (
          <span key={i} className="intent-tag">{tag}</span>
        ))}
        <span className="listing-source">{listing.source}</span>
      </div>

      <div className="listing-bottom">
        <div className="listing-meta">
          <span className="meta-item">
            <Icon name="clock" size={13} />
            {formatAge(listing.age)}
          </span>
          <span className="meta-item">
            <Icon name="user" size={13} />
            {listing.bids} bid{listing.bids !== 1 ? 's' : ''}
          </span>
          <span className="meta-item">
            <Icon name="zap" size={13} />
            {Math.floor(listing.expiresIn / 60)}:{String(listing.expiresIn % 60).padStart(2, '0')}
          </span>
        </div>

        <div className="listing-cta">
          <span className="listing-price mono">${listing.price}</span>
          {isWon ? (
            <button className="bid-btn won" disabled>
              <Icon name="check" size={14} /> Won
            </button>
          ) : expired ? (
            <button className="bid-btn sold" disabled>Sold</button>
          ) : (
            <button className="bid-btn" onClick={() => onBid(listing)}>
              Bid
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
