import {
  CheckCircle2,
  Clock3,
  Server,
} from "lucide-react";

import EnvironmentBadge from "./EnvironmentBadge";

function ServiceTable({ services }) {
  return (
    <div className="service-card">

      <div className="section-heading">

        <div>
          <p className="eyebrow">
            SERVICE CATALOG
          </p>

          <h3>
            Service Health
          </h3>
        </div>

        <div className="service-summary">
          <CheckCircle2 size={14} />
          {services.length} services operational
        </div>

      </div>

      <div className="services-list">

        {services.map((service) => (

          <div
            className="service-row"
            key={service.id}
          >

            <div className="service-info">

              <div className="service-icon">
                <Server size={17} />
              </div>

              <div>
                <strong>
                  {service.name}
                </strong>

                <span>
                  Service ID: svc-{service.id}
                </span>
              </div>

            </div>

            <EnvironmentBadge
              environment={service.environment}
            />

            <div className="service-status">
              <span className="status-dot animated" />
              {service.status}
            </div>

            <code>
              {service.version}
            </code>

            <div className="uptime">
              <Clock3 size={13} />
              {service.uptime}
            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default ServiceTable;