const User = require("../models/User");
const { verifyToken } = require("./authHelpers");

module.exports = async (req) => {
  try {
    const token = req.headers?.token;
    let isAuth = false;

    if (token) {
      const { auth, decodedToken } = verifyToken(token);
      if (auth) {
        const user = await User.findById(decodedToken.id);
        if (user) {
          req.user = user;
          req.token = token;
          isAuth = true;
        }
      }
    }

    return isAuth;
  } catch (error) {
    console.log(error);
  }
};
