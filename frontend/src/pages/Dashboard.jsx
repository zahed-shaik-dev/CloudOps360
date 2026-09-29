import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  CheckCircle2,
  Container,
  GitBranch,
  GitCommit,
  Rocket,
  Server,
  ShieldCheck,
  Terminal,
} from "lucide-react";

import Header from "../components/Header";
import StatCard from "../components/StatCard";
import ServiceTable from "../components/ServiceTable";
import MetricChart from "../components/MetricChart";
import DeploymentActivity from "../components/DeploymentActivity";
import IncidentPanel from "../components/IncidentPanel";
import EnvironmentBadge from "../components/EnvironmentBadge";

import ServiceDetails from "../components/ServiceDetails";
import DeploymentDetails from "../components/DeploymentDetails";

import { getServices } from "../services/api";


/* =========================================================
   DEMO DEPLOYMENT DATA
========================================================= */

const deployments = [
  {
    id: "1042",
    version: "v1.4.2",
    branch: "main",
    commit: "a81f3c2",
    duration: "4m 18s",
    status: "success",
    environment: "production",
    author: "CloudOps360",
    time: "12 minutes ago",
  },
  {
    id: "1041",
    version: "v1.4.1",
    branch: "main",
    commit: "7bc91de",
    duration: "3m 52s",
    status: "success",
    environment: "production",
    author: "CloudOps360",
    time: "2 hours ago",
  },
  {
    id: "1040",
    version: "v1.4.0",
    branch: "release/v1.4",
    commit: "4fa72c1",
    duration: "5m 06s",
    status: "success",
    environment: "staging",
    author: "CloudOps360",
    time: "5 hours ago",
  },
  {
    id: "1039",
    version: "v1.3.9",
    branch: "feature/monitoring",
    commit: "b31a4ef",
    duration: "2m 47s",
    status: "failed",
    environment: "development",
    author: "CloudOps360",
    time: "Yesterday",
  },
  {
    id: "1038",
    version: "v1.3.8",
    branch: "main",
    commit: "91cd82a",
    duration: "4m 02s",
    status: "success",
    environment: "production",
    author: "CloudOps360",
    time: "Yesterday",
  },
];


/* =========================================================
   DASHBOARD
========================================================= */

