import Icon from './Icon';

import { VERTICALS, VERTICAL_LABELS, VERTICAL_ICONS } from '../data/constants';

interface Props {
  activeVertical: string;
  onVerticalChange: (v: string) => void;
  verticalCounts: Record<string, number>;
  activePage: string;
  onPageChange: (page: string) => void;
}

export default function Sidebar({ activeVertical, onVerticalChange, verticalCounts, activePage, onPageChange }: Props) {
  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <div className="sidebar-label">Verticals</div>
        <div
          className={`sidebar-item${activeVertical === 'all' ? ' active' : ''}`}
          onClick={() => onVerticalChange('all')}
        >
          <Icon name="grid" size={16} />
          <span>All verticals</span>
          <span className="sidebar-count">{verticalCounts.all || 0}</span>
        </div>
        {VERTICALS.map((v) => (
          <div
            key={v}
            className={`sidebar-item${activeVertical === v ? ' active' : ''}`}
            onClick={() => onVerticalChange(v)}
          >
            <Icon name={VERTICAL_ICONS[v]} size={16} />
            <span>{VERTICAL_LABELS[v]}</span>
            <span className="sidebar-count">{verticalCounts[v] || 0}</span>
          </div>
        ))}
      </div>

      <div className="sidebar-section">
        <div className="sidebar-label">Workspace</div>
        <div
          className={`sidebar-item${activePage === 'checkout' ? ' active' : ''}`}
          onClick={() => onPageChange('checkout')}
        >
          <Icon name="zap" size={16} />
          <span>Buy transfers</span>
        </div>
        <div className="sidebar-item">
          <Icon name="briefcase" size={16} />
          <span>Active deals</span>
          <span className="sidebar-count">3</span>
        </div>
        <div className="sidebar-item">
          <Icon name="star" size={16} />
          <span>Watchlist</span>
          <span className="sidebar-count">12</span>
        </div>
        <div className="sidebar-item">
          <Icon name="activity" size={16} />
          <span>Performance</span>
        </div>
        <div className="sidebar-item">
          <Icon name="settings" size={16} />
          <span>Settings</span>
        </div>
      </div>

      <div className="sidebar-budget">
        <div className="sidebar-budget-head">
          <span className="sidebar-budget-label">Daily budget</span>
          <span className="sidebar-budget-amount mono">$1,284 / $2,500</span>
        </div>
        <div className="sidebar-budget-bar">
          <div className="sidebar-budget-fill" style={{ width: '51.4%' }} />
        </div>
        <div className="sidebar-budget-meta">49% remaining · resets in 8h 14m</div>
      </div>
    </aside>
  );
}
