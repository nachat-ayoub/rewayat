import { isAuth } from "../../../utils/auth";
import { setTokenCookie } from "../../../utils/token";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { auth } = isAuth({ req }, process.env.JWT_SECRET);

    if (auth) {
      const { token } = req.body;
      if (!token) {
        return res.json({ ok: false, msg: "Fields Are Required!" });
      }

      setTokenCookie(token, { req, res });

      return res.status(200).json({
        message: "success!!",
        ok: true,
      });
    } else return res.json({ status: 401, ok: false, msg: "Unauthorized" });
  } else {
    return res.json({ status: 404, message: "Not Found" });
  }
}