function Dashboard({ activeSection }) {
  const [services, setServices] = useState([]);

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [error, setError] = useState("");

  const [selectedService, setSelectedService] =
    useState(null);

  const [selectedDeployment, setSelectedDeployment] =
    useState(null);


  /* =======================================================
     LOAD SERVICES
  ======================================================= */

  const loadServices = useCallback(async () => {
    try {
      setError("");

      const data = await getServices();

      setServices(
        Array.isArray(data)
          ? data
          : data.services || []
      );
    } catch (error) {
      console.error(error);

      setError(
        "Unable to connect to the CloudOps360 API."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);


  useEffect(() => {
    loadServices();
  }, [loadServices]);


  /* =======================================================
     REFRESH
  ======================================================= */

  const handleRefresh = async () => {
    setRefreshing(true);

    await loadServices();
  };


  /* =======================================================
     SERVICE METRICS
  ======================================================= */

  const healthyServices = services.filter(
    (service) =>
      service.status?.toLowerCase() === "healthy"
  ).length;


  const unhealthyServices =
    services.length - healthyServices;


  const healthPercentage =
    services.length > 0
      ? Math.round(
          (healthyServices / services.length) * 100
        )
      : 0;


  /* =======================================================
     DEPLOYMENT METRICS
  ======================================================= */

  const successfulDeployments =
    deployments.filter(
      (deployment) =>
        deployment.status === "success"
    ).length;


  const failedDeployments =
    deployments.filter(
      (deployment) =>
        deployment.status === "failed"
    ).length;


  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="dashboard-shell">

      <Header
        onRefresh={handleRefresh}
        refreshing={refreshing}
      />


      <main className="dashboard-content">


        {/* =================================================
            OVERVIEW
        ================================================= */}

        {activeSection === "overview" && (
          <>
            <section className="dashboard-hero">

              <div className="hero-copy">

                <div className="eyebrow">
                  CLOUDOPS360 / OPERATIONS
                </div>

                <h1>
                  Infrastructure
                  <span> Overview</span>
                </h1>

                <p>
                  Monitor services, deployments,
                  infrastructure health and operational
                  signals from one centralized platform.
                </p>

              </div>


              <div className="operations-badge">

                <span className="operations-badge-dot" />

                Platform Operational

              </div>

            </section>


            {/* LOADING */}

            {loading && (
              <div className="loading-state">

                <div className="loading-spinner" />

                Connecting to infrastructure...

              </div>
            )}


            {/* ERROR */}

            {!loading && error && (
              <div className="error-banner">

                <strong>
                  Connection Error
                </strong>

                <span>
                  {error}
                </span>

                <button
                  type="button"
                  onClick={handleRefresh}
                >
                  Retry
                </button>

              </div>
            )}


            {/* OVERVIEW CONTENT */}

            {!loading && !error && (
              <>

                {/* KPI CARDS */}

                <section className="stats-grid">

                  <StatCard
                    type="services"
                    label="SERVICES"
                    value={services.length}
                    description="Registered services"
                    trend="+2 this week"
                  />

                  <StatCard
                    type="healthy"
                    label="HEALTHY"
                    value={`${healthPercentage}%`}
                    description="Currently operational"
                    trend="Stable"
                  />

                  <StatCard
                    type="incidents"
                    label="INCIDENTS"
                    value="0"
                    description="Active incidents"
                    trend="No active alerts"
                  />

                  <StatCard
                    type="uptime"
                    label="UPTIME"
                    value="99.9%"
                    description="Current availability"
                    trend="Excellent"
                  />

                </section>


                {/* SERVICE HEALTH */}

                <section className="panel service-panel">

                  <div className="panel-header">

                    <div>

                      <div className="section-kicker">
                        SERVICE CATALOG
                      </div>

                      <div className="panel-title">
                        Service Health
                      </div>

                      <div className="panel-subtitle">
                        Real-time application service status
                      </div>

                    </div>


                    <div className="live-indicator">

                      <span />

                      LIVE

                    </div>

                  </div>


                  <ServiceTable
                    services={services}
                  />

                </section>


                {/* CHART + DEPLOYMENTS */}

                <section className="dashboard-grid">


                  {/* RESOURCE UTILIZATION */}

                  <div className="panel">

                    <div className="panel-header">

                      <div>

                        <div className="section-kicker">
                          INFRASTRUCTURE
                        </div>

                        <div className="panel-title">
                          Resource Utilization
                        </div>

                        <div className="panel-subtitle">
                          CPU and memory performance
                        </div>

                      </div>


                      <div className="metric-status">
                        DEMO METRICS
                      </div>

                    </div>


                    <MetricChart />

                  </div>


                  {/* RECENT DEPLOYMENTS */}

                  <div className="panel">

                    <div className="panel-header">

                      <div>

                        <div className="section-kicker">
                          DELIVERY
                        </div>

                        <div className="panel-title">
                          Recent Deployments
                        </div>

                        <div className="panel-subtitle">
                          Application release activity
                        </div>

                      </div>


                      <div className="deployment-status">
                        ● ACTIVE
                      </div>

                    </div>


                    <DeploymentActivity />

                  </div>

                </section>


                {/* INCIDENT STATUS */}

                <section className="panel incident-panel">

                  <div className="panel-header">

                    <div>

                      <div className="section-kicker">
                        INCIDENT MANAGEMENT
                      </div>

                      <div className="panel-title">
                        System Status
                      </div>

                      <div className="panel-subtitle">
                        Operational events and incidents
                      </div>

                    </div>


                    <div className="incident-count">
                      0 ACTIVE
                    </div>

                  </div>


                  <IncidentPanel />

                </section>

              </>
            )}

          </>
        )}


        {/* =================================================
            SERVICES
        ================================================= */}

        {activeSection === "services" &&
          !selectedService && (

            <section className="section-page">

              <div className="page-heading">

                <div>

                  <div className="eyebrow">
                    CLOUDOPS360 / PLATFORM
                  </div>

                  <h1>
                    Service <span>Catalog</span>
                  </h1>

                  <p>
                    Monitor application and infrastructure
                    services connected to CloudOps360.
                  </p>

                </div>


                <div className="operations-badge">

                  <span className="operations-badge-dot" />

                  {healthyServices}/{services.length} Healthy

                </div>

              </div>


              {/* SERVICE KPIs */}

              <section className="stats-grid">

                <StatCard
                  type="services"
                  label="TOTAL SERVICES"
                  value={services.length}
                  description="Registered services"
                  trend="Connected"
                />

                <StatCard
                  type="healthy"
                  label="HEALTHY"
                  value={healthyServices}
                  description="Operational services"
                  trend="Stable"
                />

                <StatCard
                  type="incidents"
                  label="UNHEALTHY"
                  value={unhealthyServices}
                  description="Services requiring attention"
                  trend={
                    unhealthyServices === 0
                      ? "All clear"
                      : "Investigate"
                  }
                />

                <StatCard
                  type="uptime"
                  label="PLATFORM UPTIME"
                  value="99.9%"
                  description="Overall availability"
                  trend="Operational"
                />

              </section>


              {/* SERVICE INVENTORY */}

              <section className="panel">

                <div className="panel-header">

                  <div>

                    <div className="section-kicker">
                      SERVICE INVENTORY
                    </div>

                    <div className="panel-title">
                      All Services
                    </div>

                    <div className="panel-subtitle">
                      Select a service to inspect its
                      health, configuration and status.
                    </div>

                  </div>


                  <div className="live-indicator">

                    <span />

                    LIVE

                  </div>

                </div>


                <div className="service-table">

                  {services.map((service) => (

                    <button
                      type="button"
                      className="service-row service-row-button"
                      key={service.id}
                      onClick={() =>
                        setSelectedService(service)
                      }
                    >

                      <div className="service-name">

                        <div className="service-icon">

                          <Server size={16} />

                        </div>


                        <div>

                          <strong>
                            {service.name}
                          </strong>

                          <span>
                            service-
                            {String(service.id).padStart(
                              3,
                              "0"
                            )}
                          </span>

                        </div>

                      </div>


                      <EnvironmentBadge
                        environment={
                          service.environment
                        }
                      />


                      <div className="service-status">

                        <span className="status-dot" />

                        {service.status}

                      </div>


                      <div className="service-version">

                        v{service.version}

                      </div>


                      <div className="service-uptime">

                        {service.uptime}

                      </div>

                    </button>

                  ))}


                  {services.length === 0 && (
                    <div className="incident-empty">

                      <div className="incident-empty-icon">

                        <Server size={19} />

                      </div>

                      <div>

                        <strong>
                          No services registered
                        </strong>

                        <span>
                          Waiting for service data
                          from the API.
                        </span>

                      </div>

                    </div>
                  )}

                </div>

              </section>

            </section>
        )}


        {/* =================================================
            SERVICE DETAILS
        ================================================= */}

        {activeSection === "services" &&
          selectedService && (

            <ServiceDetails
              service={selectedService}
              onBack={() =>
                setSelectedService(null)
              }
            />

        )}


        {/* =================================================
            DEPLOYMENTS
        ================================================= */}

        {activeSection === "deployments" &&
          !selectedDeployment && (

            <section className="section-page">


              {/* PAGE HEADER */}

              <div className="page-heading">

                <div>

                  <div className="eyebrow">
                    CLOUDOPS360 / DELIVERY
                  </div>

                  <h1>
                    Deployment <span>Center</span>
                  </h1>

                  <p>
                    Track CI/CD pipelines, application
                    releases and deployment health.
                  </p>

                </div>


                <div className="operations-badge">

                  <span className="operations-badge-dot" />

                  Pipeline Operational

                </div>

              </div>


              {/* DEPLOYMENT KPIs */}

              <section className="stats-grid">

                <StatCard
                  type="services"
                  label="TOTAL DEPLOYMENTS"
                  value={deployments.length}
                  description="Recent pipeline executions"
                  trend="+12 this week"
                />

                <StatCard
                  type="healthy"
                  label="SUCCESSFUL"
                  value={successfulDeployments}
                  description="Completed successfully"
                  trend="Stable"
                />

                <StatCard
                  type="incidents"
                  label="FAILED"
                  value={failedDeployments}
                  description="Requires investigation"
                  trend={
                    failedDeployments === 0
                      ? "All clear"
                      : "Review logs"
                  }
                />

                <StatCard
                  type="uptime"
                  label="SUCCESS RATE"
                  value={`${Math.round(
                    (successfulDeployments /
                      deployments.length) *
                      100
                  )}%`}
                  description="Pipeline success rate"
                  trend="CI/CD"
                />

              </section>


              {/* CI/CD PIPELINE */}

              <section className="panel">

                <div className="panel-header">

                  <div>

                    <div className="section-kicker">
                      CONTINUOUS DELIVERY
                    </div>

                    <div className="panel-title">
                      CI/CD Pipeline
                    </div>

                    <div className="panel-subtitle">
                      CloudOps360 automated delivery workflow
                    </div>

                  </div>


                  <div className="deployment-status">
                    ● ACTIVE
                  </div>

                </div>


                <div className="pipeline-flow">


                  {/* SOURCE */}

                  <div className="pipeline-stage">

                    <div className="pipeline-stage-icon">
                      <GitBranch size={17} />
                    </div>

                    <strong>
                      Git Push
                    </strong>

                    <span>
                      Source
                    </span>

                  </div>


                  <div className="pipeline-connector" />


                  {/* BUILD */}

                  <div className="pipeline-stage">

                    <div className="pipeline-stage-icon">
                      <Terminal size={17} />
                    </div>

                    <strong>
                      Build
                    </strong>

                    <span>
                      Compile
                    </span>

                  </div>


                  <div className="pipeline-connector" />


                  {/* TEST */}

                  <div className="pipeline-stage">

                    <div className="pipeline-stage-icon">
                      <CheckCircle2 size={17} />
                    </div>

                    <strong>
                      Test
                    </strong>

                    <span>
                      Automated
                    </span>

                  </div>


                  <div className="pipeline-connector" />


                  {/* SECURITY */}

                  <div className="pipeline-stage">

                    <div className="pipeline-stage-icon">
                      <ShieldCheck size={17} />
                    </div>

                    <strong>
                      Security Scan
                    </strong>

                    <span>
                      DevSecOps
                    </span>

                  </div>


                  <div className="pipeline-connector" />


                  {/* DOCKER */}

                  <div className="pipeline-stage">

                    <div className="pipeline-stage-icon">
                      <Container size={17} />
                    </div>

                    <strong>
                      Docker Build
                    </strong>

                    <span>
                      Image
                    </span>

                  </div>


                  <div className="pipeline-connector" />


                  {/* DEPLOY */}

                  <div className="pipeline-stage">

                    <div className="pipeline-stage-icon">
                      <Rocket size={17} />
                    </div>

                    <strong>
                      Deploy
                    </strong>

                    <span>
                      Environment
                    </span>

                  </div>


                  <div className="pipeline-connector" />


                  {/* HEALTH */}

                  <div className="pipeline-stage">

                    <div className="pipeline-stage-icon">
                      <Server size={17} />
                    </div>

                    <strong>
                      Health Check
                    </strong>

                    <span>
                      Verify
                    </span>

                  </div>

                </div>

              </section>


              {/* DEPLOYMENT HISTORY */}

              <section className="panel">

                <div className="panel-header">

                  <div>

                    <div className="section-kicker">
                      RELEASE HISTORY
                    </div>

                    <div className="panel-title">
                      Deployment Activity
                    </div>

                    <div className="panel-subtitle">
                      Recent application releases and
                      pipeline executions.
                    </div>

                  </div>


                  <div className="live-indicator">

                    <span />

                    LIVE

                  </div>

                </div>


                <div className="deployment-history">

                  {deployments.map(
                    (deployment) => (

                      <button
                        type="button"
                        key={deployment.id}
                        className="deployment-history-row"
                        onClick={() =>
                          setSelectedDeployment(
                            deployment
                          )
                        }
                      >

                        {/* ICON */}

                        <div className="deployment-history-icon">

                          <Rocket size={16} />

                        </div>


                        {/* RELEASE */}

                        <div className="deployment-history-main">

                          <strong>
                            {deployment.version}
                          </strong>

                          <span>
                            {deployment.branch}
                            {" · "}
                            {deployment.time}
                          </span>

                        </div>


                        {/* COMMIT */}

                        <div className="deployment-history-commit">

                          <GitCommit size={12} />

                          {" "}

                          {deployment.commit}

                        </div>


                        {/* STATUS */}

                        <div
                          className={`deployment-history-status ${
                            deployment.status
                          }`}
                        >

                          <span />

                          {deployment.status}

                        </div>


                        {/* DURATION */}

                        <div className="deployment-history-duration">

                          {deployment.duration}

                        </div>

                      </button>

                    )
                  )}

                </div>

              </section>

            </section>
        )}


        {/* =================================================
            DEPLOYMENT DETAILS
        ================================================= */}

        {activeSection === "deployments" &&
          selectedDeployment && (

            <DeploymentDetails
              deployment={selectedDeployment}
              onBack={() =>
                setSelectedDeployment(null)
              }
            />

        )}


        {/* =================================================
            FUTURE: INCIDENTS
        ================================================= */}

        {activeSection === "incidents" && (

          <section className="section-page">

            <div className="page-heading">

              <div>

                <div className="eyebrow">
                  CLOUDOPS360 / OPERATIONS
                </div>

                <h1>
                  Incident <span>Management</span>
                </h1>

                <p>
                  Incident detection, investigation,
                  recovery and operational history.
                </p>

              </div>

            </div>


            <section className="panel">

              <div className="panel-header">

                <div>

                  <div className="section-kicker">
                    INCIDENT CENTER
                  </div>

                  <div className="panel-title">
                    Incident Management
                  </div>

                  <div className="panel-subtitle">
                    This section will become the full
                    incident response workspace.
                  </div>

                </div>

              </div>


              <IncidentPanel />

            </section>

          </section>

        )}


        {/* =================================================
            FUTURE: MONITORING
        ================================================= */}

        {activeSection === "monitoring" && (

          <section className="section-page">

            <div className="page-heading">

              <div>

                <div className="eyebrow">
                  CLOUDOPS360 / OBSERVABILITY
                </div>

                <h1>
                  Monitoring <span>Analytics</span>
                </h1>

                <p>
                  Infrastructure and application
                  observability across CloudOps360.
                </p>

              </div>


              <div className="operations-badge">

                <span className="operations-badge-dot" />

                Monitoring Active

              </div>

            </div>


            <section className="dashboard-grid">

              <div className="panel">

                <div className="panel-header">

                  <div>

                    <div className="section-kicker">
                      INFRASTRUCTURE
                    </div>

                    <div className="panel-title">
                      Resource Metrics
                    </div>

                    <div className="panel-subtitle">
                      CPU and memory utilization
                    </div>

                  </div>

                </div>


                <MetricChart />

              </div>


              <div className="panel">

                <div className="panel-header">

                  <div>

                    <div className="section-kicker">
                      SERVICE HEALTH
                    </div>

                    <div className="panel-title">
                      Service Availability
                    </div>

                    <div className="panel-subtitle">
                      Current platform service state
                    </div>

                  </div>

                </div>


                <ServiceTable
                  services={services}
                />

              </div>

            </section>


            <section className="panel">

              <div className="panel-header">

                <div>

                  <div className="section-kicker">
                    OBSERVABILITY PLATFORM
                  </div>

                  <div className="panel-title">
                    Monitoring Workspace
                  </div>

                  <div className="panel-subtitle">
                    Advanced Power BI-style analytics,
                    Prometheus metrics, logs, traces and
                    infrastructure intelligence will be
                    added here.
                  </div>

                </div>

              </div>


              <div className="incident-empty">

                <div className="incident-empty-icon">

                  <Server size={19} />

                </div>

                <div>

                  <strong>
                    Observability dashboard foundation ready
                  </strong>

                  <span>
                    Prometheus, Grafana, Loki,
                    OpenTelemetry and alerting will be
                    connected in the next phase.
                  </span>

                </div>

              </div>

            </section>

          </section>

        )}

      </main>

    </div>
  );
}


export default Dashboard;