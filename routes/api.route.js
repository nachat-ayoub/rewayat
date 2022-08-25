const router = require("express").Router();
const novelRoutes = require("./novelRoutes");
const userRoutes = require("./userRoutes");

router.get("/", async (req, res, next) => {
  res.send({ message: "Ok api is working 🚀" });
});

router.use("/novels", novelRoutes);
router.use("/auth", userRoutes);

module.exports = router;
