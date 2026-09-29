import { useEffect, useState } from "react";

import Header from "../components/Header";
import StatCard from "../components/StatCard";
import ServiceTable from "../components/ServiceTable";
import { getServices } from "../services/api";

function Dashboard() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await getServices();
        setServices(data.services);
      } catch (err) {
        console.error(err);
        setError("Unable to connect to CloudOps360 API");
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  const healthyServices = services.filter(
    (service) => service.status === "healthy"
  ).length;

  return (
    <main className="main-content">
      <Header />

      <section className="stats-grid">
        <StatCard
          label="SERVICES"
          value={services.length}
          description="Registered services"
        />

        <StatCard
          label="HEALTHY"
          value={healthyServices}
          description="Currently operational"
        />

        <StatCard
          label="INCIDENTS"
          value="0"
          description="Active incidents"
        />

        <StatCard
          label="UPTIME"
          value="99.9%"
          description="Current availability"
        />
      </section>

      {loading && (
        <div className="message">
          Loading service health...
        </div>
      )}

      {error && (
        <div className="message error">
          {error}
        </div>
      )}

      {!loading && !error && (
        <ServiceTable services={services} />
      )}
    </main>
  );
}

export default Dashboard;