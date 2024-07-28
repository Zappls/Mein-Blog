import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

// // Database connection configuration
// export const client = new Client({
//   host: process.env.DATABASE_HOST,
//   port: process.env.DATABASE_PORT,
//   user: process.env.DATABASE_USER,
//   password: process.env.DATABASE_PASSWORD,
//   database: process.env.DATABASE_NAME,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

// // Connect to the database
// client
//   .connect()
//   .then(() => console.log("Connected to Supabase database"))
//   .catch((err) => console.error("Supabase connection error", err.stack));
