import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { isAuth } from "../../services/auth";
import helpers from "../../services/helpers";
import Container from "../../components/Container";
import { useSelector } from "react-redux";
import axios from "axios";

const CreateNovel = () => {
  const { user } = useSelector((state) => state.auth.value);

  const schema = yup.object().shape({
    title: yup.string().required(),
    // slug: yup
    //   .number()
    //   .typeError("slug must be a valid number")
    //   .test("positive", "slug must be positive", (value) => value >= 0)
    //   .required(),
    story: yup.string().required(),
    image: yup
      .mixed()
      .test("required", "You need to provide an image", ([file]) => {
        if (file && file.size) return true;
        return false;
      })
      .test("fileSize", "The image is too large max size is 1MB", ([file]) => {
        const one_MB = 1050000;
        return file && file.size <= one_MB;
      })
      .test(
        "fileType",
        "This image format is not supported (supported formats: png/jpg/jpeg)",
        ([file]) => {
          if (!file) return false;
          return ["png", "jpg", "jpeg"].includes(file.type.split("image/")[1]);
        }
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onFormSubmit = (data) => {
    // console.log(data);
    createNovel(data);
  };

  const createNovel = ({ title, slug, story, image }) => {
    const { token } = user;

    helpers.getBase64(image[0], async (image) => {
      const res = await axios.post(
        process.env.API_URL + "/novels/create",
        {
          title,
          story,
          image,
          genres: [{ name: "test" }],
        },
        {
          headers: {
            token,
          },
        }
      );

      console.log(res);
    });
  };

  return (
    <Container>
      <div className="h-full w-full flex justify-center items-center flex-col">
        <form
          dir="ltr"
          onSubmit={handleSubmit(onFormSubmit)}
          className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 mx-3 sm:mx-8 md:w-[50vw] md:max-w-[30rem]"
        >
          <div className="mb-3">
            <h2 className="text-xl text-gray-700 font-bold text-center">
              Create new novel!
            </h2>
          </div>

          {/* Title */}
          <input
            className="input mt-2"
            type="text"
            placeholder="title..."
            {...register("title")}
          />
          <div className="my-2">
            <div className="text-red-400 text-sm">{errors.title?.message}</div>
          </div>

          {/* Story */}
          <textarea
            rows={4}
            className="input mt-2"
            type="text"
            placeholder="story..."
            {...register("story")}
          />
          <div className="my-2">
            <div className="text-red-400 text-sm">{errors.story?.message}</div>
          </div>

          {/* Image */}
          <input
            className="input mt-2"
            accept="image/*"
            type="file"
            {...register("image")}
          />
          <div className="my-2">
            <div className="text-red-400 text-sm">{errors.image?.message}</div>
          </div>

          {/*  */}
          <button className="btn btn-purple mt-3">Create</button>
        </form>
      </div>
    </Container>
  );
};

export default CreateNovel;

export const getServerSideProps = async (ctx) => {
  const { auth, user } = isAuth({ req: ctx.req }, process.env.JWT_SECRET);

  if (auth && ["admin", "author"].includes(user.role)) {
    return {
      props: {},
    };
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }
};
