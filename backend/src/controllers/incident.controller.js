const pool = require("../db/pool");

async function getIncidents(req, res, next) {
  try {
    const result = await pool.query(`
      SELECT
        id,
        title,
        severity,
        status,
        service_name,
        description,
        created_at,
        resolved_at
      FROM incidents
      ORDER BY created_at DESC
    `);

    res.json({
      success: true,
      incidents: result.rows,
    });
  } catch (error) {
    next(error);
  }
}

async function getIncidentById(req, res, next) {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      SELECT
        id,
        title,
        severity,
        status,
        service_name,
        description,
        created_at,
        resolved_at
      FROM incidents
      WHERE id = $1
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Incident not found",
      });
    }

    res.json({
      success: true,
      incident: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getIncidents,
  getIncidentById,
};