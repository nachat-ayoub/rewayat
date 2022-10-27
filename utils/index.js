import axios from "axios";

const getBase64 = (file, cb) => {
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

export { getBase64, getImageMainColor };
