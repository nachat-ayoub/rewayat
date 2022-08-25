const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["user", "author", "admin"],
      default: "user",
    },
    username: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
      min: 10,
      max: 200,
    },
  },
  { timestamps: true }
);

userSchema.statics.login = async function (EmailOrUsername, password) {
  const user = await this.findOne({
    $or: [{ username: EmailOrUsername }, { email: EmailOrUsername }],
  });
  if (!user) return { exists: false, auth: false, user: null };

  const auth = await bcrypt.compare(password, user.password);
  return { exists: true, auth, user };
};

const User = mongoose.model("User", userSchema);
module.exports = User;
