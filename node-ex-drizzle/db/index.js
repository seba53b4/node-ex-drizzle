import { drizzle } from "drizzle-orm/node-postgres";
import pkg from "pg";
import * as schema from "./schema.js";

const { Pool } = pkg;

const pool = new Pool({
  host: "localhost",
  port: 25432,
  user: "appuser",
  password: "appuser",
  database: "node_ex_drizzle",
});

export const db = drizzle(pool, { schema });
