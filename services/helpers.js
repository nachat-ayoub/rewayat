const { setCookie, hasCookie, getCookie } = require("cookies-next");

const cookieMaxAge = 60 * 60 * 24 * 7; // Expires after 7 days

const setToken = (token, { req, res }, expiresTime) => {
  return setCookie("token", token, {
    req,
    res,
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: expiresTime || cookieMaxAge, // cookieMaxAge = 7 days
    path: "/",
  });
};

const getToken = () => {
  if (hasCookie("token")) {
    return getCookie("token");
  } else return null;
};

const deleteToken = ({ req, res }) => {
  if (hasCookie("token", { req, res })) {
    setToken("", { req, res }, 0.001);
  }
};

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

export default {
  getBase64,
  setToken,
  getToken,
  deleteToken,
};
