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
  const { name, longitude, latitude, description } = req.body;

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
  const id = req.params.id;
  const { name, longitude, latitude, description } = req.body;

  if (!name && !longitude && !latitude && !description) {
    return res.status(400).send("Bad Request: Missing required fields");
  }
  if (!id) {
    return res.status(400).send("Bad Request: Missing id");
  }
  try {
    const result = await client.query(
      "UPDATE locations SET location_name=$1, longitude=$2, latitude=$3, description=$4 WHERE id=$5 RETURNING *",
      [name, longitude, latitude, description, id]
    );
    if (result.rows.length === 0) {
      res.status(404).send({ message: "Location not found" });
    } else {
      res.status(200).send(result.rows[0]);
    }
  } catch (err) {
    return res.send("Error");
  }
};

export const deleteLocation = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).send("Bad Request: Missing id");
  }
  try {
    const result = await client.query(
      "DELETE FROM locations WHERE id=$1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res
        .status(404)
        .send("Not Found: No location with the provided id");
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    return res.send("Error");
  }
};
