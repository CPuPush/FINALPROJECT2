const { SocialMedia, User } = require('../models');

class SocialController{
  static async createSocialMedia(req, res){
    try {
      const { name, social_media_url } = req.body;
      const UserId = res.dataUser.id;
      const data = {
        name,
        social_media_url,
        UserId
      }
      const createSocialMedia = await SocialMedia.create(data);
      return res.status(201).json({ social_media:createSocialMedia });

    } catch (error) {
      let errorMes = error.name;
      if(errorMes === "SequelizeUniqueConstraintError" || errorMes==="SequelizeValidationError"){
        return res.status(400).json({message: error.errors[0].message});
      }
      return res.status(500).json(error);
    }
  }

  static async getAllSocialMedia(req, res){
    try {
      const UserId = res.dataUser.id;
      const findSocialMedia = await SocialMedia.findAll({
        include:{
          model: User,
          attributes: [`id`, `username`, `profile_image_url`],
        },
        where:{
          UserId
        }
      });
      return res.status(200).json(findSocialMedia);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async updateSocialMediaById(req, res){
    try {
      const { name, social_media_url } = req.body;
      const { socialMediaId } = req.params;
      const data = {
        name,
        social_media_url
      }
      await SocialMedia.update(data, {
        where: {
          id: socialMediaId
        }
      });
      const updateSocialMedia = await SocialMedia.findOne({
        where: {
          id: socialMediaId
        }
      });
      return res.status(200).json({message: updateSocialMedia});
    } catch (error) {
      let errorMes = error.name;
      if(errorMes === "SequelizeUniqueConstraintError" || errorMes==="SequelizeValidationError"){
        return res.status(400).json({message: error.errors[0].message});
      }
      return res.status(500).json(error);
    }
  }

  static async deleteSocialMediaById(req, res){
    try {
      const { socialMediaId } = req.params;
      await SocialMedia.destroy({
        where: {
          id: socialMediaId
        }
      });
      return res.status(200).json({message:"Your social media has been successfully deleted"});
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

module.exports = SocialController;