const express = require("express");
const mongoose = require("mongoose");
const body_parser = require("body-parser");
const dotenv = require("dotenv");
const app = express();

dotenv.config();

app.get("/", (req, res) => {
  res.send("Hello");
});
app.listen(process.env.PORT, () =>
  console.log(`app runnning http://localhost:${process.env.PORT}`)
);
