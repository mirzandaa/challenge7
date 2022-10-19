const express = require("express");
const renderRouter = express.Router();

const author = require("../middleware/authorization");
const signUpValidation = require("../middleware/validation/signUp");
const signInValidation = require("../middleware/validation/SignIn");
const changePasswordValidation = require("../middleware/validation/changePassword");
const gameMiddleware = require("../middleware/game");

const userFunction = require("../controllers/userFunc");
const getData = require("../controllers/getDataFunc");
const scoreFunction = require("../controllers/scoreFunc");
const commentFunction = require("../controllers/commentFunct");

renderRouter.get("/", getData.getHomePage);

renderRouter.get("/topScores", getData.getTopScores);

renderRouter.get("/comments", getData.getComments);

renderRouter.route("/signUp").get(getData.getSignUpPage).post(signUpValidation.checkForm, signUpValidation.checkFormatEmail, signUpValidation.checkAccount, signUpValidation.checkPassword, userFunction.postSignUp);

renderRouter.route("/changePassword").get(getData.getChangePasswordPage).post(changePasswordValidation.checkForm, changePasswordValidation.emailValidation, changePasswordValidation.checkPassword, userFunction.postChangePassword);

renderRouter.route("/signIn").get(getData.getSignInPage).post(signInValidation.checkForm, signInValidation.checkPassword, userFunction.postSignIn);

renderRouter.use(author);

renderRouter.get("/welcome_player", getData.getLoginPage);

renderRouter.route("/game").get(getData.getGamePage).post(gameMiddleware.checkScore, scoreFunction.postScore);

renderRouter.get("/profile", getData.getProfile);

renderRouter.route("/create_comment").get(getData.commentForm).post(commentFunction.postComment);

renderRouter.post("/delete", commentFunction.postDelete);

renderRouter.post("/logOut", getData.getLogOut);

module.exports = renderRouter;
