import { useCallback, useEffect, useState } from "react";

import Header from "../components/Header";
import StatCard from "../components/StatCard";
import ServiceTable from "../components/ServiceTable";
import MetricChart from "../components/MetricChart";
import DeploymentActivity from "../components/DeploymentActivity";
import IncidentPanel from "../components/IncidentPanel";

import { getServices } from "../services/api";

function Dashboard() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const loadServices = useCallback(async () => {
    try {
      setError("");

      const data = await getServices();

      setServices(Array.isArray(data) ? data : data.services || []);
    } catch (error) {
      console.error(error);

      setError("Unable to connect to the CloudOps360 API.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadServices();
  }, [loadServices]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadServices();
  };

  const healthyServices = services.filter(
    (service) => service.status?.toLowerCase() === "healthy",
  ).length;

  const healthPercentage =
    services.length > 0
      ? Math.round((healthyServices / services.length) * 100)
      : 0;

  return (
    <div className="dashboard-shell">
      <Header onRefresh={handleRefresh} refreshing={refreshing} />

      <main className="dashboard-content">
        {/* HERO */}

        <section className="dashboard-hero">
          <div className="hero-copy">
            <div className="eyebrow">CLOUDOPS360 / OPERATIONS</div>

            <h1>
              Infrastructure
              <span> Overview</span>
            </h1>

            <p>
              Monitor services, deployments, infrastructure health and
              operational signals from one centralized platform.
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
            <strong>Connection Error</strong>

            <span>{error}</span>

            <button type="button" onClick={handleRefresh}>
              Retry
            </button>
          </div>
        )}

        {/* DASHBOARD */}

        {!loading && !error && (
          <>
            {/* KPI */}

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

            {/* SERVICES */}

            <section className="panel service-panel">
              <div className="panel-header">
                <div>
                  <div className="section-kicker">SERVICE CATALOG</div>

                  <div className="panel-title">Service Health</div>

                  <div className="panel-subtitle">
                    Real-time application service status
                  </div>
                </div>

                <div className="live-indicator">
                  <span />
                  LIVE
                </div>
              </div>

              <ServiceTable services={services} />
            </section>

            {/* INFRASTRUCTURE + DEPLOYMENTS */}

            <section className="dashboard-grid">
              <div className="panel">
                <div className="panel-header">
                  <div>
                    <div className="section-kicker">INFRASTRUCTURE</div>

                    <div className="panel-title">Resource Utilization</div>

                    <div className="panel-subtitle">
                      CPU and memory performance
                    </div>
                  </div>

                  <div className="metric-status">DEMO METRICS</div>
                </div>

                <MetricChart />
              </div>

              <div className="panel">
                <div className="panel-header">
                  <div>
                    <div className="section-kicker">DELIVERY</div>

                    <div className="panel-title">Recent Deployments</div>

                    <div className="panel-subtitle">
                      Application release activity
                    </div>
                  </div>

                  <div className="deployment-status">● ACTIVE</div>
                </div>

                <DeploymentActivity />
              </div>
            </section>

            {/* INCIDENTS */}

            <section className="panel incident-panel">
              <div className="panel-header">
                <div>
                  <div className="section-kicker">INCIDENT MANAGEMENT</div>

                  <div className="panel-title">System Status</div>

                  <div className="panel-subtitle">
                    Operational events and incidents
                  </div>
                </div>

                <div className="incident-count">0 ACTIVE</div>
              </div>

              <IncidentPanel />
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
