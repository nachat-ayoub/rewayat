const mongoose = require("mongoose");

const novelSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      lowercase: true,
      required: true,
      trim: true,
    },
    story: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "/novel-placeholder-image.jpg",
    },
    views: {
      type: Number,
      default: 0,
    },
    genres: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Genre",
      },
    ],
    publisher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    chapters: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chapter",
      },
    ],
  },
  { timestamps: true }
);

const Novel = mongoose.model("Novel", novelSchema);

module.exports = Novel;
