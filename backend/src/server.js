const express = require("express");
const cors = require("cors");

const config = require("./config/env");
const healthRoutes = require("./routes/health.routes");
const serviceRoutes = require("./routes/service.routes");
const errorHandler = require("./middleware/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", healthRoutes);
app.use("/api/services", serviceRoutes);

app.get("/", (req, res) => {
  res.json({
    name: "CloudOps360 API",
    version: "1.0.0",
    status: "running",
  });
});

app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`CloudOps360 API running on port ${config.port}`);
});