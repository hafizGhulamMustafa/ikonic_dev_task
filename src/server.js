const express = require("express");
const auth = require("./Routes/AuthRoutes");
const dbConnection = require("./Database");
const env = require("dotenv").config();

const app = express();

const port = 8000;

dbConnection.connect((error, result) => {
  if (!result) {
    console.log(error);
  } else {
    console.log("connected");
  }
});

app.use(express.json());

app.use("/api", auth);

app.listen(port, () => {
  console.log(`prot ${port} is runing`);
});
