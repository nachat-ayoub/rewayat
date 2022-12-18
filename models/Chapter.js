const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Novel = require("./Novel");

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

chapterSchema.plugin(mongoosePaginate);

chapterSchema.post("remove", async (chapter) => {
  const novel = await Novel.findById(chapter.novel);
  const chapterIndex = novel.chapters.indexOf(chapter._id);

  if (chapterIndex > -1) {
    novel.chapters.splice(chapterIndex, 1);
    await novel.save();
  }
});

const Chapter = mongoose.model("Chapter", chapterSchema);
module.exports = Chapter;
