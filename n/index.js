import express from "express";
import http from "http";
import path from "path";

const app = express();
const PORT = 8000;
const localhost2 = `http://localhost:${PORT}/`;

app.use("/uploads/images", express.static(path.join("uploads", "images")));
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json());
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(localhost2);
});
