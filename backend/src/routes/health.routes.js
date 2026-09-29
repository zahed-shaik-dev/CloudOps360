const express = require("express");

const {
  healthCheck,
  readinessCheck,
} = require("../controllers/health.controller");

const router = express.Router();

router.get("/health", healthCheck);
router.get("/ready", readinessCheck);

module.exports = router;