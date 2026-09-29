import { createPool, type Pool } from "mysql2/promise";

declare global {
  var mysqlPool: Pool | undefined;
}

function getPool(): Pool {
  if (!process.env.DB_NAME || !process.env.DB_HOST) {
    throw new Error("DB not configured — falling back to bundled data");
  }

  if (!globalThis.mysqlPool) {
    try {
      globalThis.mysqlPool = createPool({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT || 3306),
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "",
        database: process.env.DB_NAME,
        waitForConnections: false,
        connectTimeout: 2000,
        connectionLimit: 10,
        queueLimit: 0,
        // Let MySQL convert legacy column encodings to UTF-8 for the app.
        charset: "utf8mb4",
      });
    } catch {
      throw new Error("DB connection failed — falling back to bundled data");
    }
  }

  return globalThis.mysqlPool;
}

export default getPool;