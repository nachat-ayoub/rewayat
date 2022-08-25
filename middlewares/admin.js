module.exports = async (req, res, next) => {
  const user = req?.user;

  if (user && user.role === "admin") {
    return next();
  }

  return res.json({ ok: false, msg: "you are not authorized - not an admin" });
};
