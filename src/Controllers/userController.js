const con = require("../config/dbConfig");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const User = require("../models/User");

dotenv.config();

const userListing = async (req, res) => {
  try {
    const user_listings = await User.findAll();
    if (user_listings.length) {
      res.json({
        status: "success",
        message: "User listings successfully",
        data: user_listings,
      });
    } else {
      res.json({
        status: "success",
        message: " user listings not found",
      });
    }
  } catch (error) {
    console.error("Database error:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal Server Error" });
  }
};

const createUser = async (req, res) => {
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
    if (newUser) {
      delete newUser.dataValues.password;
      return res.json({
        status: "success",
        message: "User registered successfully",
        data: newUser,
      });
    }
  } catch (error) {
    console.error("Database error:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal Server Error" });
  }
};

const getUserById = async (req, res) => {
  try {
    let userId = req.params.user_id;
    const user_details = await User.findOne({ where: { id: userId } });
    if (!user_details) {
      return res.status(400).json({
        status: "error",
        message: `user with id : ${userId} not found`,
      });
    } else {
      return res.json({
        status: "success",
        message: "User details",
        data: user_details,
      });
    }
  } catch (error) {
    console.error("Database error:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal Server Error" });
  }
};

const updateUser = async (req, res) => {
  try {
    let userId = await req.params.user_id;
    let updatedData = await req.body;
    const user_details = await User.findOne({ where: { id: userId } });
    if (!user_details) {
      return res.status(400).json({
        status: "error",
        message: `user with id:${userId} not found`,
      });
    } else {
      const updatedUser = await user_details.update(updatedData);
      return res.json({
        status: "success",
        message: "User details updated",
        data: updatedUser,
      });
    }
  } catch (error) {
    console.error("Database error:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal Server Error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(400).json({
        status: "error",
        message: `User with id: ${userId} not found`,
      });
    }

    await user.destroy();
    return res.json({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Database error:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal Server Error" });
  }
};

module.exports = {
  userListing,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};
