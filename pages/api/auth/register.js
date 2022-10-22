import axios from "axios";
import auth from "../../../services/auth";
import helpers from "../../../services/helpers";

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const { username, email, password } = req.body;
      if (username && email && password) {
        const { data: resp } = await axios.post(
          `${process.env.API_URL}/auth/register`,
          {
            username,
            email,
            password,
          }
        );

        if (resp.ok) {
          const token = auth.createToken(resp.user, process.env.JWT_SECRET);
          helpers.setToken(token);
          return res.status(200).json({
            ok: true,
            token,
          });
        } else return res.status(400).json(resp);
      } else {
        return res.status(404).json({ status: 404, message: "Not Found" });
      }
    } else {
      return res.status(404).json({ status: 404, message: "Not Found" });
    }
  } catch (error) {
    console.log(error);
  }
}
