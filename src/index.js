import express from "express";
import { getAllLocations, addLocation } from "./routes/locations.js";
import { health } from "./routes/health.js";

const app = express();

app.use(express.json());

const port = 3000;

app.get("/health", health);

app.get("/locations", getAllLocations);

app.post("/locations", addLocation);

app.listen(port, () => {
  console.log(`Listening to http://localhost:${port}`);
});
