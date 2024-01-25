const express = require("express");
const routes = express.Router();
const { signup, login } = require("../Controllers/AuthController");
const {
  validateLogInRequest,
  validateSignupRequest,
  isRequestValidated,
} = require("../Validators");

routes.post("/signup", validateSignupRequest, isRequestValidated, signup);
routes.post("/login", validateLogInRequest, isRequestValidated, login);

module.exports = routes;
