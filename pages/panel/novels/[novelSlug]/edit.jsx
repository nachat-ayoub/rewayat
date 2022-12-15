import { requireAuthorAuth } from "@utils/middlewares";
import useLoadingPopup from "@hooks/useLoadingPopup";
import { yupResolver } from "@hookform/resolvers/yup";
import { getBase64, isRTL } from "@utils/index";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import * as yup from "yup";
import axios from "axios";

import LinkButton from "@components/LinkButton";
import Container from "@components/Container";
import Line from "@components/Line";
import { Button } from "flowbite-react";

const EditNovel = ({ user, novel, genres }) => {
  const [selectedGenres, setSelectedGenres] = useState(novel?.genres ?? []);
  const [filteredGenres, setFilteredGenres] = useState([]);
  const [genreInput, setGenreInput] = useState("");
  const { RenderLoadingPopup, toggleLoadingPopup } = useLoadingPopup();

  const router = useRouter();

  const schema = yup.object().shape({
    title: yup.string().required(),
    story: yup.string().required(),
    image: yup
      .mixed()
      .test("fileSize", "The image is too large max size is 1MB", ([file]) => {
        const one_MB = 1050000;
        if (!file) return true;

        return file && file.size <= one_MB;
      })
      .test(
        "fileType",
        "This image format is not supported (supported formats: png/jpg/jpeg)",
        ([file]) => {
          if (!file) return true;
          return ["png", "jpg", "jpeg"].includes(file.type.split("image/")[1]);
        }
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: novel?.title,
      story: novel?.story,
    },
    resolver: yupResolver(schema),
  });

  const updateNovel = ({ title, story, image }) => {
    toggleLoadingPopup();

    getBase64(image[0], async (image) => {
      const res = await axios.put(
        `${process.env.API_URL}/novels/${novel?.slug}/update`,
        {
          title,
          story,
          image,
          genres: selectedGenres,
        },
        {
          headers: {
            token: user.token,
          },
        }
      );

      if (res?.data?.ok) {
        setTimeout(() => {
          toggleLoadingPopup();
          router.push("/panel/novels");
        }, 1000);
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

  const handelNovelDelete = async () => {
    try {
      const res = await axios.delete(
        `${process.env.API_URL}/novels/${novel.slug}/delete`,
        {
          headers: {
            token: user.token,
          },
        }
      );

      if (res?.data?.ok) {
        // TODO: add toast notification
        router.push("/panel/novels");
      } else {
        // TODO: display error
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <RenderLoadingPopup />
      <div className="h-full w-full flex justify-center items-center flex-col">
        <div
          dir="ltr"
          className="bg-white dark:bg-gray-700 w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 mx-3 sm:w-4/5 sm:mx-8 md:w-[65vw] md:max-w-[30rem]"
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
                      } else if (genreInput.trim().includes(",")) {
                        genreInput
                          .trim()
                          .split(",")
                          .map((g) => {
                            addToSelectedGenre({
                              name: g.trim(),
                            });
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
                  } -translate-y-1/2 text-3xl cursor-pointer transition-all duration-300 text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-600`}
                >
                  <i className="fa-plus-square fa-solid" />
                </button>
                <input
                  dir="auto"
                  className={`input mt-2 ${
                    isRTL(genreInput) ? "pl-10" : "pr-10"
                  }`}
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
                    className="bg-secondary-100 dark:text-Black shadow border border-secondary-300 rounded-b absolute w-full top-full overflow-hidden"
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
              <div
                dir={isRTL(selectedGenres?.at(-1)?.name) ? "rtl" : "ltr"}
                className="rounded border border-secondary-300 p-1 mt-2 flex flex-wrap gap-1"
              >
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
          <form onSubmit={handleSubmit(updateNovel)}>
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
                type="file"
                id="image"
                accept="image/*"
                className="input mt-2 p-0 focus:p-0 cursor-pointer"
                {...register("image")}
              />
            </label>
            <div className="my-2">
              <div className="text-red-500 text-sm">
                {errors.image?.message}
              </div>
            </div>

            {/*  */}

            <button className="btn-purple mt-3">Update</button>
            {user.role === "admin" ? (
              <>
                <div className="flex justify-center items-center my-3">
                  <Line />
                  <p className="px-2">Or</p>
                  <Line />
                </div>
                <Button
                  onClick={handelNovelDelete}
                  color="failure"
                  className="w-full rounded-[4px]"
                >
                  Delete
                </Button>
              </>
            ) : (
              <OnlyRoleAlert role={"admin"} action={"delete novels."} />
            )}
          </form>
        </div>
      </div>
    </Container>
  );
};

export default EditNovel;

export const getServerSideProps = ({ req, params }) => {
  return requireAuthorAuth({ req }, async ({ user }) => {
    const resp = await axios.get(`${process.env.API_URL}/genres`, {
      headers: { token: user?.token },
    });

    const novelResp = await axios.get(
      `${process.env.API_URL}/novels/${params?.novelSlug}`,
      {
        headers: {
          token: user.token,
        },
      }
    );

    return {
      props: {
        user,
        novel: novelResp?.data?.novel ?? null,
        genres: resp?.data?.genres ?? [],
      },
    };
  });
};
