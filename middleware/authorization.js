function authorization(req, res, next) {
  const user = req.session.userId;

  if (!user) {
    res.redirect("/signIn");
  } else {
    next();
  }
}

module.exports = authorization;
