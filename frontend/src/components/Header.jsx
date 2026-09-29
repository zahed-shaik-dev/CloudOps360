import {
  Bell,
  RefreshCw,
  Search,
  Wifi,
} from "lucide-react";

function Header({ onRefresh, refreshing }) {
  return (
    <header className="top-header">

      <div className="header-title">
        <div className="mobile-menu-icon">
          <span />
          <span />
          <span />
        </div>

        <div>
          <p className="eyebrow">OPERATIONS CENTER</p>
          <h2>Infrastructure Overview</h2>
        </div>
      </div>

      <div className="header-actions">

        <div className="api-status">
          <span className="live-pulse" />
          <Wifi size={14} />
          API Connected
        </div>

        <button
          className="icon-button"
          title="Search"
        >
          <Search size={17} />
        </button>

        <button
          className="icon-button notification-button"
          title="Notifications"
        >
          <Bell size={17} />
          <span className="notification-dot" />
        </button>

        <button
          className={`refresh-button ${
            refreshing ? "spinning" : ""
          }`}
          onClick={onRefresh}
        >
          <RefreshCw size={15} />
          Refresh
        </button>

      </div>

    </header>
  );
}

export default Header;