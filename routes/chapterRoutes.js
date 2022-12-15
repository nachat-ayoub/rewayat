const router = require("express").Router();

const {
  getChapter,
  createChapter,
  updateChapter,
  deleteChapter,
  getAllChapters,
  // getChaptersCreatedByUser,
} = require("../controllers/chapterController");

const {
  authMiddleware,
  authorMiddleware,
  adminMiddleware,
} = require("../middlewares");

// ! Get All
router.get("/chapters", getAllChapters);

// ! Create
router.post(
  "/novels/:novelSlug/create",
  authMiddleware,
  authorMiddleware,
  createChapter
);

// ! Get One
router.get("/novels/:novelSlug/:chapterSlug", getChapter);

// ! Update One
router.put(
  "/novels/:novelSlug/:chapterSlug/update",
  authMiddleware,
  authorMiddleware,
  updateChapter
);

// ! Delete One
router.delete(
  "/novels/:novelSlug/:chapterSlug/delete",
  authMiddleware,
  adminMiddleware,
  deleteChapter
);

module.exports = router;
