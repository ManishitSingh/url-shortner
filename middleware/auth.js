const { getUser } = require("../service/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
  const userId = req.cookies?.uid;
  // console.log(userId);
  if (!userId) {
    return res.status(401).redirect("/login");
  }
  const user = getUser(userId);
  // console.log(user);
  if (!user) {
    return res.status(401).redirect("/login");
  }
  req.user = user;
  next();
}

async function checkAuth(req, res, next) {
  const userId = req.cookies?.uid;
  const user = getUser(userId);
  req.user = user;
  next();
}

module.exports = { restrictToLoggedinUserOnly, checkAuth };
