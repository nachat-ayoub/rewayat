const router = require("express").Router();
const {
  getAllUsers,
  getUser,
  register,
  login,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const {
  authMiddleware,
  adminMiddleware,
  checkUserMiddleware,
} = require("../middlewares");

// ? No Auth Required
router.post("/register", register);
router.post("/login", login);

// ! Auth Required
// ? Admin Role Required :
router.get("/users", authMiddleware, adminMiddleware, getAllUsers);
router.delete("/:username/delete", authMiddleware, adminMiddleware, deleteUser);

// ? User Check Required :
router.get("/:username", authMiddleware, checkUserMiddleware, getUser);
router.put(
  "/:username/update",
  authMiddleware,
  checkUserMiddleware,
  updateUser
);

module.exports = router;
