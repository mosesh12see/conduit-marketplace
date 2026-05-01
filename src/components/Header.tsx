import Icon from './Icon';

export default function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <div className="brand">
          <div className="brand-icon">C</div>
          <span className="brand-wordmark">Conduit</span>
          <span className="role-pill">Buyer</span>
        </div>
      </div>

      <div className="header-search">
        <Icon name="search" size={15} className="search-icon" />
        <input type="text" className="search-input" placeholder="Search by location, intent, source…" />
        <kbd className="search-hint">⌘K</kbd>
      </div>

      <div className="header-right">
        <div className="header-stats">
          <div className="header-stat">
            <span>Today</span>
            <strong className="mono">23 leads</strong>
          </div>
          <div className="header-stat">
            <span>Avg CPL</span>
            <strong className="mono">$55.80</strong>
          </div>
          <div className="header-stat">
            <span>Contact rate</span>
            <strong className="mono accent">78%</strong>
          </div>
        </div>
        <div className="header-actions">
          <button className="icon-btn" aria-label="Notifications">
            <Icon name="bell" size={17} />
          </button>
          <div className="profile-chip">
            <div className="profile-avatar">JM</div>
            <span className="profile-name">Jordan M.</span>
          </div>
        </div>
      </div>
    </header>
  );
}
