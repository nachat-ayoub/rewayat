const router = require("express").Router();
const chapterRoutes = require("./chapterRoutes");

const {
  getAllNovels,
  getNovelsByGenre,
  getNovel,
  createNovel,
  updateNovel,
  deleteNovel,
} = require("../controllers/novelController");

const { authMiddleware, authorMiddleware } = require("../middlewares");

router.get("/", getAllNovels);
router.get("/genres/:genre", getNovelsByGenre);
router.post("/create", authMiddleware, authorMiddleware, createNovel);
router.get("/:slug", getNovel);
router.put("/:slug/update", authMiddleware, authorMiddleware, updateNovel);
router.delete("/:slug/delete", authMiddleware, authorMiddleware, deleteNovel);

router.use("/", chapterRoutes);

module.exports = router;
