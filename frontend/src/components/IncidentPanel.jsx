import { CheckCircle2 } from "lucide-react";

function IncidentPanel() {
  return (
    <div className="incident-panel-content">

      <div className="incident-panel-top">

        <div className="incident-panel-heading">

          <div className="incident-panel-icon">
            <CheckCircle2 size={20} />
          </div>

          <div className="incident-panel-title">

            <div className="section-kicker">
              INCIDENT MANAGEMENT
            </div>

            <h3>
              System Status
            </h3>

          </div>

        </div>

        <div className="incident-count">
          0 ACTIVE
        </div>

      </div>


      <div className="incident-status-card">

        <div className="incident-status-icon">
          <CheckCircle2 size={22} />
        </div>

        <div className="incident-status-info">

          <strong>
            No active incidents
          </strong>

          <span>
            All monitored services are operating normally.
          </span>

          <small>
            Last checked · Just now
          </small>

        </div>

      </div>

    </div>
  );
}

export default IncidentPanel;