import { createToken, setTokenCookie } from "../../../utils/token";
import axios from "axios";

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
          const token = createToken(resp.user, process.env.JWT_SECRET);
          setTokenCookie(token, { req, res });
          return res.status(200).json({
            ok: true,
            user: resp.user,
            token,
          });
        } else return res.json(resp);
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
