const { Comment, User, Photo } = require("../models");

class CommentControllers {
  static async createComment(req, res) {
    try {
      const { comment, PhotoId } = req.body;
      const UserId = res.dataUser.id;
      const data = {
        UserId,
        PhotoId,
        comment
      };
      const getPhoto = await Photo.findByPk(PhotoId);
      if(!getPhoto){
        return res.status(404).json({message: "PhotoId not found"})
      }else{
        const createComment = await Comment.create(data);
        return res.status(201).json({comment: createComment});
      }
    } catch (error) {
      let errorMes = error.name;
      if(errorMes === "SequelizeUniqueConstraintError" || errorMes==="SequelizeValidationError"){
        return res.status(400).json({message: error.errors[0].message});
      }
      return res.status(500).json(error);
    }
  }

  static async getAllComments(req, res) {
    try {
      const data = {
        include: [
          {
            model: Photo,
            attributes: ["id", "title", "caption", "poster_image_url"],
          },
          {
            model: User,
            attributes: ["id", "username", "profile_image_url", "phone_number"],
          },
        ],
      };
      const findComment = await Comment.findAll(data);
      return res.status(200).json({comments: findComment});
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async commentUpdateById(req, res) {
    try {
      const { comment } = req.body;
      const { commentId } = req.params;
      const data = {
        comment,
      };
      await Comment.update(data, {
        where: {
          id: +commentId,
        },
      });
      const commentUpdate = await Comment.findByPk(commentId);
      return res.status(200).json({comment: commentUpdate})
    } catch (error) {
      let errorMes = error.name;
      if(errorMes === "SequelizeUniqueConstraintError" || errorMes==="SequelizeValidationError"){
        return res.status(400).json({message: error.errors[0].message});
      }
      return res.status(500).json(error);
    }
  }

  static async deleteCommentById(req, res) {
    try {
      const { commentId } = req.params;
      await Comment.destroy({
        where: {
          id: commentId,
        },
      });
      return res.status(200).json({ message: "Your comment has been successfully deleted" });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

module.exports = CommentControllers;
