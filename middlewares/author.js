module.exports = async (req, res, next) => {
  const user = req?.user;

  if (user) {
    if (user.role === "admin") return next();
    // TODO: check if author is the same author that wrote the novel or the chapter
    if (user.role === "author") return next();
  }

  return res.json({ ok: false, msg: "you are not authorized - not an author" });
};
