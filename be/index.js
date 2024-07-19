import express from "express";
import dotenv from "dotenv";
import http from "http";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";

import routes from "./src/routes/routes.js";
import { registerSocketServer } from "./src/beIo/beIo.js";

dotenv.config();
const PORT = process.env.PORT || process.env.API_PORT;
export const localhost = `http://localhost:${PORT}/`;

const app = express();
app.use("/uploads/images", express.static(path.join("uploads", "images")));
app.use(express.json());
app.use(cors());

const server = http.createServer(app);

registerSocketServer(server);

mongoose
  .set("strictQuery", true)
  .connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(PORT, () => {
      console.log(localhost + " connected to db");
    });
  })
  .catch((err) => {
    console.log("Db and server fail" + err);
  });

app.use("/", routes);
