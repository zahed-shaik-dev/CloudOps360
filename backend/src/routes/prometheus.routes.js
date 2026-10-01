const express = require("express");

const {
  prometheusMetrics,
} = require("../controllers/prometheus.controller");

const router = express.Router();

router.get("/", prometheusMetrics);

module.exports = router;