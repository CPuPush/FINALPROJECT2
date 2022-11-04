const { User, SocialMedia } = require("../models");

class SocialMedias {
  static async createSocmed(req, res) {
    const { name, social_media_url } = req.body;
    const UserId = res.dataUser.id;

    return await SocialMedia.create({
      name,
      social_media_url,
      UserId,
    })
      .then((result) => {
        res.status(201).json(result);
      })
      .then((err) => {
        res.status(500).json(err);
      });
  }

  static async getAllSocmed(req, res) {
    try {
      const data = {
        include: {
          model: User,
          attributes: [`id`, `username`, `profile_image_url`],
        },
      };

      SocialMedia.findAll(data)
        .then((result) => {
          res.status(200).json(result);
        })
        .then((error) => {
          res.status(500).json(error);
        });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async socmedUpdateById(req, res) {
    try {
      const { name, social_media_url } = req.body;
      const { socialMediaId } = req.params;
      const data = {
        name,
        social_media_url,
      };

      await SocialMedia.update(data, {
        where: {
          id: +socialMediaId,
        },
      });

      return SocialMedia.findOne({
        where: {
          id: +socialMediaId,
        },
      })
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

  static async deleteSocmedById(req, res) {
    try {
      const { socialMediaId } = req.params;
      await SocialMedia.destroy({
        where: {
          id: socialMediaId,
        },
      });

      return res
        .status(200)
        .json({ message: "Your social media has been successfully deleted" });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

module.exports = SocialMedias;
