const router = require("express").Router();

const {
  getAllChapters,
  getChapter,
  createChapter,
  updateChapter,
  deleteChapter,
} = require("../controllers/chapterController");

const {
  authMiddleware,
  authorMiddleware,
  adminMiddleware,
} = require("../middlewares");

// ? - /novels/:novelSlug/

// ! Get All
router.get("/:novelSlug/chapters", getAllChapters);

// ! Create
router.post(
  "/:novelSlug/create",
  authMiddleware,
  authorMiddleware,
  createChapter
);

// ! Get One
router.get("/:novelSlug/:chapterSlug", getChapter);

// ! Update One
router.put(
  "/:novelSlug/:chapterSlug/update",
  authMiddleware,
  authorMiddleware,
  updateChapter
);

// ! Delete One
router.delete(
  "/:novelSlug/:chapterSlug/delete",
  authMiddleware,
  adminMiddleware,
  deleteChapter
);

module.exports = router;
