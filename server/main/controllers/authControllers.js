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
      // console.log(error)
      // if (error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {

      //   res.status(400).json({ message: error.errors[0].message });
      // } else {
      //   res.status(500).json({ message: "Internal server error" });
      // }
      next(error)
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
        throw {
          name: "Unauthorized",
          code: 401,
          message: "Invalid email/password!"
        }
      }

      let isPassword = verifyPassword(password, targetUser.password);
      if (!isPassword) {
        throw {
          name: "Unauthorized",
          code: 401,
          message: "Invalid email/password!"
        }

      }
      
      let payload = {
        id: targetUser.id,
        email: targetUser.email,
      };
      console.log(payload, "<>")

      let access_token = signToken(payload);
      res.status(200).json({ access_token: access_token });
    } catch (error) {
      // console.log(error);
      // res.status(500).json({ message: "Internal server error" });
      next(error)
    }
  }
}

module.exports = AuthnController;
