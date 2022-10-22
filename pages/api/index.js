import authFunctions from "../../services/auth";

export default async function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({
      message: "Hello World",
      ...authFunctions.isAuth({ req }, process.env.JWT_SECRET),
    });
  }
}
