const { User } = require("../models");
const { verifyToken } = require("../helper/jwt");

async function authentication(req, res, next) {
  try {
    const token = req.headers.authorization;
    const userDecoded = verifyToken(token);

    const userById = await User.findOne({
      where: {
        id: userDecoded.id,
        email: userDecoded.email
      }
    });

    if(!userById){
      return res.status(401).json({
        message: "User Not Found"
      });
    }
    res.dataUser = userById;
    return next();

  } catch (error) {
    return res.status(500).json(error);
  }
}

module.exports = authentication;
