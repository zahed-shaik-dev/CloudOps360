import {
  LayoutDashboard,
  Server,
  Rocket,
  TriangleAlert,
  Activity,
  Cloud,
} from "lucide-react";

const navigation = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "services", label: "Services", icon: Server },
  { id: "deployments", label: "Deployments", icon: Rocket },
  { id: "incidents", label: "Incidents", icon: TriangleAlert },
  { id: "monitoring", label: "Monitoring", icon: Activity },
];

function Sidebar({ activeSection, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">
          <Cloud size={21} />
        </div>

        <div>
          <div className="brand-name">CloudOps360</div>
          <div className="brand-subtitle">DevOps Platform</div>
        </div>
      </div>

      <div className="sidebar-section-title">
        PLATFORM
      </div>

      <nav className="sidebar-nav">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <button
              type="button"
              key={item.id}
              className={`sidebar-link ${
                activeSection === item.id ? "active" : ""
              }`}
              onClick={() => onNavigate(item.id)}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-footer-title">
          SYSTEM STATUS
        </div>

        <div className="sidebar-footer-value">
          <span className="sidebar-footer-dot" />
          All systems operational
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;