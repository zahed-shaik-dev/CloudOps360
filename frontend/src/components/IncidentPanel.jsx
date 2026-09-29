import {
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

function IncidentPanel() {
  return (
    <div className="incident-card">

      <div className="section-heading compact">

        <div>
          <p className="eyebrow">
            INCIDENT MANAGEMENT
          </p>

          <h3>
            System Status
          </h3>
        </div>

        <ShieldCheck size={17} />

      </div>

      <div className="incident-content">

        <div className="incident-icon">
          <CheckCircle2 size={30} />
        </div>

        <div>

          <strong>
            No active incidents
          </strong>

          <p>
            All monitored services are
            operating normally.
          </p>

        </div>

      </div>

      <div className="incident-footer">
        Last checked · Just now
      </div>

    </div>
  );
}

export default IncidentPanel;