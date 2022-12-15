const mongoose = require("mongoose");
const Chapter = require("./Chapter");
const Genre = require("./Genre");
const User = require("./User");

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

novelSchema.post("remove", async (novel) => {
  const user = await User.findById(novel.publisher);

  const userNovelIndex = user.novels.indexOf(novel._id);
  if (userNovelIndex > -1) {
    user.novels.splice(userNovelIndex, 1);
    await user.save();
  }

  for (let i = 0; i < novel.genres.length; i++) {
    const genreId = novel.genres[i];
    const genre = await Genre.findById(genreId);
    const genreNovelIndex = genre.novels.indexOf(novel._id);
    if (genreNovelIndex > -1) {
      genre.novels.splice(genreNovelIndex, 1);
      await genre.save();
    }
  }

  await Chapter.deleteMany({ novel: novel._id });
});

const Novel = mongoose.model("Novel", novelSchema);

module.exports = Novel;
