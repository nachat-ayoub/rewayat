const slugify = require("slugify");

const arabicLettersMap = {
  ء: "ء",
  ا: "ا",
  أ: "أ",
  إ: "إ",
  آ: "آ",
  ؤ: "ؤ",
  ئ: "ئ",
  ب: "ب",
  ت: "ت",
  ث: "ث",
  ج: "ج",
  ح: "ح",
  خ: "خ",
  د: "د",
  ذ: "ذ",
  ر: "ر",
  ز: "ز",
  س: "س",
  ش: "ش",
  ص: "ص",
  ض: "ض",
  ط: "ط",
  ظ: "ظ",
  ع: "ع",
  غ: "غ",
  ف: "ف",
  ق: "ق",
  ك: "ك",
  ل: "ل",
  م: "م",
  ن: "ن",
  ه: "ه",
  و: "و",
  ي: "ي",
  ة: "ة",
  ى: "ى",
};

slugify.extend(arabicLettersMap);
module.exports.slugify = (string) => {
  return slugify(string, {
    remove: /[$*_+~.()'"!\-:@]+/g,
  });
};

module.exports.checkAuth = require("./checkAuth");
