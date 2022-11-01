const { Comment } = require("../models");
async function authorizationComment(req, res, next) {
  try {
    const { commentId } = req.params;
    const authenticationUserId = res.dataUser.id;
    console.log(typeof authenticationUserId);
    const commentById = await Comment.findOne({
      where: {
        id: +commentId,
      },
    });

    if (!commentById) {
      return res.status(404).json({ message: "Comment not found" });
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

module.exports = authorizationComment;
