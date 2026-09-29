import { Activity, AlertTriangle, Server, TrendingUp } from "lucide-react";

const config = {
  services: {
    icon: Server,
    color: "#4f8cff",
  },

  healthy: {
    icon: Activity,
    color: "#31d17c",
  },

  incidents: {
    icon: AlertTriangle,
    color: "#f4c95d",
  },

  uptime: {
    icon: TrendingUp,
    color: "#9b7cff",
  },
};

function StatCard({ type, label, value, description, trend }) {
  const item = config[type];
  const Icon = item.icon;

  return (
    <article
      className="stat-card"
      style={{
        "--stat-color": item.color,
      }}
    >
      <div className="stat-card-top">
        <div className="stat-card-label">{label}</div>

        <div className="stat-card-icon">
          <Icon size={17} />
        </div>
      </div>

      <div className="stat-card-value">{value}</div>

      <div className="stat-card-description">{description}</div>

      <div className="stat-card-trend">{trend}</div>
    </article>
  );
}

export default StatCard;
