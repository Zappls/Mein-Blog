
import express from 'express';
import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Client } = pkg;

const app = express();

const port = 3000;

// Database connection configuration
const client = new Client({
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
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Listening to http://localhost:${port}`);
});

// Example route to query the database
app.get('/locations', async (req, res) => {
    try {
      const result = await client.query('SELECT * FROM locations');
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });