import Icon from './Icon';
import { VERTICAL_LABELS, VERTICAL_ICONS, VERTICALS } from '../data/constants';
import type { Vertical } from '../types';

interface SidebarProps {
  activeVertical: string;
  onVerticalChange: (v: string) => void;
  verticalCounts: Record<string, number>;
}

const WORKSPACE_ITEMS = [
  { icon: 'briefcase', label: 'Active deals', count: 3 },
  { icon: 'eye', label: 'Watchlist', count: 12 },
  { icon: 'trending', label: 'Performance' },
  { icon: 'settings', label: 'Settings' },
];

export default function Sidebar({ activeVertical, onVerticalChange, verticalCounts }: SidebarProps) {
  const allCount = Object.values(verticalCounts).reduce((a, b) => a + b, 0);

  return (
    <aside className="sidebar">
      <nav className="sidebar-section">
        <h3 className="sidebar-heading">Verticals</h3>
        <ul className="sidebar-list">
          <li
            className={`sidebar-item${activeVertical === 'all' ? ' active' : ''}`}
            onClick={() => onVerticalChange('all')}
          >
            <Icon name="grid" size={16} />
            <span className="sidebar-item-label">All verticals</span>
            <span className="sidebar-count">{allCount}</span>
          </li>
          {VERTICALS.map((v: Vertical) => (
            <li
              key={v}
              className={`sidebar-item${activeVertical === v ? ' active' : ''}`}
              onClick={() => onVerticalChange(v)}
            >
              <Icon name={VERTICAL_ICONS[v]} size={16} />
              <span className="sidebar-item-label">{VERTICAL_LABELS[v]}</span>
              <span className="sidebar-count">{verticalCounts[v] ?? 0}</span>
            </li>
          ))}
        </ul>
      </nav>

      <nav className="sidebar-section">
        <h3 className="sidebar-heading">Workspace</h3>
        <ul className="sidebar-list">
          {WORKSPACE_ITEMS.map((item) => (
            <li key={item.label} className="sidebar-item">
              <Icon name={item.icon} size={16} />
              <span className="sidebar-item-label">{item.label}</span>
              {item.count !== undefined && (
                <span className="sidebar-count">{item.count}</span>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-budget">
        <div className="budget-header">
          <span className="budget-label">Daily budget</span>
          <span className="budget-amount mono">$1,284 / $2,500</span>
        </div>
        <div className="budget-bar">
          <div className="budget-fill" style={{ width: '51.4%' }} />
        </div>
        <span className="budget-sub">51% remaining &middot; resets in 8h 14m</span>
      </div>
    </aside>
  );
}
