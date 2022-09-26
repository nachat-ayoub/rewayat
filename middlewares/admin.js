const errorCodes = require("../services/errorCodes");

module.exports = async (req, res, next) => {
  const user = req?.user;

  if (user && user.role === "admin") {
    return next();
  }

  return res.status(401).json({
    ok: false,
    msg: "you are not authorized",
    errorCode: errorCodes.admin_auth.code,
  });
};
