const errorCodes = require("../services/errorCodes");

module.exports = async (req, res, next) => {
  const user = req?.user;

  if (user) {
    if (user.role === "admin") return next();
    //  DONE: check if author is the same author that wrote the novel or the chapter
    if (user.role === "author") {
      const novelSlug = req.params?.slug || req.params?.novelSlug;
      console.log("\n\n==>>>>>>>>>>>>>>>>>>>>>=", novelSlug);
      if (!novelSlug) return next();
      if (req.user.novels.some((novel) => novel.slug === novelSlug)) {
        return next();
      } else {
        return res.status(401).json({
          ok: false,
          msg: "you are not authorized",
          errorCode: errorCodes.author_permission.code,
        });
      }
    }
  }

  return res.status(401).json({
    ok: false,
    msg: "you are not authorized",
    errorCode: errorCodes.author_auth.code,
  });
};
