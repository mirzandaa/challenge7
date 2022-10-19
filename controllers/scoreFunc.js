const { Scores } = require("../models/");

class ScoreProcess {
  static async postScore(req, res) {
    const getBody = req.body;
    const getUserId = req.session.userId;

    try {
      await Scores.score(getBody, getUserId);
      res.redirect("/game");
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
}

module.exports = ScoreProcess;
