const express = require("express");
const mongoose = require("mongoose");
const body_parser = require("body-parser");
const dotenv = require("dotenv");
const app = express();

// middalware
dotenv.config();
const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(body_parser.json());

// database connection
const db = async () => {
  try {
    await mongoose.connect(process.env.db_url);
    console.log("db connect");
  } catch (error) {
    console.log(error);
  }
};
db();

app.use("/api", require("./routes/routes"));

// base url
app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(process.env.PORT, () =>
  console.log(`app runnning http://localhost:${process.env.PORT}`)
);
