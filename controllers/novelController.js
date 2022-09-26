const { default: mongoose } = require("mongoose");
const slugify = require("slugify");
const Genre = require("../models/Genre");
const Novel = require("../models/Novel");
const User = require("../models/User");
const { removeDuplicateGenres } = require("../services/helpersFunctions");

// ! Get All Novels [X]
module.exports.getAllNovels = async (req, res) => {
  try {
    const novels = await Novel.find({})
      .populate("chapters")
      .populate("genres", "_id name slug");
    res.json({
      action: "getAllNovels",
      count: novels.length,
      novels,
    });
  } catch (error) {
    console.log(error);
  }
};

// ! Get Novels By Genre [X]
module.exports.getNovelsByGenre = async (req, res) => {
  try {
    const genre = await Genre.findOne({ slug: req.params.genre }).populate(
      "novels"
    );

    if (genre)
      return res.json({
        action: "getNovelsByCategory",
        ok: true,
        count: genre.novels.length,
        genre,
      });
    else
      return res.json({
        action: "getNovelsByCategory",
        ok: false,
        count: 0,
        genre: null,
      });
  } catch (error) {
    console.log(error);
  }
};

// ! Get One Novel [X]
module.exports.getNovel = async (req, res) => {
  try {
    const { slug } = req.params;
    const novel = await Novel.findOne({ slug })
      .populate("genres")
      .populate("publisher", "username email image bio createdAt updatedAt");

    if (!novel)
      return res.json({
        action: "getNovel",
        slug: req.params.slug,
        msg: "no novel with this slug!",
        ok: false,
      });

    res.json({ action: "getNovel", slug, novel });
  } catch (error) {
    console.log(error);
  }
};

// ! Create Novel [X]
module.exports.createNovel = async (req, res) => {
  try {
    if (!req.body.title)
      return res.json({
        action: "createNovel",
        msg: "All Fields Required!",
        ok: false,
      });

    const slug = slugify(req.body.title);
    const isNovelExist = await Novel.findOne({ slug });

    if (isNovelExist)
      return res.json({
        action: "createNovel",
        msg: "there is already a novel with this title!",
        ok: false,
      });

    const genres = [];
    req.body.genres = removeDuplicateGenres(req.body?.genres);

    for (let i = 0; i < req.body?.genres.length; i++) {
      const genre = req.body?.genres[i];

      const genreExist = await Genre.findOne({ name: genre.name });
      if (genreExist) {
        req.body.genres[i] = genreExist._id;
        genres.push(genreExist);
      } else {
        const newGenre = await Genre.create({
          name: genre.name,
          slug: slugify(genre.name),
        });
        req.body.genres[i] = newGenre._id;
        genres.push(newGenre);
      }
    }

    const user = await User.findById(req.user.id);
    const novel = await Novel.create({ slug, ...req.body });

    genres.map(async (genre) => {
      genre.novels.push(novel._id);
      await genre.save();
    });

    novel.publisher = user._id;
    await novel.save();

    user.novels.push(novel);
    await user.save();

    res.json({ action: "createNovel", ok: true, novel });
  } catch (error) {
    console.log(error);
  }
};

// ! Update Novel [X]
module.exports.updateNovel = async (req, res) => {
  try {
    const novel = await Novel.findOne({ slug: req.params.slug }).populate(
      "genres"
    );
    if (!novel) {
      return res.json({
        action: "updateNovel",
        slug: req.params.slug,
        msg: "no novel with this slug!",
        ok: false,
      });
    }

    if (req.body?.title) {
      req.body.slug = slugify(req.body?.title);
    }

    const genres = [];
    req.body.genres = removeDuplicateGenres(req.body?.genres);

    for (let i = 0; i < req.body.genres.length; i++) {
      const elm = req.body.genres[i];
      // req.body.genres[i] = elm.name;
      // DONE: check if novel has the genre:
      if (novel.genres.some((genre) => genre.name === elm.name)) {
        const genre = novel.genres.find((genre) => genre.name === elm.name);
        req.body.genres[i] = genre._id;
        genres.push(genre);
      } else {
        let newGenre = await Genre.findOne({ name: elm.name });
        // DONE: check if the genre exist in db:
        if (newGenre) {
          req.body.genres[i] = newGenre._id;
          genres.push(newGenre);
        }
        // DONE: if not create the genre:
        else {
          newGenre = await Genre.create({
            name: elm.name,
            slug: slugify(elm.name),
          });
          req.body.genres[i] = newGenre._id;
          genres.push(newGenre);
        }
      }
    }

    for (let j = 0; j < genres.length; j++) {
      const genre = genres[j];
      // DONE: Check if novel id not exist in genre novels:
      if (!genre.novels.includes(novel._id)) {
        genre.novels.push(mongoose.Types.ObjectId(novel._id));
        await genre.save();
      }
    }

    for (let i = 0; i < novel.genres.length; i++) {
      const genre = novel.genres[i];
      // DONE: Remove novel id from genre novels:
      // ? check if genres not includes novel.genres id -(loop on novel.genres)-:
      if (!req.body.genres.includes(genre._id)) {
        const updatedGenre = await Genre.findById(genre._id);
        const index = updatedGenre.novels.indexOf(novel._id);
        if (index > -1) {
          updatedGenre.novels.splice(index, 1);
          await updatedGenre.save();
        }
      }
    }

    await Novel.updateOne({ _id: novel._id }, { ...req.body });

    return res.json({ action: "updateNovel", slug: req.params.slug, ok: true });
  } catch (error) {
    console.log(error);
  }
};
// ! Delete Novel [X]
module.exports.deleteNovel = async (req, res) => {
  try {
    const { slug } = req.params;
    const novel = await Novel.findOneAndDelete({ slug });

    if (!novel) {
      return res.json({
        action: "deleteNovel",
        slug,
        msg: "no novel with this slug!",
        ok: false,
      });
    }

    const user = await User.findById(novel.publisher._id);
    // user.novels

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

    return res.json({
      action: "deleteNovel",
      slug: req.params.slug,
      ok: true,
      novel,
    });
  } catch (error) {
    console.log(error);
  }
};
