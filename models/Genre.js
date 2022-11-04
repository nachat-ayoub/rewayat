const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    novels: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Novel",
      },
    ],
  },
  { timestamps: true }
);

const Genre = mongoose.model("Genre", genreSchema);

module.exports = Genre;
