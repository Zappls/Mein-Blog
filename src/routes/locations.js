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
  const { name, longitude, latitude, description) } = req.body;

  if (!name || !longitude || !latitude || !description) {
    return res.status(400).send("Bad Request: Missing required fields");
  }

  try {
    const result = await client.query(
      "INSERT INTO locations (location_name, longitude, latitude, description) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, longitude, latitude, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    return res.send("Error");
  }
};

export const updateLocation = async (req, res) => {
  const { id, name, longitude, latitude, description } = req.body;

  if (!id || (!name && !longitude && !latitude && !description)) {
    return res.status(400).send("Bad Request: Missing required fields");
}
  try {
    const result = await client.query(
      "UPDATE locations SET location_name=$2, longitude=$3, latitude=$4, description=$5 WHERE id=$1", 
      [id, name, longitude, latitude, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    return res.send("Error");
  }
};