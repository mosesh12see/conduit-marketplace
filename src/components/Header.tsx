import Icon from './Icon';

export default function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <div className="brand">
          <div
            className="brand-icon"
            style={{
              width: 24,
              height: 24,
              background: '#000',
              borderRadius: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: 14,
              fontWeight: 700,
              lineHeight: 1,
            }}
          >
            C
          </div>
          <span className="brand-wordmark">Conduit</span>
          <span className="role-pill">Buyer</span>
        </div>
      </div>

      <div className="header-search">
        <Icon name="search" size={16} className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Search by location, intent, source..."
        />
        <kbd className="search-hint">⌘K</kbd>
      </div>

      <div className="header-right">
        <div className="header-stats">
          <span className="header-stat">Today: <strong>23 leads</strong></span>
          <span className="header-stat">Avg CPL: <strong>$55.80</strong></span>
          <span className="header-stat">Contact rate: <strong>14.2%</strong></span>
        </div>

        <div className="header-actions">
          <button className="icon-btn" aria-label="Notifications">
            <Icon name="bell" size={18} />
          </button>
          <div className="profile-chip">
            <div className="profile-avatar">MH</div>
            <span className="profile-name">Moses</span>
          </div>
        </div>
      </div>
    </header>
  );
}
