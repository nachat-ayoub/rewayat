module.exports.removeDuplicateGenres = (array) =>
  array.filter(
    (v, i, a) =>
      a.findIndex((v2) => ["name"].every((k) => v2[k] === v[k])) === i
  );
