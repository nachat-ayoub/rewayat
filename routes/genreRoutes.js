const router = require("express").Router();

const {
  getAllGenres,
  createGenre,
  deleteGenre,
} = require("../controllers/genreController");

const {
  authMiddleware,
  authorMiddleware,
  adminMiddleware,
} = require("../middlewares");

// ! Get All :
router.get("/", authMiddleware, authorMiddleware, getAllGenres);

// ! Create Genre :
router.post("/create", authMiddleware, authorMiddleware, createGenre);

// ! Delete Genre :
router.delete("/delete", authMiddleware, adminMiddleware, deleteGenre);

module.exports = router;
