const errorCodes = require("../services/errorCodes");

module.exports = async (req, res, next) => {
  try {
    const user = req.user;

    if (user.role === "admin") {
      return next();
    } else if (user.username === req.params.username) {
      return next();
    } else {
      return res.status(401).json({
        ok: false,
        msg: "you are not authorized",
        errorCode: errorCodes.user_permission.code,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
