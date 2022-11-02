const { User } = require("../models");
const { verifyToken } = require("../helper/jwt");

async function authentication(req, res, next) {
  try {
    const token = req.headers.authorization;
    const userDecoded = verifyToken(token);

    const userById = await User.findOne({
      where: {
        id: userDecoded.id,
      }
    });
    if(!userById){
      return res.status(401).json({
        message: "No active account found with the given credentials"
      });
    }
    res.dataUser = userById;
    return next();

  } catch (error) {
    return res.status(500).json(error);
  }
}

module.exports = authentication;
