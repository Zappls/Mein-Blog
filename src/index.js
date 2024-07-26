import express from "express";
import {
  getAllLocations,
  addLocation,
  updateLocation,
  deleteLocation,
} from "./routes/locations.js";
import { health } from "./routes/health.js";

const app = express();

app.use(express.json());

const port = 3000;

app.get("/health", health);

app.get("/locations", getAllLocations);

app.post("/locations", addLocation);

app.put("/locations", updateLocation);

app.delete("/locations", deleteLocation);

app.listen(port, () => {
  console.log(`Listening to http://localhost:${port}`);
});
