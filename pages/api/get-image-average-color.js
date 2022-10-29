import { getAverageColor } from "fast-average-color-node";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { imageUrl } = req.query;

    getAverageColor(imageUrl ?? "http://localhost:3000/avatar.jpg").then(
      (color) => {
        // console.log( `========> Message from getAverageColor Api: (color) = `, color);
        return res.json({ message: "Operation Complete Successfully!", color });
      }
    );

    // console.log(`========> Message from getAverageColor Api: (imageUrl) = ${imageUrl}`);

    if (!imageUrl || imageUrl.trim() === "") {
      return res.json({ message: "“imageUrl” param is required." });
    }
  }
}
