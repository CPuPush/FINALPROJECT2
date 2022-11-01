const { Photo, User } = require("../models");

class PhotoControllers {
  static async createPhoto(req, res) {
    const { title, caption, poster_image_url } = req.body;
    const UserId = res.dataUser.id;
    const data = {
      poster_image_url,
      title,
      caption,
      UserId,
    };

    return await Photo.create({
      poster_image_url,
      title,
      caption,
      UserId,
    })
      .then((result) => {
        res.status(201).json(result);
      })
      .then((error) => {
        res.status(500).json(error);
      });
  }

  static async getAllPhotos(req, res) {
    try {
      const data = {
        include: {
          model: User,
          attributes: [`id`, `username`, `profile_image_url`],
        },
      };

      Photo.findAll(data)
        .then((result) => {
          res.status(200).json(result);
        })
        .then((err) => {
          res.status(500).json(err);
        });
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
