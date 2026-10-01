const express = require("express");

const {
  getMetrics,
  getServiceMetrics,
} = require("../controllers/metrics.controller");

const router = express.Router();

router.get("/", getMetrics);
router.get("/service/:serviceName", getServiceMetrics);

module.exports = router;