import Icon from './Icon';
import BidCard from './BidCard';
import type { ActiveBid, WonLead } from '../types';
import { VERTICAL_LABELS } from '../data/constants';

interface Props {
  activeBids: ActiveBid[];
  wonLeads: WonLead[];
}

export default function Rail({ activeBids, wonLeads }: Props) {
  return (
    <aside className="rail">
      <div className="rail-section">
        <div className="rail-title">
          Your active bids
          <span className="rail-count">{activeBids.length}</span>
        </div>
        {activeBids.length === 0 && (
          <div style={{ fontSize: 12, color: 'var(--ink-4)' }}>No active bids</div>
        )}
        {activeBids.map((bid) => (
          <BidCard key={bid.id} bid={bid} />
        ))}
      </div>

      <div className="rail-section">
        <div className="rail-title">
          <Icon name="check" size={14} /> Recently won
        </div>
        {wonLeads.map((w) => (
          <div key={w.id} className="won-lead">
            <div className="won-lead-info">
              <span className="won-lead-name">{w.name}</span>
              <span className="won-lead-sub">{VERTICAL_LABELS[w.vertical]} · {w.wonAt}</span>
            </div>
            <span className="won-lead-price mono">${w.price}</span>
          </div>
        ))}
      </div>

      <div className="rail-section">
        <div className="rail-title" style={{ justifyContent: 'space-between' }}>
          Auto-bid rules
          <button className="new-rule-btn" style={{ width: 'auto', padding: '3px 10px' }}>
            <Icon name="plus" size={12} /> New rule
          </button>
        </div>
        <div className="rule-card">
          <div className="rule-title">Solar · Platinum · CA/AZ/NV</div>
          <div className="rule-detail">Auto-bid up to <span className="mono" style={{ fontWeight: 600, color: 'var(--ink)' }}>$135</span></div>
          <div className="rule-footer">
            <span>Triggered 14× today</span>
            <span className="rule-active"><span className="new-dot" /> Active</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
