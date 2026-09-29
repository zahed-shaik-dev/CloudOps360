import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  Container,
  GitCommit,
  GitPullRequest,
  ShieldCheck,
  Terminal,
} from "lucide-react";

function DeploymentDetails({ deployment, onBack }) {
  if (!deployment) {
    return null;
  }

  return (
    <div className="deployment-details-page">
      <button
        type="button"
        className="back-button"
        onClick={onBack}
      >
        <ArrowLeft size={16} />
        Back to Deployments
      </button>

      <section className="deployment-detail-hero">
        <div>
          <div className="section-kicker">
            DEPLOYMENT / DETAILS
          </div>

          <h1>
            Deployment #{deployment.id}
          </h1>

          <p>
            CloudOps360 application release
            pipeline execution.
          </p>
        </div>

        <div className="deployment-success-badge">
          <span />
          SUCCESS
        </div>
      </section>

      <section className="deployment-meta-grid">
        <div className="deployment-meta-card">
          <span>VERSION</span>
          <strong>{deployment.version}</strong>
        </div>

        <div className="deployment-meta-card">
          <span>BRANCH</span>
          <strong>{deployment.branch}</strong>
        </div>

        <div className="deployment-meta-card">
          <span>COMMIT</span>
          <strong>{deployment.commit}</strong>
        </div>

        <div className="deployment-meta-card">
          <span>DURATION</span>
          <strong>{deployment.duration}</strong>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <div>
            <div className="section-kicker">
              PIPELINE EXECUTION
            </div>

            <div className="panel-title">
              Deployment Pipeline
            </div>

            <div className="panel-subtitle">
              CI/CD execution stages
            </div>
          </div>
        </div>

        <div className="deployment-stage-list">
          <DeploymentStage
            icon={GitPullRequest}
            title="Source Checkout"
            description="Repository source retrieved"
          />

          <DeploymentStage
            icon={Terminal}
            title="Build"
            description="Application successfully compiled"
          />

          <DeploymentStage
            icon={CheckCircle2}
            title="Automated Tests"
            description="All tests passed"
          />

          <DeploymentStage
            icon={ShieldCheck}
            title="Security Scan"
            description="No blocking vulnerabilities detected"
          />

          <DeploymentStage
            icon={Container}
            title="Docker Build"
            description="Production image created"
          />

          <DeploymentStage
            icon={GitCommit}
            title="Deployment"
            description="Application deployed successfully"
          />

          <DeploymentStage
            icon={Clock3}
            title="Health Check"
            description="Application responding normally"
          />
        </div>
      </section>
    </div>
  );
}

function DeploymentStage({
  icon: Icon,
  title,
  description,
}) {
  return (
    <div className="deployment-stage">
      <div className="deployment-stage-icon">
        <Icon size={17} />
      </div>

      <div>
        <strong>{title}</strong>
        <span>{description}</span>
      </div>

      <CheckCircle2
        size={18}
        className="deployment-stage-success"
      />
    </div>
  );
}

export default DeploymentDetails;