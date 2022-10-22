const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.maxAge = 60 * 60 * 24 * 7;

module.exports.createToken = (id, token) => {
  if (token !== undefined) {
    id.token = token;

    return jwt.sign(id, process.env.CLIENT_SECRET, {
      expiresIn: this.maxAge,
    });
  } else {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: this.maxAge,
    });
  }
};

module.exports.hashPassword = async (password) => {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(password, salt);
};

module.exports.verifyToken = (token) =>
  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return { auth: false, decodedToken: null };
    } else {
      return { auth: true, decodedToken };
    }
  });
