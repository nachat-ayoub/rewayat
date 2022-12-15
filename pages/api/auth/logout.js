import { isAuth } from "@utils/auth";
import { deleteTokenCookie } from "@utils/token";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { auth } = isAuth({ req }, process.env.JWT_SECRET);

    if (auth) {
      deleteTokenCookie({ req, res });
      return res.status(200).json({
        ok: true,
      });
    } else return res.json({ status: 401, ok: false, msg: "Unauthorized" });
  } else {
    return res.json({ status: 404, message: "Not Found" });
  }
}
