import { app, client } from ".";

export function postfunction() {
  app.post('/locations', async (req, res) => {

  try {
    const result = await client.query('INSERT INTO locations (location_name, latitude, longitude, description) VALUES ($1, $2, $3, $4)',
      [locationName, latitude, longitude, description]);
    return res.json(result.rows);
  } catch (err) {
    console.error(err);
    return res.send('Error');
  }
});
}
