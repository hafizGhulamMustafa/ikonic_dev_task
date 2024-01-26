const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const sequelize = require("./config/dbConfig");
const authRoutes = require("./Routes/authRoutes");
const userRoutes = require("./Routes/userRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

app.use("/api", authRoutes);
app.use("/api/user", userRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
