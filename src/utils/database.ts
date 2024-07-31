import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { Database } from "../types/database.types";

dotenv.config();

const supabaseUrl: string = process.env.SUPABASE_URL!;
const supabaseKey: string = process.env.SUPABASE_KEY!;

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;
