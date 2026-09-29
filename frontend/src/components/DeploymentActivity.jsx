import {
  CheckCircle2,
  GitCommit,
  Rocket,
} from "lucide-react";

const deployments = [
  {
    service: "Backend API",
    version: "v1.0.0",
    environment: "development",
    time: "12 min ago",
  },
  {
    service: "Frontend",
    version: "v1.0.0",
    environment: "development",
    time: "18 min ago",
  },
  {
    service: "Database",
    version: "v16",
    environment: "development",
    time: "31 min ago",
  },
];

function DeploymentActivity() {
  return (
    <div className="activity-card">

      <div className="section-heading compact">

        <div>
          <p className="eyebrow">
            DELIVERY
          </p>

          <h3>
            Recent Deployments
          </h3>
        </div>

        <Rocket size={17} />

      </div>

      <div className="deployment-list">

        {deployments.map((deployment) => (

          <div
            className="deployment-item"
            key={`${deployment.service}-${deployment.version}`}
          >

            <div className="deployment-icon">
              <GitCommit size={15} />
            </div>

            <div className="deployment-info">

              <strong>
                {deployment.service}
              </strong>

              <span>
                {deployment.version} ·{" "}
                {deployment.environment}
              </span>

            </div>

            <div className="deployment-success">
              <CheckCircle2 size={14} />
              <span>
                {deployment.time}
              </span>
            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default DeploymentActivity;