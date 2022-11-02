const { User } = require("../models");
async function authorizationUser(req, res, next) {
  try {
    const { userId } = req.params;
    const authenticationUserId = res.dataUser.id;

    const userById = await User.findOne({
      where:{
        id: +userId
      }
    })

    if(!userById){
      return res.status(404).json({message:"User not found"});
    }
    if(userById.id === authenticationUserId){
      return next();
    }else{
      return res.status(403).json({
        message: "FORBIDDEN"
      });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
}
module.exports = authorizationUser;
