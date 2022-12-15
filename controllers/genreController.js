const { slugify } = require("../services/");
const Genre = require("../models/Genre");

module.exports.getAllGenres = async (req, res) => {
  try {
    const genres = await Genre.find({});
    res.json({ action: "getAllGenres", ok: true, genres });
  } catch (error) {
    console.log(error);
  }
};

module.exports.createGenre = async (req, res) => {
  try {
    const genre_param = req.body?.genre;

    if (!genre_param || !genre_param?.name) {
      return res.json({
        action: "createGenre",
        msg: "genre is required",
        ok: false,
      });
    }

    genre_param.slug = slugify(genre_param.name);
    console.log({ genre_param });

    const genre = await Genre.create({
      name: genre_param.name,
      slug: genre_param.slug,
      novels: [],
    });

    return res.json({
      action: "createGenre",
      ok: true,
      genre,
      // : genre_param
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.deleteGenre = async (req, res) => {
  try {
    res.json({
      ok: true,
      action: "deleteGenre",
      msg: "Delete Genre is not supported right now.",
    });
  } catch (error) {
    console.log(error);
  }
};
