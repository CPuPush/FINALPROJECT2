const { Comment } = require("../models");
async function authorizationComment(req, res, next) {
  try {
    const { commentId } = req.params;
    const authenticationUserId = res.dataUser.id;
    const commentById = await Comment.findOne({
      where: {
        id: +commentId,
      },
    });

    if (!commentById) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (authenticationUserId === commentById.UserId) {
      return next();
    } else {
      return res.status(404).json({ message: "FORBIDDEN" });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
}

module.exports = authorizationComment;
