const { SocialMedia } = require('../models');

async function authorizationSocialMedia(req, res, next){
  try {
    const { socialMediaId } = req.params;
    const authenticationUserId = res.dataUser.id;

    const socialMediaById = await SocialMedia.findOne({
      where: {
        id: +socialMediaId
      }
    });
    if(!socialMediaById){
      return res.status(200).json({message: "Social Media Not Found"})
    }
    if(socialMediaById.UserId === authenticationUserId){
      return next();
    }else{
      return res.status(403).json({message: "FORBIDDEN"});
    }
  } catch (error) {
    return res.status(500).json(error);
  }
}

module.exports = authorizationSocialMedia;