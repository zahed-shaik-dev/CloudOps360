const pool = require("../db/pool");

const healthCheck = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT NOW() AS time");

    res.status(200).json({
      status: "healthy",
      service: "cloudops360-api",
      database: "connected",
      timestamp: result.rows[0].time,
    });
  } catch (error) {
    next(error);
  }
};

const readinessCheck = async (req, res, next) => {
  try {
    await pool.query("SELECT 1");

    res.status(200).json({
      status: "ready",
      service: "cloudops360-api",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  healthCheck,
  readinessCheck,
};