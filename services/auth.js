import axios from "axios";
import jwt from "jsonwebtoken";

const register = async (data) => {
  try {
    const res = await axios.post(`/api/auth/register`, {
      ...data,
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

const login = async ({ EmailOrUsername, password }) => {
  try {
    const res = await axios.post(`/api/auth/login`, {
      EmailOrUsername,
      password,
    });
    // console.log(res.data);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const logout = async () => {
  try {
    const res = await axios.post(`${process.env.API_URL}/auth/register`, {
      ...data,
    });
    // console.log(res.data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const maxAge = 60 * 60 * 24 * 7;

const createToken = (user, JWT_SECRET) => {
  return jwt.sign(user, JWT_SECRET, {
    expiresIn: maxAge, // 7 days
  });
};

const getUser = async () => {
  const { data } = await axios.get("/api/auth");
  // console.log(data);
  return data;
};

const verifyToken = (token, JWT_SECRET) => {
  return jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return { auth: false, user: null };
    } else {
      return { auth: true, user };
    }
  });
};

const isAuth = ({ req }, JWT_SECRET) => {
  const { token } = req.cookies;
  if (!token) return { auth: false, user: null };
  return verifyToken(token, JWT_SECRET);
};

class AuthHelpers {}

export default {
  verifyToken,
  isAuth,
  getUser,
  createToken,
  register,
  login,
  logout,
};
