const navigation = [
  { label: "Overview", icon: "⌂" },
  { label: "Services", icon: "◈" },
  { label: "Deployments", icon: "⇧" },
  { label: "Incidents", icon: "!" },
  { label: "Monitoring", icon: "◉" },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">C</div>

        <div>
          <h1>CloudOps360</h1>
          <span>DevOps Platform</span>
        </div>
      </div>

      <nav>
        {navigation.map((item, index) => (
          <button
            className={`nav-item ${index === 0 ? "active" : ""}`}
            key={item.label}
          >
            <span>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <span className="status-dot" />
        Platform Operational
      </div>
    </aside>
  );
}

export default Sidebar;