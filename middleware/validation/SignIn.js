const { Users } = require("../../models");

class SignInValidation {
  static checkForm(req, res, next) {
    const getBody = req.body;

    if (getBody.email === "" || getBody.password === "" || getBody.user_name === "") {
      res.render("signIn", { alert: "Input The Form First!" });
    } else {
      next();
    }
  }

  static checkPassword(req, res, next) {
    const getBody = req.body;

    if (getBody.password.length < 4) {
      res.render("signIn", { alert: "Password Is Too Short Minimal 4 Characters" });
    } else if (getBody.password.length > 12) {
      res.render("signIn", { alert: "Password Is Too Long Maximal 12 Characters" });
    } else {
      next();
    }
  }

  //! Middleware sudah tidak digunakan lagi
  // static userValidation(req, res, next) {
  //   const getBody = req.body;
  //   const query = {
  //     where: { user_name: getBody.user_name, password: getBody.password, email: getBody.email },
  //   };

  //   Users.findOne(query)
  //     .then((data) => {
  //       if (!data) {
  //         res.render("signIn", { alert: "User Not Found!" });
  //       } else {
  //         next();
  //       }
  //     })
  //     .catch((err) => res.status(500).json(err));
  // }

  // static userNameValidation(req, res, next) {
  //   const getUserName = req.body.user_name;
  //   const query = {
  //     where: { user_name: getUserName },
  //   };

  //   Users.findOne(query)
  //     .then((data) => {
  //       if (!data) {
  //         res.render("signIn", { alert: "Wrong Input Username!" });
  //       } else {
  //         next();
  //       }
  //     })
  //     .catch((err) => res.status(500).json(err));
  // }

  // static emailValidation(req, res, next) {
  //   const getEmail = req.body.email;
  //   const query = {
  //     where: { email: getEmail },
  //   };

  //   Users.findOne(query)
  //     .then((data) => {
  //       if (!data) {
  //         res.render("signIn", { alert: "Wrong Input Email!" });
  //       } else {
  //         next();
  //       }
  //     })
  //     .catch((err) => res.status(500).json(err));
  // }

  // static passwordValidation(req, res, next) {
  //   const getPassword = req.body.password;
  //   const getEmail = req.body.email;
  //   const query = {
  //     where: { password: getPassword, email: getEmail },
  //   };

  //   Users.findOne(query)
  //     .then((data) => {
  //       if (!data) {
  //         res.render("signIn", { alert: "Wrong Password!" });
  //       } else {
  //         next();
  //       }
  //     })
  //     .catch((err) => {
  //       res.status(500).json(err);
  //     });
  // }
}

module.exports = SignInValidation;
