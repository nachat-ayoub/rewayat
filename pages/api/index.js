import { isAuth } from "../../../utils/auth";

export default async function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({
      message: "Hello World",
      ...isAuth({ req }, process.env.JWT_SECRET),
    });
  }
}
