import { useState } from 'react';
import Icon from './Icon';
import type { Listing } from '../types';
import { VERTICAL_LABELS } from '../data/constants';

interface Props {
  listing: Listing | null;
  onClose: () => void;
  onSubmit: (listing: Listing, amount: number) => void;
}

function formatExpiry(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

export default function BidModal({ listing, onClose, onSubmit }: Props) {
  const [bidAmount, setBidAmount] = useState(0);

  if (!listing) return null;

  // Reset bid amount when listing changes
  const price = listing.price;
  if (bidAmount === 0 || bidAmount < price) {
    setTimeout(() => setBidAmount(price), 0);
  }

  const urgent = listing.expiresIn < 60;
  const closeRate = Math.round(listing.score * 0.4);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <div className="modal-title">
            {listing.name}
            <span className={`tier-badge ${listing.tier}`}>{listing.tier}</span>
          </div>
          <div className="modal-sub">
            {VERTICAL_LABELS[listing.vertical]} lead · {listing.city}, {listing.state} · via {listing.source}
          </div>
          <button className="modal-close" onClick={onClose}>
            <Icon name="x" size={18} />
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-grid">
            <div>
              <div className="modal-field-label">Phone</div>
              <div className="modal-field-value masked mono">+1 (***) ***-{String(Math.floor(Math.random() * 9000 + 1000))}</div>
            </div>
            <div>
              <div className="modal-field-label">Email</div>
              <div className="modal-field-value masked mono">{listing.name.split(' ')[0].toLowerCase()}@***.com</div>
            </div>
            <div>
              <div className="modal-field-label">Quality score</div>
              <div className="modal-field-value mono">{listing.score}<span style={{ color: 'var(--ink-4)' }}>/100</span></div>
            </div>
            <div>
              <div className="modal-field-label">Contact window</div>
              <div className="modal-field-value mono">{listing.contactWindow}m</div>
            </div>
          </div>

          <div className="modal-callout">
            <Icon name="sparkle" size={16} />
            <span>{listing.tags[0]} — full contact details unlock instantly when you win this transfer. Average buyer in your tier closes {closeRate}% of platinum leads.</span>
          </div>

          <div className="modal-bid-row">
            <span className="modal-bid-label">Your bid</span>
            <span style={{ color: 'var(--ink-4)', fontFamily: "'JetBrains Mono', monospace" }}>$</span>
            <input
              type="number"
              className="modal-bid-input"
              value={bidAmount}
              onChange={(e) => setBidAmount(Number(e.target.value))}
            />
            <button className="quick-btn" onClick={() => setBidAmount((v) => v + 5)}>+5</button>
            <button className="quick-btn" onClick={() => setBidAmount((v) => v + 10)}>+10</button>
          </div>

          <div className="modal-context">
            <span>Asking <strong className="mono">${listing.price}</strong></span>
            <span>{listing.bids} other bidder{listing.bids !== 1 ? 's' : ''}</span>
            <span>Auto-bid cap: <strong className="mono">$135</strong></span>
          </div>
        </div>

        <div className="modal-foot">
          <div className={`modal-timer${urgent ? ' urgent' : ''}`}>
            <span className={`timer-dot${urgent ? ' urgent' : ''}`} />
            Expires in <span className="mono">{formatExpiry(listing.expiresIn)}</span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="modal-cancel" onClick={onClose}>Cancel</button>
            <button className="modal-place" onClick={() => onSubmit(listing, bidAmount)}>
              Place bid · ${bidAmount}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
