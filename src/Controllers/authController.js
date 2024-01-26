const con = require("../config/dbConfig");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const User = require("../models/User");

dotenv.config();

const jwtSecret = process.env.JWT_SECRET || "IKONICTASKSECRET";
const jwtExpiration = process.env.JWT_EXPIRATION || "1h";

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "Email not found" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ status: "error", message: "Invalid password" });
    }

    const token = jwt.sign({ email: user.email }, jwtSecret, {
      expiresIn: jwtExpiration,
    });
    if (token) {
      let data = user.toJSON();
      delete data.password;
      data.accessToken = token;
      res.json({
        status: "success",
        message: "Successfully logged in",
        data: data,
      });
    }
  } catch (error) {
    console.error("Database error:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal Server Error" });
  }
};

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ status: "error", message: "Email already exists" });
    }

    const newUser = await User.create({
      name: name,
      email: email,
      password: password,
    });

    const token = jwt.sign({ email: newUser.email }, jwtSecret, {
      expiresIn: jwtExpiration,
    });

    if (token) {
      let data = newUser.toJSON();
      delete data.password;
      data.accessToken = token;
      res.json({
        status: "success",
        message: "User registered successfully",
        data: data,
      });
    }
  } catch (error) {
    console.error("Database error:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal Server Error" });
  }
};

module.exports = { login, signup };
