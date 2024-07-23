import { client } from "../utils/database.js";

export const getAllLocations = async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM locations");
    return res.json(result.rows);
  } catch (err) {
    return res.status(500).json({ error: "An unexpected error occurred" });
  }
};

export const addLocation = async (req, res) => {
  const { name, latitude, longitude, description } = req.body;

  if (!name || !latitude || !longitude || !description) {
    return res.status(400).send("Bad Request: Missing required fields");
  }

  try {
    const result = await client.query(
      "INSERT INTO locations (location_name, latitude, longitude, description) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, latitude, longitude, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    return res.send("Error");
  }
};
