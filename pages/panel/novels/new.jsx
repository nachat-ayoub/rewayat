import { requireAuthorAuth } from "../../../utils/middlewares";
import { yupResolver } from "@hookform/resolvers/yup";
import { getBase64, isRTL } from "../../../utils";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";

import Container from "../../../components/Container";
import LinkButton from "../../../components/LinkButton";

const CreateNovel = ({ genres }) => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [filteredGenres, setFilteredGenres] = useState([]);
  const [genreInput, setGenreInput] = useState("");

  const { user } = useSelector((state) => state.auth.value);
  const router = useRouter();

  const schema = yup.object().shape({
    title: yup.string().required(),
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
    createNewNovel(data);
  };

  const createNewNovel = ({ title, story, image }) => {
    const { token } = user;
    getBase64(image[0], async (image) => {
      const res = await axios.post(
        process.env.API_URL + "/novels/create",
        {
          title,
          story,
          image,
          genres: selectedGenres,
        },
        {
          headers: {
            token,
          },
        }
      );

      if (res?.data?.ok) {
        return router.push("/panel/novels");
      }
    });
  };

  const addToSelectedGenre = (genre) => {
    setSelectedGenres((val) => {
      if (val.some((gen) => gen.name === genre.name)) return val;
      return [...val, genre];
    });
  };

  const removeFromSelectedGenre = (genre) => {
    setSelectedGenres((val) =>
      val.filter((_genre) => genre.name !== _genre.name)
    );
  };

  useEffect(() => {
    let left_genres = genres
      .filter((genre) => genre.name.includes(genreInput.trim()))
      .filter(({ name }) => !selectedGenres.some((g) => g.name === name));

    left_genres.sort(
      (a, b) =>
        a.name.indexOf(genreInput.trim()) - b.name.indexOf(genreInput.trim())
    );

    setFilteredGenres(
      left_genres.length > 3 ? left_genres.slice(0, 3) : left_genres
    );
  }, [genreInput]);

  return (
    <Container>
      <div className="h-full w-full flex justify-center items-center flex-col">
        <div
          dir="ltr"
          className="bg-white w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 mx-3 w-full sm:w-4/5 sm:mx-8 md:w-[65vw] md:max-w-[30rem]"
        >
          <div className="mb-3">
            <h2 className="text-xl text-gray-700 font-bold text-center">
              Create new novel!
            </h2>
          </div>
          {/* Genres */}
          <div className="mt-4">
            {/* Genre Input */}
            <form onSubmit={(e) => e.preventDefault()}>
              <div dir="auto" className="relative">
                <button
                  onClick={() => {
                    if (genreInput.trim() !== "") {
                      if (filteredGenres.length > 0) {
                        addToSelectedGenre({
                          name: filteredGenres[0]?.name.trim(),
                        });
                        setGenreInput("");
                      } else {
                        addToSelectedGenre({ name: genreInput.trim() });
                        setGenreInput("");
                      }
                    }
                  }}
                  className={`absolute top-1/2 ${
                    isRTL(genreInput) ? "left-2" : "right-2"
                  } -translate-y-1/2 text-3xl cursor-pointer transition-all duration-300 text-primary-200 hover:text-primary-100`}
                >
                  <i className="fa-plus-square fa-solid" />
                </button>
                <input
                  dir="auto"
                  className="input mt-2"
                  type="text"
                  placeholder="add new genre..."
                  onChange={(e) => setGenreInput(e.target.value)}
                  value={genreInput}
                  aria-controls="genresList"
                />
                {genreInput.trim() !== "" && filteredGenres.length > 0 && (
                  <ul
                    role="tablist"
                    id="genresList"
                    className="bg-secondary-100 shadow border border-secondary-300 rounded-b absolute w-full top-full overflow-hidden"
                  >
                    {filteredGenres.map((genre, i) => (
                      <li
                        onClick={() => addToSelectedGenre(genre)}
                        key={i}
                        role="tab"
                        tabIndex={i}
                        className="list"
                      >
                        {genre.name.trim()}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </form>

            {/* <h4 className="text-lg">Selected Genres:</h4> */}
            {selectedGenres?.length > 0 && (
              <div className="rounded border border-secondary-300 p-1 mt-2 flex flex-wrap gap-1">
                {selectedGenres?.map((genre, ind) => (
                  <div
                    key={ind}
                    onClick={() =>
                      removeFromSelectedGenre({ name: genre?.name })
                    }
                  >
                    <LinkButton
                      className={`inline-block leading-[1.4rem] ${
                        isRTL(genre?.name) ? "text-[10px]" : ""
                      }`}
                    >
                      {genre?.name}
                    </LinkButton>
                  </div>
                ))}
              </div>
            )}
          </div>
          <form onSubmit={handleSubmit(onFormSubmit)}>
            {/* Title */}
            <input
              dir="auto"
              className="input mt-2"
              type="text"
              placeholder="title..."
              {...register("title")}
            />
            <div className="my-2">
              <div className="text-red-500 text-sm">
                {errors.title?.message}
              </div>
            </div>

            {/* Story */}
            <textarea
              dir="auto"
              rows={4}
              className="input mt-2 min-h-[2.5rem]"
              type="text"
              placeholder="story..."
              {...register("story")}
            />
            <div className="my-2">
              <div className="text-red-500 text-sm">
                {errors.story?.message}
              </div>
            </div>

            {/* Image */}
            <label htmlFor="image" className="">
              Image :
              <input
                id="image"
                className="input mt-2 py-0 focus:py-0"
                accept="image/*"
                type="file"
                {...register("image")}
              />
            </label>
            <div className="my-2">
              <div className="text-red-500 text-sm">
                {errors.image?.message}
              </div>
            </div>

            {/*  */}
            <button className="btn btn-purple mt-3">Create</button>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default CreateNovel;

export const getServerSideProps = ({ req }) => {
  return requireAuthorAuth({ req }, async ({ user }) => {
    const resp = await axios.get(process.env.API_URL + "/genres", {
      headers: { token: user?.token },
    });

    return {
      props: { genres: resp?.data?.genres ?? [] },
    };
  });
};
