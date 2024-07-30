import supabase from "../utils/database";
import { Request, Response } from "express";

interface Location {
  id: number;
  name: string;
  longitude: number;
  latitude: number;
  description: string;
  // Add other fields that your `locations` table has
}

export const getAllLocations = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from<Location>("locations")
      .select("*");
    if (error) {
      throw error;
    }
    return res.json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "An unexpected error occurred" });
  }
};

export const addLocation = async (req: Request, res: Response) => {
  const { name, longitude, latitude, description } = req.body;

  if (!name || !longitude || !latitude || !description) {
    return res.status(400).send("Bad Request: Missing required fields");
  }

  try {
    const { data, error } = await supabase
      .from<Location>("locations")
      .insert([{ location_name: name, longitude, latitude, description }])
      .single();
    if (error) {
      throw error;
    }
    return res.status(201).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "An unexpected error occurred" });
  }
};

export const updateLocation = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, longitude, latitude, description } = req.body;

  if (!name && !longitude && !latitude && !description) {
    return res.status(400).send("Bad Request: Missing required fields");
  }
  if (!id) {
    return res.status(400).send("Bad Request: Missing id");
  }
  try {
    const { data, error } = await supabase
      .from<Location>("locations")
      .update(req.body)
      .eq("id", id);
    if (data === null || data.length === 0) {
      res.status(404).send({ message: "Location not found" });
    } else {
      res.status(200).send(data.rows[0]);
    }
  } catch (err) {
    return res.send("Error");
  }
};

export const deleteLocation = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).send("Bad Request: Missing id");
  }
  try {
    const { data, error } = await supabase
      .from<Location>("locations")
      .delete()
      .eq("id", id);
    if (data.rows.length === 0) {
      return res
        .status(404)
        .send("Not Found: No location with the provided id");
    }
    res.status(200).json(data.rows[0]);
  } catch (err) {
    return res.send("Error");
  }
};
