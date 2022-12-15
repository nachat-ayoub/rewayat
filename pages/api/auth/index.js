import { isAuth } from "@utils/auth";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { auth, user } = isAuth({ req }, process.env.JWT_SECRET);
    const { token } = req.cookies;

    if (auth) {
      return res.status(200).json({
        ok: true,
        user,
        token,
      });
    } else return res.json({ status: 401, ok: false, msg: "Unauthorized" });
  } else {
    return res.json({ status: 404, message: "Not Found" });
  }
}
