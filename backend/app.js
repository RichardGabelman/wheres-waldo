const express = require("express");
const apiRouter = require("./src/routes/api.js");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: "http://localhost:5173" }));

app.use("/api", apiRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({ error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Where's Waldo API - listening on port ${PORT}!`);
});