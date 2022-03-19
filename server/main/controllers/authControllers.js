const { User } = require("../models");
const { verifyPassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
class AuthnController {
  static async registerUser(req, res, next) {
    console.log("REGISTER USER");

    let { email, password } = req.body;
    console.log(req.body, "INI REGIS");
    try {
      let newUser = await User.create({
        email,
        password,
      });

      res.status(201).json({ message: `${newUser.email} telah berhasil terdaftar` });
    } catch (error) {
      if (error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
        res.status(400).json({ message: error.errors[0].message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  static async loginUser(req, res, next) {
    let { email, password } = req.body;

    try {
      let targetUser = await User.findOne({
        where: {
          email,
        },
      });
      if (!targetUser) {
        res.status(401).json({ message: "Invalid email/password!" });
        return;
      }

      let isPassword = verifyPassword(password, targetUser.password);
      if (!isPassword) {
        res.status(401).json({ message: "Invalid email/password!" });
        return;
      }
      
      let payload = {
        id: targetUser.id,
        email: targetUser.email,
      };
      console.log(payload, "<>")

      let access_token = signToken(payload);
      res.status(200).json({ access_token: access_token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = AuthnController;
