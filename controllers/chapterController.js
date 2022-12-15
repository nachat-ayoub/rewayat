const Chapter = require("../models/Chapter");
const Novel = require("../models/Novel");
const User = require("../models/User");

// ! Get One getAllChapters
module.exports.getAllChapters = async (req, res) => {
  try {
    const chapters = await Chapter.find({ published: true })
      .populate("novel")
      .sort({ createdAt: -1 });

    res.json({
      ok: true,
      msg: "getAllChapters",
      chapters,
    });
  } catch (error) {
    console.log(error);
  }
};

// ! Get One Chapter
module.exports.getChapter = async (req, res) => {
  try {
    let { novelSlug, chapterSlug } = req.params;

    chapterSlug = Number(chapterSlug);

    const novel = await Novel.findOne({ slug: novelSlug });
    if (!novel)
      res.json({
        action: "getChapters",
        count: novel.chapters.length,
        novel,
      });

    const chapter = await Chapter.findOne({
      novel: novel._id,
      slug: chapterSlug,
    })
      .populate("publisher", "_id username image")
      .populate("novel", "_id title slug");

    if (!chapter) {
      return res.json({
        action: "getChapter",
        msg: "no chapter with this slug!",
        ok: false,
      });
    }

    const chapters = await Chapter.find({ novel: novel._id }).sort({
      createdAt: 1,
    });

    let nextChapter = null;
    let prevChapter = null;

    for (let i = 0; i < chapters.length; i++) {
      const ch = chapters[i];
      if (ch.slug === chapter.slug) {
        const dummyChapter = {
          title: "#",
          slug: "#",
          content: "#",
          createdAt: "#",
          updatedAt: "#",
        };
        prevChapter = chapters[i - 1] || dummyChapter;
        nextChapter = chapters[i + 1] || dummyChapter;
      }
    }

    res.json({
      action: "getChapter",
      ok: true,
      chapterSlug,
      chapter,
      prevChapter: {
        slug: prevChapter.slug,
        title: prevChapter.title,
        disable: prevChapter.title.includes("#"),
      },
      nextChapter: {
        slug: nextChapter.slug,
        title: nextChapter.title,
        disable: nextChapter.title.includes("#"),
      },
      chapters,
    });
  } catch (error) {
    console.log(error);
  }
};

// ! Get Novel Chapters
module.exports.getNovelChapters = async (req, res) => {
  try {
    const { novelSlug } = req.params;

    const novel = await Novel.findOne({
      slug: novelSlug,
    }).populate("chapters", "_id slug title createdAt updatedAt");
    if (!novel) {
      return res.json({
        action: "getNovelChapters",
        msg: "no novel with this slug!",
        novelSlug,
        ok: false,
      });
    }

    res.json({
      action: "getNovelChapters",
      count: novel.chapters.length,
      novel,
    });
  } catch (error) {
    console.log(error);
  }
};

// ! Create Chapter
module.exports.createChapter = async (req, res) => {
  try {
    const novelSlug = req.params?.novelSlug;
    const { title, slug, content, published } = req.body;

    if (!title || !content || isNaN(slug) || slug < 0) {
      return res.status(400).json({
        action: "createChapter",
        ok: false,
        msg: "title, slug, and content are required!",
      });
    }

    const novel = await Novel.findOne({ slug: novelSlug });

    if (!novel) {
      return res.status(404).json({
        action: "createChapter",
        ok: false,
        msg: "no novel with this slug!",
      });
    }

    const chapterExist = await Chapter.findOne({ novel: novel._id, slug });
    if (chapterExist) {
      return res.status(400).json({
        action: "createChapter",
        ok: false,
        msg: "slug already used!",
      });
    }

    const user = await User.findById(req.user._id);
    const chapter = await Chapter.create({
      title,
      slug,
      content,
      published: published ?? false,
      publisher: user._id,
      novel: novel._id,
    });

    novel.chapters.push(chapter._id);
    await novel.save();

    res.json({ action: "createChapter", ok: true, chapter });
  } catch (error) {
    console.log(error);
  }
};

// ! Update Chapter
module.exports.updateChapter = async (req, res) => {
  try {
    const { slug, title, content, published } = req.body;

    if (!title || !content) {
      return res.json({
        action: "updateChapter",
        ok: false,
        msg: "title and content are required!",
      });
    }

    const { novelSlug, chapterSlug } = req.params;
    const novel = await Novel.findOne({ slug: novelSlug });
    if (!novel) {
      return res.json({
        action: "updateChapter",
        ok: false,
        msg: "no novel with this slug!",
      });
    }

    let chapter = await Chapter.findOne({
      novel: novel._id,
      slug: Number(chapterSlug),
    });
    if (!chapter) {
      return res.json({
        action: "updateChapter",
        ok: false,
        msg: "no chapter with this slug!",
      });
    }

    const user = req.user;

    if (user.role === "admin") {
      await chapter.update({
        slug: slug ?? chapter.slug,
        title,
        content,
        published: published ?? chapter.published,
      });
    } else {
      await chapter.update({
        title,
        content,
        published: published ?? chapter.published,
      });
    }

    res.json({ action: "updateChapter", ok: true });
  } catch (error) {
    console.log(error);
  }
};

// ! Delete Chapter
module.exports.deleteChapter = async (req, res) => {
  try {
    const { novelSlug, chapterSlug } = req.params;
    const novel = await Novel.findOne({ slug: novelSlug });

    if (!novel) {
      return res.json({
        action: "deleteChapter",
        ok: false,
        msg: "no novel with this slug!",
      });
    }

    const chapter = await Chapter.findOne({
      novel: novel._id,
      slug: Number(chapterSlug),
    });

    if (!chapter) {
      return res.json({
        action: "deleteChapter",
        ok: false,
        msg: "no chapter with this slug!",
      });
    }

    chapter.remove();

    res.json({ action: "deleteChapter", ok: true, chapter });
  } catch (error) {
    console.log(error);
  }
};
