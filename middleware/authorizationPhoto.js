const { Photo } = require("../models");
async function authorizationPhoto(req, res, next) {
  try {
    const { photoId } = req.params;
    const authenticationUserId = res.dataUser.id;
    console.log(typeof authenticationUserId);
    const photoById = await Photo.findOne({
      where: {
        id: +photoId,
      },
    });

    if (!photoById) {
      return res.status(404).json({ message: "Photo not found" });
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

module.exports = authorizationPhoto;
