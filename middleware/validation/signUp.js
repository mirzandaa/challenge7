const { Users } = require("../../models");

class SignUpValidation {
  static checkForm(req, res, next) {
    const getBody = req.body;

    if (getBody.email === "" || getBody.password === "" || getBody.user_name === "" || getBody.confirm_password === "") {
      res.render("signUp", { alert: "Input The Form First!" });
    } else {
      next();
    }
  }

  static checkPassword(req, res, next) {
    const getBody = req.body;

    if (getBody.password.length < 4) {
      res.render("signUp", { alert: "Password Is Too Short Minimal 4 Characters" });
    } else if (getBody.password.length > 8) {
      res.render("signUp", { alert: "Password Is Too Long Maximal 8 Characters" });
    } else if (getBody.confirm_password !== getBody.password) {
      res.render("signUp", { alert: "Password doesn't match!" });
    } else {
      next();
    }
  }

  static checkFormatEmail(req, res, next) {
    const getEmail = req.body.email;

    let resultAt = false;
    let resultDotCom = false;
    let temp = "";

    for (let i = 0; i < getEmail.length; i++) {
      if (getEmail[i] === "@") {
        resultAt = true;
      } else if (getEmail[i] === ".") {
        temp = "";
        temp += getEmail[i];
      } else {
        temp += getEmail[i];
      }

      if (temp === ".com") {
        resultDotCom = true;
      }
    }

    if (resultAt === true && resultDotCom === true) {
      next();
    } else {
      res.render("signUp", { alert: "Format Email Is Wrong" });
    }
  }

  static checkAccount(req, res, next) {
    const getEmail = req.body.email;
    const query = {
      where: { email: getEmail },
    };

    Users.findAll(query)
      .then((data) => {
        if (data.length > 0) {
          res.render("signUp", { alert: "The Email Account Already Exist" });
        } else {
          next();
        }
      })
      .catch((err) => res.status(500).json(err));
  }
}

module.exports = SignUpValidation;
