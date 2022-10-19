const { Users } = require("../../models");

class changePasswordValidation {
  static checkForm(req, res, next) {
    const getBody = req.body;

    if (getBody.password === "" || getBody.confirm_password === "" || getBody.email === "") {
      res.render("changePassword", { alert: "Input The Form First!" });
    } else if (getBody.confirm_password !== getBody.password) {
      res.render("changePassword", { alert: "Password doesn't match!" });
    } else {
      next();
    }
  }

  static emailValidation(req, res, next) {
    const getEmail = req.body.email;
    const query = {
      where: { email: getEmail },
    };

    Users.findAll(query)
      .then((data) => {
        if (data.length === 0) {
          res.render("changePassword", { alert: "Wrong Input Email!" });
        } else {
          next();
        }
      })
      .catch((err) => res.status(500).json(err));
  }

  static checkPassword(req, res, next) {
    const getBody = req.body;

    if (getBody.password.length < 4) {
      res.render("changePassword", { alert: "Password Is Too Short Minimal 4 Characters" });
    } else if (getBody.password.length > 12) {
      res.render("changePassword", { alert: "Password Is Too Long Maximal 12 Characters" });
    } else if (getBody.confirm_password !== getBody.password) {
      res.render("changePassword", { alert: "Password doesn't match!" });
    } else {
      next();
    }
  }
}

module.exports = changePasswordValidation;
