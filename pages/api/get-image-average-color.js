import { getAverageColor } from "fast-average-color-node";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { imageUrl } = req.body;
    // console.log(`========> Message from getAverageColor Api: (imageUrl) = ${imageUrl}`);

    if (!imageUrl || imageUrl.trim() === "") {
      return res.json({ message: "“imageUrl” param is required." });
    }
    getAverageColor(imageUrl).then((color) => {
      // console.log( `========> Message from getAverageColor Api: (color) = `, color);
      return res.json({ message: "Operation Complete Successfully!", color });
    });
  }
}
