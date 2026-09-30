import {
  GitBranch,
  GitCommit,
  Rocket,
} from "lucide-react";


const deployments = [
  {
    version: "v1.4.2",
    branch: "main",
    commit: "a81f3c2",
    status: "success",
    duration: "4m 18s",
    time: "12 minutes ago",
  },
  {
    version: "v1.4.1",
    branch: "main",
    commit: "7bc91de",
    status: "success",
    duration: "3m 52s",
    time: "2 hours ago",
  },
  {
    version: "v1.4.0",
    branch: "release/v1.4",
    commit: "4fa72c1",
    status: "success",
    duration: "5m 06s",
    time: "5 hours ago",
  },
  {
    version: "v1.3.9",
    branch: "feature/monitoring",
    commit: "b31a4ef",
    status: "failed",
    duration: "2m 47s",
    time: "Yesterday",
  },
];


function DeploymentActivity() {
  return (
    <div className="deployment-activity">

      {deployments.map((deployment) => (

        <div
          className="deployment-item"
          key={deployment.version}
        >

          <div className="deployment-item-icon">
            <Rocket size={15} />
          </div>


          <div className="deployment-item-main">

            <strong>
              {deployment.version}
            </strong>

            <span>
              <GitBranch size={10} />
              {deployment.branch}
              {" · "}
              {deployment.time}
            </span>

          </div>


          <div className="deployment-item-commit">

            <GitCommit size={11} />

            {deployment.commit}

          </div>


          <div
            className={`deployment-item-status ${deployment.status}`}
          >
            <span />
            {deployment.status}
          </div>


          <div className="deployment-item-duration">
            {deployment.duration}
          </div>

        </div>

      ))}

    </div>
  );
}


export default DeploymentActivity;