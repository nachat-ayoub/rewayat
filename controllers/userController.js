const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { hashPassword, createToken } = require("../services/authHelpers");

// ! Get All Users
module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json({
      action: "getAllUsers",
      ok: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.log(error);
  }
};
// ! Get User
module.exports.getUser = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (user) {
      res.json({ action: "getUser", ok: true, user });
    }
    res.json({
      action: "getUser",
      ok: false,
      msg: "no user found with the given username",
    });
  } catch (error) {
    console.log(error);
  }
};

// ! Register User
module.exports.register = async (req, res) => {
  try {
    const { username, email, password, bio, image } = req.body;
    const fields = { username, email, password, bio, image };

    for (const key in fields) {
      const field = fields[key];
      if (!field || typeof field === "undefined" || field.trim() === "") {
        res.json({
          action: "register",
          msg: `${key} is required!`,
          ok: false,
        });
        break;
      }
    }

    // ? fields validation completed :
    let user = await User.findOne({ $or: [{ username }, { email }] });
    if (user) {
      return res.json({
        action: "register",
        msg: "Username Or Email Already Exists!",
        ok: false,
      });
    }

    const hashed_password = await hashPassword(password);
    user = await User.create({
      username,
      email,
      password: hashed_password,
      bio,
      image,
    });

    const token = createToken(user._id);

    res.json({ action: "register", ok: true, token, user });
  } catch (error) {
    console.log(error);
  }
};

// ! Login User
module.exports.login = async (req, res) => {
  try {
    const { EmailOrUsername, password } = req.body;
    const { exists, auth, user } = await User.login(EmailOrUsername, password);
    if (!exists || !auth) {
      return res.json({
        action: "login",
        msg: "invalid credentials",
        ok: false,
      });
    } else {
      const token = createToken(user._id);
      return res.json({ action: "login", ok: true, token, user });
    }
  } catch (error) {
    console.log(error);
  }
};

// ! Update User
module.exports.updateUser = async (req, res) => {
  try {
    res.json({ action: "updateUser" });
  } catch (error) {
    console.log(error);
  }
};

// ! Delete User
module.exports.deleteUser = async (req, res) => {
  try {
    res.json({ action: "deleteUser" });
  } catch (error) {
    console.log(error);
  }
};
