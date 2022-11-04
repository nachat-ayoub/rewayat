const router = require("express").Router();

const { getAllGenres, createGenre } = require("../controllers/genreController");

const { authMiddleware, authorMiddleware } = require("../middlewares");

// ! Get All :
router.get("/", authMiddleware, authorMiddleware, getAllGenres);

// ! Create Genre :
router.post("/create", authMiddleware, authorMiddleware, createGenre);

module.exports = router;
