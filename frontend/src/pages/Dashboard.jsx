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

import {
  getServices,
  getDeployments,
  getIncidents,
  getMetrics,
} from "../services/api";


/* =========================================================
   DASHBOARD
========================================================= */

function Dashboard({ activeSection = "overview" }) {
  /* =======================================================
     STATE
  ======================================================= */

  const [services, setServices] = useState([]);
  const [deployments, setDeployments] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [metrics, setMetrics] = useState([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const [selectedService, setSelectedService] = useState(null);
  const [selectedDeployment, setSelectedDeployment] =
    useState(null);


  /* =======================================================
     LOAD API DATA
  ======================================================= */

  const loadDashboardData = useCallback(async () => {
    try {
      setError("");

      const [
        servicesResponse,
        deploymentsResponse,
        incidentsResponse,
        metricsResponse,
      ] = await Promise.all([
        getServices(),
        getDeployments(),
        getIncidents(),
        getMetrics(),
      ]);


      /* ---------------------------------------------------
         SERVICES
      --------------------------------------------------- */

      const serviceList = Array.isArray(servicesResponse)
        ? servicesResponse
        : Array.isArray(servicesResponse?.services)
          ? servicesResponse.services
          : [];


      /* ---------------------------------------------------
         DEPLOYMENTS
      --------------------------------------------------- */

      const deploymentList = Array.isArray(
        deploymentsResponse
      )
        ? deploymentsResponse
        : Array.isArray(
            deploymentsResponse?.deployments
          )
          ? deploymentsResponse.deployments
          : [];

      const normalizedDeployments =
        deploymentList.map((deployment, index) => ({
          ...deployment,

          id:
            deployment.id ??
            `deployment-${index}`,

          serviceId:
            deployment.service_id ??
            deployment.serviceId ??
            null,

          serviceName:
            deployment.service_name ??
            deployment.serviceName ??
            "Unknown Service",

          environment:
            deployment.environment ??
            "production",

          version:
            deployment.version ??
            "unknown",

          branch:
            deployment.branch ??
            "main",

          commit:
            deployment.commit ??
            deployment.commit_hash ??
            "unknown",

          author:
            deployment.author ??
            deployment.deployed_by ??
            "CloudOps360",

          deployedAt:
            deployment.deployed_at ??
            deployment.deployedAt ??
            null,

          time:
            deployment.time ??
            formatRelativeTime(
              deployment.deployed_at ??
              deployment.deployedAt
            ),

          duration:
            deployment.duration ??
            "—",

          status:
            normalizeDeploymentStatus(
              deployment.status
            ),
        }));


      /* ---------------------------------------------------
         INCIDENTS
      --------------------------------------------------- */

      const incidentList = Array.isArray(
        incidentsResponse
      )
        ? incidentsResponse
        : Array.isArray(
            incidentsResponse?.incidents
          )
          ? incidentsResponse.incidents
          : [];


      /* ---------------------------------------------------
         METRICS
      --------------------------------------------------- */

      const metricList = Array.isArray(
        metricsResponse
      )
        ? metricsResponse
        : Array.isArray(
            metricsResponse?.metrics
          )
          ? metricsResponse.metrics
          : [];


      /* ---------------------------------------------------
         UPDATE STATE
      --------------------------------------------------- */

      setServices(serviceList);
      setDeployments(normalizedDeployments);
      setIncidents(incidentList);
      setMetrics(metricList);

    } catch (err) {
      console.error(
        "Failed to load CloudOps360 dashboard data:",
        err
      );

      setError(
        "Unable to connect to the CloudOps360 API."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);


  /* =======================================================
     INITIAL LOAD
  ======================================================= */

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);


  /* =======================================================
     REFRESH
  ======================================================= */

  const handleRefresh = async () => {
    if (refreshing) {
      return;
    }

    setRefreshing(true);

    await loadDashboardData();
  };


  /* =======================================================
     SERVICE METRICS
  ======================================================= */

  const healthyServices = services.filter(
    (service) =>
      String(service.status || "").toLowerCase() ===
      "healthy"
  ).length;

  const unhealthyServices = services.filter(
    (service) =>
      [
        "unhealthy",
        "critical",
        "down",
      ].includes(
        String(service.status || "").toLowerCase()
      )
  ).length;

  const healthPercentage =
    services.length > 0
      ? Math.round(
          (healthyServices / services.length) * 100
        )
      : 0;


  /* =======================================================
     INCIDENT METRICS
  ======================================================= */

  const activeIncidents = incidents.filter(
    (incident) =>
      ![
        "resolved",
        "closed",
      ].includes(
        String(incident.status || "").toLowerCase()
      )
  );

  const activeIncidentCount =
    activeIncidents.length;


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

  const deploymentSuccessRate =
    deployments.length > 0
      ? Math.round(
          (successfulDeployments /
            deployments.length) *
            100
        )
      : 0;


  /* =======================================================
     MAIN RETURN
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
                  disabled={refreshing}
                >
                  {refreshing
                    ? "Retrying..."
                    : "Retry"}
                </button>

              </div>
            )}


            {/* OVERVIEW CONTENT */}

            {!loading && !error && (
              <>

                {/* STATS */}

                <section className="stats-grid">

                  <StatCard
                    type="services"
                    label="SERVICES"
                    value={services.length}
                    description="Registered services"
                    trend="Connected"
                  />

                  <StatCard
                    type="healthy"
                    label="HEALTHY"
                    value={`${healthPercentage}%`}
                    description="Currently operational"
                    trend={
                      healthPercentage === 100
                        ? "All systems healthy"
                        : "Review services"
                    }
                  />

                  <StatCard
                    type="incidents"
                    label="INCIDENTS"
                    value={activeIncidentCount}
                    description="Active incidents"
                    trend={
                      activeIncidentCount === 0
                        ? "No active alerts"
                        : "Investigation required"
                    }
                  />

                  <StatCard
                    type="uptime"
                    label="UPTIME"
                    value="99.9%"
                    description="Current availability"
                    trend="Operational"
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
                        Real-time application service
                        status
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


                {/* RESOURCE + DEPLOYMENTS */}

                <section className="dashboard-grid">


                  {/* RESOURCE UTILIZATION */}

                  <div className="panel monitoring-chart-panel">

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
                        LIVE METRICS
                      </div>

                    </div>

                    <MetricChart
                      metrics={metrics}
                    />

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

                    <DeploymentActivity
                      deployments={deployments}
                    />

                  </div>

                </section>


                {/* INCIDENT STATUS */}

                <section className="panel incident-panel">

                  <IncidentPanel
                    incidents={incidents}
                  />

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

              <section className="panel service-inventory-panel">

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

                  {services.map((service, index) => (

                    <button
                      type="button"
                      className="service-row service-row-button"
                      key={
                        service.id ??
                        `service-${index}`
                      }
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
                            {service.name ||
                              "Unknown Service"}
                          </strong>

                          <span>
                            service-
                            {String(
                              service.id ??
                              index + 1
                            ).padStart(
                              3,
                              "0"
                            )}
                          </span>

                        </div>

                      </div>


                      <EnvironmentBadge
                        environment={
                          service.environment ||
                          "production"
                        }
                      />


                      <div className="service-status">

                        <span className="status-dot" />

                        {service.status ||
                          "unknown"}

                      </div>


                      <div className="service-version">
                        v{service.version || "unknown"}
                      </div>


                      <div className="service-uptime">
                        {service.uptime || "—"}
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
                  description="Pipeline executions"
                  trend="Database connected"
                />

                <StatCard
                  type="healthy"
                  label="SUCCESSFUL"
                  value={successfulDeployments}
                  description="Completed successfully"
                  trend="CI/CD"
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
                  value={`${deploymentSuccessRate}%`}
                  description="Pipeline success rate"
                  trend="CI/CD"
                />

              </section>


              {/* CI/CD PIPELINE */}

              <section className="panel deployment-pipeline-panel">

                <div className="panel-header">

                  <div>

                    <div className="section-kicker">
                      CONTINUOUS DELIVERY
                    </div>

                    <div className="panel-title">
                      CI/CD Pipeline
                    </div>

                    <div className="panel-subtitle">
                      CloudOps360 automated delivery
                      workflow
                    </div>

                  </div>

                  <div className="deployment-status">
                    ● ACTIVE
                  </div>

                </div>


                <div className="pipeline-flow">

                  <PipelineStage
                    icon={<GitBranch size={17} />}
                    title="Git Push"
                    subtitle="Source"
                  />

                  <div className="pipeline-connector" />

                  <PipelineStage
                    icon={<Terminal size={17} />}
                    title="Build"
                    subtitle="Compile"
                  />

                  <div className="pipeline-connector" />

                  <PipelineStage
                    icon={<CheckCircle2 size={17} />}
                    title="Test"
                    subtitle="Automated"
                  />

                  <div className="pipeline-connector" />

                  <PipelineStage
                    icon={<ShieldCheck size={17} />}
                    title="Security Scan"
                    subtitle="DevSecOps"
                  />

                  <div className="pipeline-connector" />

                  <PipelineStage
                    icon={<Container size={17} />}
                    title="Docker Build"
                    subtitle="Image"
                  />

                  <div className="pipeline-connector" />

                  <PipelineStage
                    icon={<Rocket size={17} />}
                    title="Deploy"
                    subtitle="Environment"
                  />

                  <div className="pipeline-connector" />

                  <PipelineStage
                    icon={<Server size={17} />}
                    title="Health Check"
                    subtitle="Verify"
                  />

                </div>

              </section>


              {/* DEPLOYMENT HISTORY */}

              <section className="panel deployment-history-panel">

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
                    (deployment, index) => (

                      <button
                        type="button"
                        key={
                          deployment.id ??
                          `deployment-${index}`
                        }
                        className="deployment-history-row"
                        onClick={() =>
                          setSelectedDeployment(
                            deployment
                          )
                        }
                        aria-label={`View deployment ${
                          deployment.version
                        }`}
                      >

                        <div className="deployment-history-icon">
                          <Rocket size={16} />
                        </div>


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


                        <div className="deployment-history-commit">

                          <GitCommit size={12} />

                          <span>
                            {deployment.commit}
                          </span>

                        </div>


                        <div
                          className={`deployment-history-status ${
                            deployment.status
                          }`}
                        >

                          <span />

                          {deployment.status}

                        </div>


                        <div className="deployment-history-duration">
                          {deployment.duration}
                        </div>

                      </button>

                    )
                  )}


                  {deployments.length === 0 && (
                    <div className="incident-empty">

                      <div className="incident-empty-icon">
                        <Rocket size={19} />
                      </div>

                      <div>

                        <strong>
                          No deployments found
                        </strong>

                        <span>
                          Deployment history will
                          appear here when available.
                        </span>

                      </div>

                    </div>
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
            INCIDENTS
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

              <div className="operations-badge">

                <span className="operations-badge-dot" />

                {activeIncidentCount === 0
                  ? "No Active Incidents"
                  : `${activeIncidentCount} Active Incident${
                      activeIncidentCount > 1
                        ? "s"
                        : ""
                    }`}

              </div>

            </div>


            <section className="panel">

              <IncidentPanel
                incidents={incidents}
              />

            </section>

          </section>

        )}


        {/* =================================================
            MONITORING
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


            {/* MONITORING GRID */}

            <section className="dashboard-grid">

              <div className="panel monitoring-chart-panel">

                <div className="panel-header">

                  <div>

                    <div className="section-kicker">
                      INFRASTRUCTURE METRICS
                    </div>

                    <div className="panel-title">
                      Resource Utilization
                    </div>

                    <div className="panel-subtitle">
                      Live metrics from CloudOps360
                    </div>

                  </div>

                  <div className="metric-status">
                    LIVE
                  </div>

                </div>

                <MetricChart
                  metrics={metrics}
                />

              </div>


              <div className="panel monitoring-service-panel">

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

                  <div className="live-indicator">
                    <span />
                    LIVE
                  </div>

                </div>

                <ServiceTable
                  services={services}
                />

              </div>

            </section>


            {/* OBSERVABILITY WORKSPACE */}

            <section className="panel observability-workspace">

              <div className="panel-header">

                <div>

                  <div className="section-kicker">
                    OBSERVABILITY PLATFORM
                  </div>

                  <div className="panel-title">
                    Monitoring Workspace
                  </div>

                  <div className="panel-subtitle">
                    Advanced infrastructure and
                    application observability workspace.
                  </div>

                </div>

                <div className="metric-status">
                  ROADMAP
                </div>

              </div>


              <div className="observability-placeholder">

                <div className="incident-empty-icon">
                  <Server size={19} />
                </div>

                <div>

                  <strong>
                    Observability foundation ready
                  </strong>

                  <span>
                    Prometheus, Grafana, Loki,
                    OpenTelemetry, alerting and
                    advanced analytics will be
                    connected here.
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


/* =========================================================
   PIPELINE STAGE
========================================================= */

function PipelineStage({
  icon,
  title,
  subtitle,
}) {
  return (
    <div className="pipeline-stage">

      <div className="pipeline-stage-icon">
        {icon}
      </div>

      <strong>
        {title}
      </strong>

      <span>
        {subtitle}
      </span>

    </div>
  );
}


/* =========================================================
   DEPLOYMENT STATUS NORMALIZER
========================================================= */

function normalizeDeploymentStatus(status) {
  const normalized =
    String(status || "")
      .trim()
      .toLowerCase()
      .replace(/[\s_-]+/g, "");

  if (
    [
      "successful",
      "success",
      "succeeded",
      "completed",
      "complete",
      "passed",
    ].includes(normalized)
  ) {
    return "success";
  }

  if (
    [
      "failed",
      "failure",
      "error",
      "cancelled",
      "canceled",
    ].includes(normalized)
  ) {
    return "failed";
  }

  if (
    [
      "running",
      "inprogress",
      "pending",
      "queued",
      "deploying",
    ].includes(normalized)
  ) {
    return "running";
  }

  return normalized || "unknown";
}


/* =========================================================
   RELATIVE TIME FORMATTER
========================================================= */

function formatRelativeTime(timestamp) {
  if (!timestamp) {
    return "Unknown time";
  }

  const date = new Date(timestamp);

  if (Number.isNaN(date.getTime())) {
    return "Unknown time";
  }

  const now = new Date();

  const difference = Math.floor(
    (now.getTime() - date.getTime()) / 1000
  );

  if (difference < 0) {
    return "Just now";
  }

  if (difference < 60) {
    return "Just now";
  }

  const minutes = Math.floor(
    difference / 60
  );

  if (minutes < 60) {
    return `${minutes} minute${
      minutes === 1 ? "" : "s"
    } ago`;
  }

  const hours = Math.floor(
    minutes / 60
  );

  if (hours < 24) {
    return `${hours} hour${
      hours === 1 ? "" : "s"
    } ago`;
  }

  const days = Math.floor(
    hours / 24
  );

  if (days < 7) {
    return `${days} day${
      days === 1 ? "" : "s"
    } ago`;
  }

  return date.toLocaleDateString();
}


/* =========================================================
   EXPORT
========================================================= */

export default Dashboard;
