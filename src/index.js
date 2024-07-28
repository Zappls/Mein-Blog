import express from "express";
import {
  getAllLocations,
  addLocation,
  updateLocation,
  deleteLocation,
} from "./routes/locations.js";
import { health } from "./routes/health.js";
import { login, logout } from "./utils/authentication.js";
const app = express();

app.use(express.json());

const port = 3000;

app.get("/health", health);

app.post("/auth/login", login);

app.post("/auth/logout", logout);

app.get("/locations", getAllLocations);

app.post("/locations", addLocation);

app.put("/locations/:id", updateLocation);

app.delete("/locations/:id", deleteLocation);

app.listen(port, () => {
  console.log(`Listening to http://localhost:${port}`);
});
