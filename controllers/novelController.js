const slugify = require("slugify");
const Novel = require("../models/Novel");

// ! Get All Novels
module.exports.getAll = async (req, res) => {
  try {
    const novels = await Novel.find({});

    res.json({
      action: "getAll",
      count: novels.length,
      novels,
    });
  } catch (error) {
    console.log(error);
  }
};

// ! Get One Novel
module.exports.getOne = async (req, res) => {
  try {
    const { slug } = req.params;

    const novel = await Novel.findOne({ slug });

    res.json({ action: "getOne", slug, novel });
  } catch (error) {
    console.log(error);
  }
};

// ! Create Novel
module.exports.create = async (req, res) => {
  try {
    const { title, image } = req.body;
    const slug = slugify(title);

    const isNovelExist = await Novel.findOne({ slug });

    if (isNovelExist)
      return res.json({
        action: "create",
        msg: "there is already a novel with this title!",
        ok: false,
      });

    const novel = await Novel.create({ title, slug, image });
    res.json({ action: "create", novel });
  } catch (error) {
    console.log(error);
  }
};

// ! Update Novel
module.exports.update = async (req, res) => {
  try {
    const novel = await Novel.findOne({ slug: req.params.slug });
    if (!novel) {
      return res.json({
        action: "update",
        slug: req.params.slug,
        msg: "no novel with this slug!",
        ok: false,
      });
    }
    const { title, image } = req.body;

    if (title) {
      await novel.update({ title, slug: slugify(title), image });
    } else {
      await novel.update({ ...req.body });
    }
    await novel.save();

    return res.json({ action: "update", slug: req.params.slug, ok: true });
  } catch (error) {
    console.log(error);
  }
};
// ! Delete Novel
module.exports.remove = async (req, res) => {
  try {
    const { slug } = req.params;
    const novel = await Novel.findOneAndDelete({ slug });

    if (!novel) {
      return res.json({
        action: "delete",
        slug,
        msg: "no novel with this slug!",
        ok: false,
      });
    }
    return res.json({
      action: "delete",
      slug: req.params.slug,
      ok: true,
      novel,
    });
  } catch (error) {
    console.log(error);
  }
};
