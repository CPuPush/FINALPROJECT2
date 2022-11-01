const { Comment, User, Photo } = require("../models");

class CommentControllers {
  static async createComment(req, res) {
    const { comment, PhotoId } = req.body;
    const UserId = res.dataUser.id;
    const data = {
      comment,
      UserId,
      PhotoId,
    };

    return await Comment.create({
      comment,
      UserId,
      PhotoId,
    })
      .then((result) => {
        return res.status(201).json(result);
      })
      .then((err) => {
        return res.status(500).json(err);
      });
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

      Comment.findAll(data)
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

      return Comment.findOne({
        where: {
          id: +commentId,
        },
      }).then((result) => {
        res.status(200).json(result);
      });
    } catch (error) {
      res.status(500).json(error);
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

      return res
        .status(200)
        .json({ message: "Your comment has been successfully deleted" });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

module.exports = CommentControllers;
