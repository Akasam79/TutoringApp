const express = require("express");

const connectDb = require("./db/index");

require("dotenv").config();

const { PORT } = process.env;

const app = express();

app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.json({ message: "Welcome to TutoringApp" }));

const port = process.env.PORT || PORT;
app.listen(port, () => console.log(`app running on port ${port}`));
