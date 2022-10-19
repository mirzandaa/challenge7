const { Users, Scores, Comments } = require("../models");

class GetData {
  static getHomePage(req, res) {
    res.render("index", { title: "Home Page" });
  }

  static getSignUpPage(req, res) {
    res.render("signUp", { title: "Sign Up Page", alert: "" });
  }

  static getSignInPage(req, res) {
    res.render("signIn", { title: "Sign In Page", alert: "" });
  }

  static getChangePasswordPage(req, res) {
    res.render("changePassword", { title: "Change Password Page", alert: "" });
  }

  static getGamePage(req, res) {
    const playerId = req.session.userId;
    const query = {
      where: { id: playerId },
    };

    Users.findOne(query)
      .then((result) => {
        res.render("game", { title: "Game Page", player: result });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  static getLoginPage(req, res) {
    res.render("login", { title: "Welcome to Suit Game" });
  }

  static getTopScores(req, res) {
    Scores.findAll({
      include: [Users],
      order: [["score", "DESC"]],
      limit: 5,
    })
      .then((result) => res.render("topScores", { data: result }))
      .catch((err) => res.status(500).json(err));
  }

  static getProfile(req, res) {
    const playerId = req.session.userId;

    const query = {
      where: { id: playerId },
    };

    Users.findOne(query)
      .then((result) => {
        res.render("profile", { data: result });
      })
      .catch((err) => res.status(500).json(err));
  }

  static commentForm(req, res) {
    res.render("commentForm");
  }

  static getComments(req, res) {
    Comments.findAll({
      include: [Users],
    })
      .then((result) => res.render("comments", { comments: result }))
      .catch((err) => res.status(500).json(err));
  }

  static getLogOut(req, res) {
    req.session.isLogin = false;
    req.session.userId = 0;
    res.redirect("/");
  }
}

module.exports = GetData;
