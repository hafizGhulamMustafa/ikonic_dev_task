const { check, validationResult } = require("express-validator");

exports.validateCreateUserRequest = [
  check("name")
    .notEmpty()
    .withMessage("name is required for create user")
    .isString(),

  check("email")
    .notEmpty()
    .withMessage("Email is required for sign-up")
    .isEmail()
    .withMessage("Please provide a valid email address for sign-up"),

  check("password")
    .notEmpty()
    .withMessage("Password is required for sign-up")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long for sign-up"),
];

exports.validateUpdateUserRequest = [
  check("name")
    .notEmpty()
    .withMessage("name is required for create user")
    .isString(),

  check("email")
    .notEmpty()
    .withMessage("Email is required for sign-up")
    .isEmail()
    .withMessage("Please provide a valid email address for sign-up"),
];

exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors
      .array()
      .map((error) => ({ [error.param]: error.msg }));
    return res.status(400).json({ errors: errorMessages });
  }

  next();
};
