import { isAuth } from "../../services/auth";

export default function handler(req, res) {
  res
    .status(200)
    .json({ name: "John Doe", ...isAuth({ req }, process.env.JWT_SECRET) });
}
