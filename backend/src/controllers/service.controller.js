const pool = require("../db/pool");

const getServices = async (req, res, next) => {
  try {
    const result = await pool.query(`
      SELECT
        id,
        name,
        environment,
        status,
        version,
        uptime,
        created_at
      FROM services
      ORDER BY id;
    `);

    res.status(200).json({
      success: true,
      count: result.rows.length,
      services: result.rows,
    });
  } catch (error) {
    next(error);
  }
};

const getServiceById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      SELECT
        id,
        name,
        environment,
        status,
        version,
        uptime,
        created_at
      FROM services
      WHERE id = $1;
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.status(200).json({
      success: true,
      service: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getServices,
  getServiceById,
};