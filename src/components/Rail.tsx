import Icon from './Icon';
import BidCard from './BidCard';
import { VERTICAL_ICONS, VERTICAL_LABELS } from '../data/constants';
import type { ActiveBid, WonLead } from '../types';

interface RailProps {
  activeBids: ActiveBid[];
  wonLeads: WonLead[];
}

export default function Rail({ activeBids, wonLeads }: RailProps) {
  return (
    <aside className="rail">
      <section className="rail-section">
        <div className="rail-section-header">
          <h3 className="rail-heading">Your active bids</h3>
          <span className="rail-count-badge">{activeBids.length}</span>
        </div>
        <div className="rail-list">
          {activeBids.map((bid) => (
            <BidCard key={bid.id} bid={bid} />
          ))}
        </div>
      </section>

      <section className="rail-section">
        <div className="rail-section-header">
          <Icon name="check" size={15} className="rail-header-icon" />
          <h3 className="rail-heading">Recently won</h3>
        </div>
        <div className="rail-list">
          {wonLeads.map((lead) => (
            <div key={lead.id} className="won-lead-row">
              <div className="won-lead-info">
                <span className="won-lead-name">{lead.name}</span>
                <span className="won-lead-meta">
                  <Icon name={VERTICAL_ICONS[lead.vertical]} size={12} />
                  {VERTICAL_LABELS[lead.vertical]}
                </span>
              </div>
              <div className="won-lead-right">
                <span className="won-lead-time">{lead.wonAt}</span>
                <span className="won-lead-price mono">${lead.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rail-section">
        <div className="rail-section-header">
          <Icon name="zap" size={15} className="rail-header-icon" />
          <h3 className="rail-heading">Auto-bid rules</h3>
        </div>
        <div className="rail-list">
          <div className="auto-bid-rule">
            <div className="rule-summary">
              <span className="rule-label">Solar &middot; Platinum</span>
              <span className="rule-detail">Cap $150 &middot; Max 5/day</span>
            </div>
            <span className="rule-status active">Active</span>
          </div>
          <button className="new-rule-btn">
            <Icon name="plus" size={14} />
            New rule
          </button>
        </div>
      </section>
    </aside>
  );
}
