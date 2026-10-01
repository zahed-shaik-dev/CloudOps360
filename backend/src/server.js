const express = require("express");
const cors = require("cors");

const config = require("./config/env");

// ------------------------------------------------------------
// API ROUTES
// ------------------------------------------------------------

const healthRoutes = require("./routes/health.routes");
const serviceRoutes = require("./routes/service.routes");
const deploymentRoutes = require("./routes/deployment.routes");
const incidentRoutes = require("./routes/incident.routes");
const metricsRoutes = require("./routes/metrics.routes");
const prometheusRoutes = require("./routes/prometheus.routes");

// ------------------------------------------------------------
// PROMETHEUS METRICS
// ------------------------------------------------------------

const {
  httpRequests,
  httpResponseTime,
} = require("./controllers/prometheus.controller");

// ------------------------------------------------------------
// ERROR HANDLER
// ------------------------------------------------------------

const errorHandler = require("./middleware/error.middleware");

// ------------------------------------------------------------
// EXPRESS APP
// ------------------------------------------------------------

const app = express();

// ------------------------------------------------------------
// GLOBAL MIDDLEWARE
// ------------------------------------------------------------

app.use(cors());

app.use(express.json());

// ------------------------------------------------------------
// PROMETHEUS HTTP REQUEST INSTRUMENTATION
// ------------------------------------------------------------
//
// Records:
// - HTTP request count
// - HTTP response time
// - HTTP method
// - HTTP status code
// - API route
//
// These metrics are exposed through:
// /api/metrics/prometheus
//

app.use((req, res, next) => {
  const start = process.hrtime();

  res.on("finish", () => {
    const diff = process.hrtime(start);

    const durationSeconds =
      diff[0] + diff[1] / 1e9;

    const route =
      req.route?.path || req.path;

    httpRequests.inc({
      method: req.method,
      route,
      status: res.statusCode,
    });

    httpResponseTime.observe(
      {
        method: req.method,
        route,
        status: res.statusCode,
      },
      durationSeconds
    );
  });

  next();
});

// ------------------------------------------------------------
// API ROUTES
// ------------------------------------------------------------

// Health and readiness
app.use("/api", healthRoutes);

// Services
app.use("/api/services", serviceRoutes);

// Deployments
app.use("/api/deployments", deploymentRoutes);

// Incidents
app.use("/api/incidents", incidentRoutes);

// Prometheus metrics
//
// IMPORTANT:
// This route is registered BEFORE /api/metrics
// so the Prometheus endpoint is handled correctly.
//

app.use(
  "/api/metrics/prometheus",
  prometheusRoutes
);

// Existing application metrics
app.use("/api/metrics", metricsRoutes);

// ------------------------------------------------------------
// ROOT API
// ------------------------------------------------------------

app.get("/", (req, res) => {
  res.json({
    name: "CloudOps360 API",
    version: "1.0.0",
    status: "running",
  });
});

// ------------------------------------------------------------
// ERROR HANDLER
// ------------------------------------------------------------

app.use(errorHandler);

// ------------------------------------------------------------
// SERVER
// ------------------------------------------------------------

app.listen(config.port, () => {
  console.log(
    `CloudOps360 API running on port ${config.port}`
  );
});
