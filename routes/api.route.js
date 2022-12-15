const router = require("express").Router();
const novelRoutes = require("./novelRoutes");
const chapterRoutes = require("./chapterRoutes");
const genreRoutes = require("./genreRoutes");
const userRoutes = require("./userRoutes");

router.get("/", async (req, res, next) => {
  res.send({ message: "Ok api is working 🚀" });
});

router.use("/auth", userRoutes);
router.use("/novels", novelRoutes);
router.use("/genres", genreRoutes);
router.use("/", chapterRoutes);

module.exports = router;
