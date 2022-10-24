const { User } = require("../models");
const { hashPassword, comparePassword } = require("../helper/bcrypt");
const { generateToken } = require("../helper/jwt");

class UserController {
  static async userRegister(req, res) {
    try {
      const {
        full_name,
        email,
        username,
        password,
        profile_image_url,
        age,
        phone_number,
      } = req.body;
      const hashedPassword = hashPassword(password);

      await User.create({
        full_name,
        email,
        username,
        password: hashedPassword,
        profile_image_url,
        age: +age,
        phone_number: +phone_number,
      });

      return res.status(201).json({
        email,
        full_name,
        username,
        profile_image_url,
        age,
        phone_number,
      });
    } catch (error) {
      return res.status(500).json({ message: error["errors"][0]["message"] });
    }
  }

  static async userLogin(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      } else {
        const compare = comparePassword(password, user.password);
        if (!compare) {
          return res.status(400).json({ message: "Password is wrong" });
        } else {
          const token = generateToken({
            id: user.id,
            email: user.email,
          });
          return res.status(200).json({ token });
        }
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async userUpdateById(req, res) {
    try {
      const {userId} = req.params;
      const userById = await User.findOne({
        where: {
          id: userId,
        },
      });

      return res.json({userById});
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

module.exports = UserController;
