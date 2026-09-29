import { CheckCircle2, Server } from "lucide-react";

import EnvironmentBadge from "./EnvironmentBadge";

function ServiceTable({ services = [] }) {
  const healthyServices = services.filter(
    (service) => service.status?.toLowerCase() === "healthy",
  ).length;

  return (
    <div className="service-table">
      {services.map((service) => (
        <div className="service-row" key={service.id}>
          <div className="service-name">
            <div className="service-icon">
              <Server size={16} />
            </div>

            <div>
              <strong>{service.name}</strong>

              <span>service-{String(service.id).padStart(3, "0")}</span>
            </div>
          </div>

          <EnvironmentBadge environment={service.environment} />

          <div className="service-status">
            <span className="status-dot" />
            {service.status}
          </div>

          <div className="service-version">v{service.version}</div>

          <div className="service-uptime">{service.uptime}</div>
        </div>
      ))}

      {services.length === 0 && (
        <div className="incident-empty">
          <div className="incident-empty-icon">
            <CheckCircle2 size={19} />
          </div>

          <div>
            <strong>No services registered</strong>

            <span>Waiting for service data from the API.</span>
          </div>
        </div>
      )}

      {services.length > 0 && (
        <div
          style={{
            padding: "12px 22px",
            color: "#69758a",
            fontSize: "10px",
            borderTop: "1px solid rgba(148,163,184,0.07)",
          }}
        >
          {healthyServices} of {services.length} services operational
        </div>
      )}
    </div>
  );
}

export default ServiceTable;
