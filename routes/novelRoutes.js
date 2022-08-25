const router = require("express").Router();
const authMiddleware = require("../middlewares/auth");
const authorMiddleware = require("../middlewares/author");
const adminMiddleware = require("../middlewares/admin");
const {
  getAll,
  getOne,
  create,
  update,
  remove,
} = require("../controllers/novelController");

router.get("/", authMiddleware, authorMiddleware, getAll);
router.post("/create", create);
router.get("/:slug", getOne);
router.put("/:slug/update", update);
router.delete("/:slug/delete", remove);

module.exports = router;
