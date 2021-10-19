const db = require('./db/models');


const loginUser = (req, res, user) => {
  req.session.auth = { userId: user.id }
}


const restoreUser = async (req, res, next) => {
  console.log(req.session);
  if (req.session.auth) {
    try {
      const { userId } = req.session.auth;
      const user = await db.User.findByPk(userId);
      if (user) {
        res.locals.authenticated = true;
        res.locals.user = user;
        next();
        return
      }
    } catch (e) {
      res.locals.authenticated = false;
      next(e);
      return
    }
  }
  res.locals.authenticated = false;
  next();
}


const logoutUser = (req, res) => {
  delete req.session.auth;
}

module.exports = {
  loginUser,
  restoreUser,
  logoutUser
}
