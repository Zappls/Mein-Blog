import { app, client } from ".";

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
