const User = require("../models/User");
const { verifyToken } = require("../services/authHelpers");

module.exports = async (req, res, next) => {
  const token = req.headers?.token;

  if (token) {
    const { auth, decodedToken } = verifyToken(token);
    if (auth) {
      const user = await User.findById(decodedToken.id);
      if (user) {
        req.user = user;
        return next();
      }
    }
  }

  return res.json({ ok: false, msg: "you are not authorized" });
};
