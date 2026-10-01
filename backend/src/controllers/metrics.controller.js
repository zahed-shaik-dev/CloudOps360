const pool = require("../db/pool");

async function getMetrics(req, res, next) {
  try {
    const result = await pool.query(`
      SELECT
        id,
        service_name,
        cpu_usage,
        memory_usage,
        response_time,
        requests_per_minute,
        recorded_at
      FROM metrics
      ORDER BY recorded_at DESC
    `);

    res.json({
      success: true,
      metrics: result.rows,
    });
  } catch (error) {
    next(error);
  }
}

async function getServiceMetrics(req, res, next) {
  try {
    const { serviceName } = req.params;

    const result = await pool.query(
      `
      SELECT
        id,
        service_name,
        cpu_usage,
        memory_usage,
        response_time,
        requests_per_minute,
        recorded_at
      FROM metrics
      WHERE service_name = $1
      ORDER BY recorded_at DESC
      `,
      [serviceName]
    );

    res.json({
      success: true,
      metrics: result.rows,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getMetrics,
  getServiceMetrics,
};