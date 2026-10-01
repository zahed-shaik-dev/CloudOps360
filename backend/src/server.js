const express = require("express");
const cors = require("cors");

const config = require("./config/env");

const healthRoutes = require("./routes/health.routes");
const serviceRoutes = require("./routes/service.routes");
const deploymentRoutes = require("./routes/deployment.routes");
const incidentRoutes = require("./routes/incident.routes");
const metricsRoutes = require("./routes/metrics.routes");

const errorHandler = require("./middleware/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());


// ------------------------------------------------------------
// API ROUTES
// ------------------------------------------------------------

app.use("/api", healthRoutes);

app.use("/api/services", serviceRoutes);

app.use("/api/deployments", deploymentRoutes);

app.use("/api/incidents", incidentRoutes);

app.use("/api/metrics", metricsRoutes);


// ------------------------------------------------------------
// ROOT
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
  console.log(`CloudOps360 API running on port ${config.port}`);
});