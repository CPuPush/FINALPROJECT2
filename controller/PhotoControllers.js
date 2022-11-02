const { Photo, User, Comment } = require("../models");

class PhotoControllers {

  static async createPhoto(req, res) {
    try {
      const { title, caption, poster_image_url } = req.body;
      const UserId = res.dataUser.id;
      await Photo.create({
        title, caption, poster_image_url, UserId
      })
      return res.status(201).json({title, caption, poster_image_url});
      
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async getAllPhotos(req, res) {
    try {
      const UserId = res.dataUser.id;
      let test = await Photo.findAll({
        include: {
          model: User,
          attributes: [`id`, `username`, `profile_image_url`],
        },
        where: {
          UserId
        },
      });
      console.log(UserId);
      return res.status(200).json(test)
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async photoUpdateById(req, res) {
    try {
      const { title, caption, poster_image_url } = req.body;
      const { photoId } = req.params;
      const data = {
        title,
        caption,
        poster_image_url,
      };

      await Photo.update(data, {
        where: {
          id: +photoId,
        },
      });

      return Photo.findOne({
        where: {
          id: +photoId,
        },
      }).then((data) => {
        res.status(200).json(data);
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async deletePhotoById(req, res) {
    try {
      const { photoId } = req.params;
      await Photo.destroy({
        where: {
          id: photoId,
        },
      });

      return res
        .status(200)
        .json({ message: "Your photo has been successfully deleted" });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

module.exports = PhotoControllers;
