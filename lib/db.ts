import { createPool, type Pool } from "mysql2/promise";

declare global {
  var mysqlPool: Pool | undefined;
}

function getPool() {
  if (!globalThis.mysqlPool) {
    globalThis.mysqlPool = createPool({
      host: process.env.DB_HOST || "127.0.0.1",
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "",
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      // Let MySQL convert legacy column encodings to UTF-8 for the app.
      charset: "utf8mb4",
    });
  }

  return globalThis.mysqlPool;
}

export default getPool;