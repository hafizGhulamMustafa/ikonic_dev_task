const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const jwtSecret = process.env.JWT_SECRET || "IKONICTASKSECRET";

exports.requireLogIn = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (authorizationHeader) {
    const token = authorizationHeader.split(" ")[1];
    try {
      const user = jwt.verify(token, jwtSecret);
      req.user = user;
      next();
    } catch (error) {
      console.error("JWT verification error:", error);
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  } else {
    return res.status(400).json({ message: "Authorization Required" });
  }
};
