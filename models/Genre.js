const mongoose = require("mongoose");
const Novel = require("./Novel");

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
      lowercase: true,
      trim: true,
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

genreSchema.post("remove", async (genre) => {
  for (let i = 0; i < genre.novels.length; i++) {
    const novel = await Novel.findById(genre.novels[i]);

    const novelGenreIndex = novel.genres.indexOf(genre._id);

    if (novelGenreIndex > -1) {
      novel.genres.splice(novelGenreIndex, 1);
      await novel.save();
    }
  }
});

const Genre = mongoose.model("Genre", genreSchema);
module.exports = Genre;
