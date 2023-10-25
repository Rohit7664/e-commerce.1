const mongoose = require("mongoose");

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useUnifiedTechnology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("mongoDB connected successfully"))
  .catch((error) => console.log("error in DB"));
