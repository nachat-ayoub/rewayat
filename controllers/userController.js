const User = require("../models/User");
const { hashPassword, createToken } = require("../services/authHelpers");
const { cloudinaryUpload } = require("../services/cloudinary");

// ! Get All Users
module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password").populate("novels");
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
    const user = await User.findOne({ username }, "-password -role").populate(
      "novels"
    );
    if (user) {
      return res.json({ action: "getUser", ok: true, user });
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
    let { username, email, password, bio, image } = req.body;
    const fields = { username, email, password };

    for (const key in fields) {
      const field = fields[key];

      if (typeof field === "undefined" || !field || field.trim() === "") {
        return res.json({
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
    if (image && bio) {
      const { url: uploadedImage } = await cloudinaryUpload(image);
      user = await User.create({
        username,
        email,
        password: hashed_password,
        bio,
        image: uploadedImage,
      });
    } else {
      user = await User.create({
        username,
        email,
        password: hashed_password,
      });
    }

    const token = createToken(user._id);

    res.json({
      action: "register",
      ok: true,
      user: {
        role: user.role,
        username: user.username,
        email: user.email,
        image: user.image,
        bio: user.bio,
        token,
      },
    });
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

      return res.json({
        action: "login",
        ok: true,
        user: {
          role: user.role,
          username: user.username,
          email: user.email,
          image: user.image,
          bio: user.bio,
          token,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// ! Update User
module.exports.updateUser = async (req, res) => {
  try {
    let { role, username, image, bio } = req.body;
    const current_user = req.user;

    const userData = { username, bio };

    for (const key in userData) {
      if (Object.hasOwnProperty.call(userData, key)) {
        const val = userData[key]?.trim();
        if (!val || val === "") {
          return res.json({
            action: "updateUser",
            ok: false,
            msg: `${key} is required!`,
          });
        }
      }
    }

    let user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.json({
        action: "updateUser",
        ok: false,
        msg: "user not found!",
      });
    }

    if (image) {
      const { url } = await cloudinaryUpload(image);
      image = url;
    } else {
      image = user.image;
    }

    if (current_user.role === "admin") {
      user = await User.findOneAndUpdate(
        { username: req.params.username },
        { role, username, image, bio },
        { new: true }
      );
    } else {
      user = await User.findOneAndUpdate(
        { username: req.params.username },
        { username, image, bio },
        { new: true }
      );
    }

    const userInfo = {
      role: user.role,
      username: user.username,
      email: user.email,
      image: user.image,
      bio: user.bio,
    };

    const userToken = createToken(userInfo, req.token);

    return res.json({
      action: "updateUser",
      ok: true,
      userToken,
      user: userInfo,
    });
  } catch (error) {
    console.log(error);
  }
};

// ! Delete User
module.exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ username: req.params.username });

    if (user) return res.json({ action: "updateUser", ok: true, user });
    else
      return res.json({
        action: "deleteUser",
        ok: false,
        msg: "user not found!",
      });
  } catch (error) {
    console.log(error);
  }
};
