const User = require("../models/User");
const { verifyToken } = require("../services/authHelpers");
const errorCodes = require("../services/errorCodes");

module.exports = async (req, res, next) => {
  const token = req.headers?.token;

  if (token) {
    const { auth, decodedToken } = verifyToken(token);
    if (auth) {
      const user = await User.findById(decodedToken.id).populate("novels");
      if (user) {
        req.user = user;
        return next();
      }
    }
  }

  return res.status(401).json({
    ok: false,
    msg: "you are not authorized",
    errorCode: errorCodes.user_auth.code,
  });
};
