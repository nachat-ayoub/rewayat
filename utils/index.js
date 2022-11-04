import axios from "axios";

const getBase64 = (file, cb) => {
  if (!file) return cb(null);

  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    cb(reader.result);
  };
  reader.onerror = function (error) {
    console.log("Error: ", error);
  };
};

const getImageMainColor = async (imageUrl) => {
  if (!imageUrl) return null;

  const { data } = await axios.post(`/api/get-image-average-color`, {
    imageUrl,
  });
  return data.color;
};

const isRTL = (text) => {
  let ltrChars =
    "A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF" +
    "\u2C00-\uFB1C\uFDFE-\uFE6F\uFEFD-\uFFFF";
  let rtlChars = "\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC";
  let rtlDirCheck = new RegExp("^[^" + ltrChars + "]*[" + rtlChars + "]");

  return rtlDirCheck.test(text);
};

export { getBase64, getImageMainColor, isRTL };
