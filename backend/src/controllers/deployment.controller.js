const pool = require("../db/pool");

async function getDeployments(req, res, next) {
  try {
    const result = await pool.query(`
      SELECT
        id,
        service_id,
        service_name,
        environment,
        version,
        status,
        branch,
        commit_hash,
        deployed_by,
        deployed_at
      FROM deployments
      ORDER BY deployed_at DESC
    `);

    res.json({
      success: true,
      deployments: result.rows,
    });
  } catch (error) {
    next(error);
  }
}

async function getDeploymentById(req, res, next) {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      SELECT
        id,
        service_id,
        service_name,
        environment,
        version,
        status,
        branch,
        commit_hash,
        deployed_by,
        deployed_at
      FROM deployments
      WHERE id = $1
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Deployment not found",
      });
    }

    res.json({
      success: true,
      deployment: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getDeployments,
  getDeploymentById,
};