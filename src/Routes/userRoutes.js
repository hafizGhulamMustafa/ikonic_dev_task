const express = require("express");
const routes = express.Router();
const {
  userListing,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} = require("../Controllers/userController");
const {
  validateCreateUserRequest,
  validateUpdateUserRequest,
  isRequestValidated,
} = require("../Validators/userValidator");
const { requireLogIn } = require("../Middleware/auth");

routes.get("/", requireLogIn, isRequestValidated, userListing);
routes.post(
  "/create",
  requireLogIn,
  validateCreateUserRequest,
  isRequestValidated,
  createUser
);
routes.get("/:user_id", requireLogIn, isRequestValidated, getUserById);
routes.put(
  "/:user_id",
  requireLogIn,
  validateUpdateUserRequest,
  isRequestValidated,
  updateUser
);
routes.delete("/:user_id", requireLogIn, isRequestValidated, deleteUser);
module.exports = routes;
