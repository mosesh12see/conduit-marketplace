import { useState, useEffect } from 'react';
import Icon from './Icon';
import { VERTICAL_LABELS } from '../data/constants';
import type { Listing } from '../types';

interface BidModalProps {
  listing: Listing | null;
  onClose: () => void;
  onSubmit: (listing: Listing, amount: number) => void;
}

export default function BidModal({ listing, onClose, onSubmit }: BidModalProps) {
  const [bidAmount, setBidAmount] = useState(0);

  useEffect(() => {
    if (listing) setBidAmount(listing.price);
  }, [listing]);

  if (!listing) return null;

  const lastFour = listing.id.slice(-4);
  const minutes = Math.floor(listing.expiresIn / 60);
  const seconds = listing.expiresIn % 60;
  const isUrgent = listing.expiresIn < 60;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <div className="modal-title-row">
            <span className="modal-name">{listing.name}</span>
            <span className={`tier-badge tier-${listing.tier}`}>{listing.tier}</span>
          </div>
          <span className="modal-sub">
            {VERTICAL_LABELS[listing.vertical]} &middot; {listing.city}, {listing.state} &middot; {listing.source}
          </span>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <Icon name="x" size={18} />
          </button>
        </div>

        <div className="modal-body">
          <div className="masked-details">
            <div className="detail-item">
              <Icon name="phone" size={14} />
              <span className="detail-label">Phone</span>
              <span className="detail-value mono">+1 (***) ***-{lastFour}</span>
            </div>
            <div className="detail-item">
              <Icon name="mail" size={14} />
              <span className="detail-label">Email</span>
              <span className="detail-value mono">****@****.com</span>
            </div>
            <div className="detail-item">
              <Icon name="star" size={14} />
              <span className="detail-label">Quality score</span>
              <span className="detail-value mono">{listing.score}/100</span>
            </div>
            <div className="detail-item">
              <Icon name="clock" size={14} />
              <span className="detail-label">Contact window</span>
              <span className="detail-value mono">{listing.contactWindow} min</span>
            </div>
          </div>

          <div className="modal-callout">
            <Icon name="sparkle" size={16} className="callout-icon" />
            <span>
              This lead has a <strong>{listing.score}% quality score</strong> and is actively comparing providers.
              Winning now gives you first contact advantage.
            </span>
          </div>

          <div className="bid-input-row">
            <div className="bid-input-group">
              <span className="bid-currency">$</span>
              <input
                type="number"
                className="bid-input mono"
                value={bidAmount}
                onChange={(e) => setBidAmount(Number(e.target.value))}
                min={1}
              />
            </div>
            <button className="quick-btn" onClick={() => setBidAmount((v) => v + 5)}>+5</button>
            <button className="quick-btn" onClick={() => setBidAmount((v) => v + 10)}>+10</button>
          </div>

          <div className="bid-info">
            <div className="bid-info-item">
              <span className="bid-info-label">Asking price</span>
              <span className="bid-info-value mono">${listing.price}</span>
            </div>
            <div className="bid-info-item">
              <span className="bid-info-label">Other bidders</span>
              <span className="bid-info-value">{listing.bids}</span>
            </div>
            <div className="bid-info-item">
              <span className="bid-info-label">Auto-bid cap</span>
              <span className="bid-info-value mono">--</span>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <div className={`expiry-indicator${isUrgent ? ' urgent' : ''}`}>
            <span className={`expiry-dot${isUrgent ? ' pulse urgent' : ' pulse'}`} />
            <span className="expiry-text mono">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
          </div>
          <div className="modal-actions">
            <button className="btn-secondary" onClick={onClose}>Cancel</button>
            <button
              className="btn-primary"
              onClick={() => onSubmit(listing, bidAmount)}
            >
              Place bid &middot; ${bidAmount}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
