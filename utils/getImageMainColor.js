import axios from "axios";

const getImageMainColor = async (imageUrl) => {
  if (!imageUrl) return null;
  //   console.log(
  //     `========> Message from getImageMainColor: (imageUrl) = ${imageUrl}`
  //   );

  const { data } = await axios.post(
    `http://localhost:3000/api/get-image-average-color`,
    {
      imageUrl,
    }
  );

  //   console.log(
  //     `========> Message from getImageMainColor: (data.color) = `,
  //     data.color
  //   );
  return data.color;
};

export default getImageMainColor;
