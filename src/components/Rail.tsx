import { useState } from 'react';
import Icon from './Icon';
import BidCard from './BidCard';
import type { ActiveBid, WonLead } from '../types';
import { VERTICAL_LABELS } from '../data/constants';

interface Props {
  activeBids: ActiveBid[];
  wonLeads: WonLead[];
}

function CollapsibleSection({ title, count, defaultOpen = true, children }: {
  title: string;
  count?: number;
  defaultOpen?: boolean;
  icon?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="rail-section">
      <div className="rail-title rail-title-clickable" onClick={() => setOpen(!open)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Icon name={open ? 'arrowDown' : 'arrowUp'} size={12} className="rail-chevron" />
          {title}
          {count !== undefined && <span className="rail-count">{count}</span>}
        </div>
      </div>
      {open && children}
    </div>
  );
}

export default function Rail({ activeBids, wonLeads }: Props) {
  return (
    <aside className="rail">
      <CollapsibleSection title="Your active bids" count={activeBids.length} defaultOpen={true}>
        {activeBids.length === 0 && (
          <div style={{ fontSize: 12, color: 'var(--ink-4)' }}>No active bids</div>
        )}
        {activeBids.map((bid) => (
          <BidCard key={bid.id} bid={bid} />
        ))}
      </CollapsibleSection>

      <CollapsibleSection title="Recently won" count={wonLeads.length} defaultOpen={true}>
        {wonLeads.map((w) => (
          <div key={w.id} className="won-lead">
            <div className="won-lead-info">
              <span className="won-lead-name">{w.name}</span>
              <span className="won-lead-sub">{VERTICAL_LABELS[w.vertical]} · {w.wonAt}</span>
            </div>
            <span className="won-lead-price mono">${w.price}</span>
          </div>
        ))}
      </CollapsibleSection>

      <CollapsibleSection title="Auto-bid rules" defaultOpen={true}>
        <div className="rule-card">
          <div className="rule-title">Solar · Platinum · CA/AZ/NV</div>
          <div className="rule-detail">Auto-bid up to <span className="mono" style={{ fontWeight: 600, color: 'var(--ink)' }}>$135</span></div>
          <div className="rule-footer">
            <span>Triggered 14× today</span>
            <span className="rule-active"><span className="new-dot" /> Active</span>
          </div>
        </div>
        <button className="new-rule-btn">
          <Icon name="plus" size={12} /> New rule
        </button>
      </CollapsibleSection>
    </aside>
  );
}
