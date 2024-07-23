
import express from 'express';
import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Client } = pkg;

export const app = express();

const port = 3000;

// Database connection configuration
export const client = new Client({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    ssl: {
      rejectUnauthorized: false
    }
});

// Connect to the database
client.connect()
  .then(() => console.log('Connected to Supabase database'))
  .catch(err => console.error('Connection error', err.stack));

app.get('/', (req, res) => {
    res.send('Welcome to my Website');
});

app.listen(port, () => {
    console.log(`Listening to http://localhost:${port}`);
});


