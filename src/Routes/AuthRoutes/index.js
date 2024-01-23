const express = require("express");
const routes = express.Router();
const { signup, signin } = require("../../Controllers/AuthController");
const {
  validateSignInRequest,
  validateSignupRequest,
  isRequestValidated,
} = require("../../Validators");
// const { requireSignIn } = require("../../Middleware");

routes.post("/signup", validateSignupRequest, isRequestValidated, signup);
routes.post("/signin", validateSignInRequest, isRequestValidated, signin);

module.exports = routes;
