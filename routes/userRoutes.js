const router = require("express").Router();
const {
  getAllUsers,
  getUser,
  register,
  login,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.get("/users", getAllUsers);
router.post("/register", register);
router.post("/login", login);
router.get("/:username", getUser);
router.put("/:username/update", updateUser);
router.delete("/:username/delete", deleteUser);

module.exports = router;
