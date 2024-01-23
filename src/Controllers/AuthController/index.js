const con = require("../../Database");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const jwtSecret = process.env.JWT_SECRET || "IKONICTASKSECRET";
const jwtExpiration = process.env.JWT_EXPIRATION || "1h";

exports.signup = (req, res) => {
  const userData = {
    email: req.body.email,
    password: req.body.password,
  };

  con.query(
    "SELECT * FROM sing_up WHERE email = ?",
    [userData.email],
    (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res
          .status(500)
          .json({ status: "error", message: "Internal Server Error" });
      }

      if (!result?.length) {
        con.query("INSERT INTO sing_up SET ?", userData, (error, result) => {
          if (error) {
            console.error("Database error:", error);
            return res
              .status(500)
              .json({ status: "error", message: "Internal Server Error" });
          }
          res.json({
            status: "success",
            message: "User successfully signed up",
            data: result,
          });
        });
      } else {
        res
          .status(400)
          .json({ status: "error", message: "User Already Exists" });
      }
    }
  );
};

exports.signin = (req, res) => {
  const data = {
    name: req.body.name,
  };

  con.query(
    "SELECT * FROM sing_up WHERE name = ?",
    [data.name],
    (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res
          .status(500)
          .json({ status: "error", message: "Internal Server Error" });
      }

      if (!result?.length) {
        res
          .status(404)
          .json({ status: "error", message: "Login name not found" });
      } else {
        const token = jwt.sign({ name: data.name }, jwtSecret, {
          expiresIn: jwtExpiration,
        });
        res.json({
          status: "success",
          message: "Successfully logged in",
          token,
        });
      }
    }
  );
};
