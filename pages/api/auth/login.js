import axios from "axios";
import auth from "../../../services/auth";
import helpers from "../../../services/helpers";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { EmailOrUsername, password } = req.body;
    if (EmailOrUsername && password) {
      const { data: resp } = await axios.post(
        `${process.env.API_URL}/auth/login`,
        {
          EmailOrUsername,
          password,
        }
      );

      console.log(resp);

      if (resp.ok) {
        const token = auth.createToken(resp.user, process.env.JWT_SECRET);
        helpers.setToken(token, { req, res });

        return res.status(200).json({
          ok: true,
          token,
          user: resp.user,
        });
      } else return res.json(resp);
    } else {
      return res.status(404).json({ status: 404, message: "Not Found" });
    }
  } else {
    return res.status(404).json({ status: 404, message: "Not Found" });
  }
}
