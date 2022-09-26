import authFunctions from "../../../services/auth";
import helpers from "../../../services/helpers";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { auth } = authFunctions.isAuth({ req }, process.env.JWT_SECRET);

    if (auth) {
      helpers.deleteToken({ req, res });
      return res.status(200).json({
        ok: true,
      });
    } else return res.json({ status: 401, ok: false, msg: "Unauthorized" });
  } else {
    return res.json({ status: 404, message: "Not Found" });
  }
}
