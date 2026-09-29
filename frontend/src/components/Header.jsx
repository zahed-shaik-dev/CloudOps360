import { Bell, RefreshCw, Search } from "lucide-react";

function Header({ onRefresh, refreshing }) {
  return (
    <header className="dashboard-header">
      <div className="header-left">
        <div>
          <div className="header-title">Operations Center</div>

          <div className="header-subtitle">
            Cloud infrastructure observability
          </div>
        </div>
      </div>

      <div className="header-actions">
        <div className="api-status">
          <span className="api-status-dot" />
          API Connected
        </div>

        <button type="button" className="header-button" aria-label="Search">
          <Search size={16} />
        </button>

        <button
          type="button"
          className="header-button"
          aria-label="Notifications"
        >
          <Bell size={16} />
        </button>

        <button
          type="button"
          className="header-button"
          aria-label="Refresh dashboard"
          onClick={onRefresh}
        >
          <RefreshCw
            size={16}
            className={refreshing ? "loading-spinner" : ""}
          />
        </button>
      </div>
    </header>
  );
}

export default Header;
