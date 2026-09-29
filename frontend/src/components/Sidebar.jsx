import {
  LayoutDashboard,
  Server,
  Rocket,
  TriangleAlert,
  Activity,
  Cloud,
} from "lucide-react";

const navigation = [
  {
    label: "Overview",
    icon: LayoutDashboard,
    active: true,
  },
  {
    label: "Services",
    icon: Server,
  },
  {
    label: "Deployments",
    icon: Rocket,
  },
  {
    label: "Incidents",
    icon: TriangleAlert,
  },
  {
    label: "Monitoring",
    icon: Activity,
  },
];

function Sidebar() {
  return (
    <aside className="sidebar">

      {/* BRAND */}

      <div className="brand">

        <div className="brand-mark">
          <Cloud size={21} />
        </div>

        <div>
          <div className="brand-name">
            CloudOps360
          </div>

          <div className="brand-subtitle">
            DevOps Platform
          </div>
        </div>

      </div>


      {/* NAVIGATION */}

      <div className="sidebar-section-title">
        PLATFORM
      </div>

      <nav className="sidebar-nav">

        {navigation.map((item) => {

          const Icon = item.icon;

          return (
            <button
              key={item.label}
              className={`sidebar-link ${
                item.active ? "active" : ""
              }`}
            >

              <Icon size={18} />

              <span>
                {item.label}
              </span>

            </button>
          );

        })}

      </nav>


      {/* FOOTER */}

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