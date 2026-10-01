const express = require("express");

const {
  getIncidents,
  getIncidentById,
} = require("../controllers/incident.controller");

const router = express.Router();

router.get("/", getIncidents);
router.get("/:id", getIncidentById);

module.exports = router;