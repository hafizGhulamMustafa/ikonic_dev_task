const { check, validationResult } = require("express-validator");

exports.validateSignInRequest = [
  check("email")
    .notEmpty()
    .withMessage("Email is required for sign-in")
    .isEmail()
    .withMessage("Please provide a valid email address for sign-in"),

  check("password").notEmpty().withMessage("Password is required for sign-in"),
];

exports.validateSignupRequest = [
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
