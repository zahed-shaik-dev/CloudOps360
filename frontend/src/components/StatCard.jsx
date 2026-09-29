import {
  Activity,
  AlertTriangle,
  Server,
  TrendingUp,
} from "lucide-react";

const icons = {
  services: Server,
  healthy: Activity,
  incidents: AlertTriangle,
  uptime: TrendingUp,
};

function StatCard({
  type,
  label,
  value,
  description,
  trend,
}) {
  const Icon = icons[type];

  return (
    <div className={`stat-card stat-${type}`}>

      <div className="stat-top">
        <div className="stat-icon">
          <Icon size={18} />
        </div>

        {trend && (
          <span className="trend">
            {trend}
          </span>
        )}
      </div>

      <div className="stat-label">
        {label}
      </div>

      <strong>{value}</strong>

      <span className="stat-description">
        {description}
      </span>

      <div className="stat-line">
        <span />
      </div>

    </div>
  );
}

export default StatCard;