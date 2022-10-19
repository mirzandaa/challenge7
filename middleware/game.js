const { Scores } = require("../models");

class GameMiddleware {
  static checkScore(req, res, next) {
    const getBody = req.body;
    const query = {
      where: { UserId: req.session.userId },
    };

    Scores.findAll(query)
      .then((result) => {
        if (result.length === 0) {
          next();
        } else {
          if (+result[0].dataValues.score < +getBody.score) {
            Scores.update({ score: +getBody.score }, query)
              .then(res.redirect("/game"))
              .catch((err) => res.status(500).json(err));
          } else {
            res.redirect("/game");
          }
        }
      })
      .catch((err) => res.status(500).json(err));
  }
}

module.exports = GameMiddleware;
