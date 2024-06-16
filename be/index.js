import express from "express";
import dotenv from "dotenv";
import http from "http";
import cors from "cors";
import mongoose from "mongoose";

import User from "./src/routes/controller/models/User.js";

import userRoutes from "./src/routes/userRoutes.js";
import { registerSocketServer } from "./src/beIo/beIo.js";

dotenv.config();
const PORT = process.env.PORT || process.env.API_PORT;
const app = express();
app.use(express.json());
app.use(cors());
const server = http.createServer(app);

registerSocketServer(server);

mongoose
  .set("strictQuery", true)
  .connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`http://localhost:` + PORT + " connected to db");
    });
  })
  .catch((err) => {
    console.log("Db and server fail" + err);
  });

app.get("/", (req, res) => {
  return res.json("Hello Earth");
});

app.use("/", userRoutes);
