import { hasCookie, getCookie, setCookie } from "cookies-next";

import jwt from "jsonwebtoken";

// ? 7 days
const maxAge = 60 * 60 * 24 * 7;

// * create a jwt token :
const createToken = (user, JWT_SECRET) => {
  return jwt.sign(user, JWT_SECRET, {
    expiresIn: maxAge,
  });
};

// * set a jwt token to a cookie :
const getTokenCookie = () => {
  if (hasCookie("token")) {
    return getCookie("token");
  } else return null;
};

// * set a jwt token to a cookie :
const setTokenCookie = (token, { req, res }, expiresTime) => {
  return setCookie("token", token, {
    req,
    res,
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: expiresTime ?? maxAge,
    path: "/",
  });
};

// * verify a jwt token :
const deleteTokenCookie = ({ req, res }) => {
  if (hasCookie("token", { req, res })) {
    setTokenCookie("", { req, res }, 0.001);
  }
};

// * verify a jwt token :
const verifyToken = (token, JWT_SECRET) => {
  return jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return { auth: false, user: null };
    } else {
      return { auth: true, user };
    }
  });
};

export {
  createToken,
  verifyToken,
  getTokenCookie,
  setTokenCookie,
  deleteTokenCookie,
};
