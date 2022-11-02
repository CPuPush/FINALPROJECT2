const { Photo } = require("../models");
async function authorizationPhoto(req, res, next) {
  try {
    const { photoId } = req.params;
    const authenticationUserId = res.dataUser.id;
    const photoById = await Photo.findOne({
      where: {
        id: +photoId,
      },
    });

    if (!photoById) {
      return res.status(404).json({ message: "Photo not found"});
    }
    if(photoById.UserId === authenticationUserId){
      return next();
    }else{
      return res.status(403).json({message: "FORBIDDEN"});
    }
  } catch (error) {
    return res.status(500).json(error);
  }
}

module.exports = authorizationPhoto;
