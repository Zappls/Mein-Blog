import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Client } = pkg;

// Database connection configuration
export const client = new Client({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Connect to the database
client
  .connect()
  .then(() => console.log("Connected to Supabase database"))
  .catch((err) => console.error("Supabase connection error", err.stack));
