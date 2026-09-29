import {
  Activity,
  ArrowLeft,
  CheckCircle2,
  Clock3,
  Database,
  GitBranch,
  Globe,
  Server,
  ShieldCheck,
  Zap,
} from "lucide-react";

function ServiceDetails({ service, onBack }) {
  if (!service) {
    return null;
  }

  const isHealthy =
    service.status?.toLowerCase() === "healthy";

  return (
    <div className="service-details-page">
      <button
        type="button"
        className="back-button"
        onClick={onBack}
      >
        <ArrowLeft size={16} />
        Back to Services
      </button>

      <section className="service-details-hero">
        <div className="service-details-title">
          <div className="service-large-icon">
            <Server size={24} />
          </div>

          <div>
            <div className="section-kicker">
              SERVICE / DETAILS
            </div>

            <h1>{service.name}</h1>

            <p>
              Service-{String(service.id).padStart(3, "0")}
              {" · "}
              CloudOps360 platform component
            </p>
          </div>
        </div>

        <div
          className={`service-health-badge ${
            isHealthy ? "healthy" : "unhealthy"
          }`}
        >
          <span />
          {service.status}
        </div>
      </section>

      <section className="service-detail-grid">
        <div className="service-detail-card">
          <div className="service-detail-card-label">
            ENVIRONMENT
          </div>

          <div className="service-detail-card-value">
            <Globe size={17} />
            {service.environment}
          </div>
        </div>

        <div className="service-detail-card">
          <div className="service-detail-card-label">
            VERSION
          </div>

          <div className="service-detail-card-value">
            <GitBranch size={17} />
            v{service.version}
          </div>
        </div>

        <div className="service-detail-card">
          <div className="service-detail-card-label">
            UPTIME
          </div>

          <div className="service-detail-card-value">
            <Activity size={17} />
            {service.uptime}
          </div>
        </div>

        <div className="service-detail-card">
          <div className="service-detail-card-label">
            STATUS
          </div>

          <div className="service-detail-card-value">
            <CheckCircle2 size={17} />
            Operational
          </div>
        </div>
      </section>

      <section className="service-detail-columns">
        <div className="panel">
          <div className="panel-header">
            <div>
              <div className="section-kicker">
                HEALTH CHECKS
              </div>

              <div className="panel-title">
                Service Health
              </div>

              <div className="panel-subtitle">
                Current service availability signals
              </div>
            </div>

            <div className="live-indicator">
              <span />
              LIVE
            </div>
          </div>

          <div className="health-check-list">
            <div className="health-check-item">
              <div className="health-check-icon">
                <Zap size={16} />
              </div>

              <div>
                <strong>Application Health</strong>
                <span>Service responding normally</span>
              </div>

              <CheckCircle2
                size={17}
                className="health-check-success"
              />
            </div>

            <div className="health-check-item">
              <div className="health-check-icon">
                <Database size={16} />
              </div>

              <div>
                <strong>Database Connection</strong>
                <span>PostgreSQL connection available</span>
              </div>

              <CheckCircle2
                size={17}
                className="health-check-success"
              />
            </div>

            <div className="health-check-item">
              <div className="health-check-icon">
                <ShieldCheck size={16} />
              </div>

              <div>
                <strong>Security Status</strong>
                <span>No active security alerts</span>
              </div>

              <CheckCircle2
                size={17}
                className="health-check-success"
              />
            </div>

            <div className="health-check-item">
              <div className="health-check-icon">
                <Clock3 size={16} />
              </div>

              <div>
                <strong>Availability</strong>
                <span>Service operating within SLA</span>
              </div>

              <CheckCircle2
                size={17}
                className="health-check-success"
              />
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <div className="section-kicker">
                SERVICE INFORMATION
              </div>

              <div className="panel-title">
                Configuration
              </div>

              <div className="panel-subtitle">
                Runtime service information
              </div>
            </div>
          </div>

          <div className="service-info-list">
            <div>
              <span>Service ID</span>
              <strong>
                service-{String(service.id).padStart(3, "0")}
              </strong>
            </div>

            <div>
              <span>Environment</span>
              <strong>{service.environment}</strong>
            </div>

            <div>
              <span>Current Version</span>
              <strong>v{service.version}</strong>
            </div>

            <div>
              <span>Availability</span>
              <strong>{service.uptime}</strong>
            </div>

            <div>
              <span>Deployment Status</span>
              <strong className="text-success">
                Operational
              </strong>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ServiceDetails;