const express = require("express");

const {
  getDeployments,
  getDeploymentById,
} = require("../controllers/deployment.controller");

const router = express.Router();

router.get("/", getDeployments);
router.get("/:id", getDeploymentById);

module.exports = router;