const { SocialMedia } = require("../models");
async function authorizationSocmed(req, res, next) {
  try {
    const { socialMediaId } = req.params;
    const authenticationUserId = res.dataUser.id;
    console.log(typeof authenticationUserId);
    const socialMediaById = await SocialMedia.findOne({
      where: {
        id: +socialMediaId,
      },
    });

    if (!socialMediaById) {
      return res.status(404).json({ message: "social media not found" });
    }

    if (!authenticationUserId) {
      return res.status(404).json({ message: "FORBIDDEN" });
    } else {
      return next();
    }
  } catch (error) {
    return res.status(500).json(error);
  }
}

module.exports = authorizationSocmed;
