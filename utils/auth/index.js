import axios from "axios";
import { verifyToken } from "../token";

const registerUser = async (data) => {
  try {
    const res = await axios.post(`/api/auth/register`, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async ({ EmailOrUsername, password }) => {
  try {
    const res = await axios.post(`/api/auth/login`, {
      EmailOrUsername,
      password,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

const getUser = async () => {
  const { data } = await axios.get("/api/auth");

  return data;
};

const isAuth = ({ req }, JWT_SECRET) => {
  const { token } = req.cookies;
  if (!token) return { auth: false, user: null };

  return verifyToken(token, JWT_SECRET);
};

export { isAuth, getUser, registerUser, loginUser };
