const mongoose = require("mongoose");

const chapterSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: Number,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    published: {
      type: Boolean,
      default: false,
    },
    publisher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    novel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Novel",
    },
  },
  { timestamps: true }
);

const Chapter = mongoose.model("Chapter", chapterSchema);
module.exports = Chapter;
