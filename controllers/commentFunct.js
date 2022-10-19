const { Comments } = require("../models");

class CommentFunction {
  static async postComment(req, res) {
    const getBody = req.body;
    const userId = req.session.userId;

    try {
      await Comments.createComment(getBody, userId);
      res.redirect("/profile");
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }

  static async postDelete(req, res) {
    const userId = req.session.userId;

    try {
      await Comments.deleteComment(userId);
      res.redirect("/welcome_player");
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
}

module.exports = CommentFunction;
