const { Users } = require("../models");

class AccountProcess {
  static async postSignUp(req, res) {
    const getBody = req.body;

    try {
      await Users.signUp(getBody);
      res.redirect("/signIn");
    } catch (error) {
      res.status(500).json({
        message: error,
      });
    }
  }

  static async postSignIn(req, res) {
    const getBody = req.body;

    try {
      let result = await Users.signIn(getBody);

      if (!result.success) {
        res.render("signIn", { alert: result.alert });
      } else {
        req.session.isLogin = true;
        req.session.userId = result.data.id;
        res.redirect("/welcome_player");
      }
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }

  static async postChangePassword(req, res) {
    const getBody = req.body;

    try {
      await Users.changePass(getBody);
      res.redirect("/signIn");
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
}

module.exports = AccountProcess;
