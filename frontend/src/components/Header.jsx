function Header() {
  return (
    <header className="header">
      <div>
        <p className="eyebrow">OPERATIONS CENTER</p>
        <h2>Infrastructure Overview</h2>
      </div>

      <div className="header-status">
        <span className="status-dot" />
        <span>All Systems Operational</span>
      </div>
    </header>
  );
}

export default Header;