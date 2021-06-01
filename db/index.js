const mongoose = require("mongoose");
require("dotenv").config();

const connectionString = process.env.MONGODB_URI;
mongoose.connect(
  connectionString,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) {
      console.log(err);
      process.exit;
    } else {
      console.log("database connected successfuly");
    }
  }
);
