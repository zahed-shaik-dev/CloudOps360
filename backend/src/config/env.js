require("dotenv").config();

const config = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 5000,

  database: {
    host: process.env.DATABASE_HOST || "localhost",
    port: Number(process.env.DATABASE_PORT) || 5432,
    name: process.env.DATABASE_NAME || "cloudops360",
    user: process.env.DATABASE_USER || "cloudops",
    password: process.env.DATABASE_PASSWORD || "cloudops_password",
  },
};

module.exports = config;