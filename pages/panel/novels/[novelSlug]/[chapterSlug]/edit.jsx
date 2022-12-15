import { requireAuthorAuth } from "@utils/middlewares";
import useLoadingPopup from "@hooks/useLoadingPopup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import * as yup from "yup";
import axios from "axios";

import Container from "@components/Container";
import { Button } from "flowbite-react";
import Line from "@components/Line";
import OnlyRoleAlert from "@components/OnlyRoleAlert";

const EditChapterPage = ({ chapter, user }) => {
  const router = useRouter();
  const { RenderLoadingPopup, openLoadingPopup, closeLoadingPopup } =
    useLoadingPopup();

  const schema = yup.object().shape({
    title: yup.string().required(),
    published: yup.boolean().default(false),
    slug: yup
      .number()
      .typeError("slug must be a valid number")
      .test("positive", "slug must be >= 0", (value) => value >= 0)
      .required(),
    content: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: chapter.title,
      published: chapter.published,
      slug: chapter.slug,
      content: chapter.content,
    },
    resolver: yupResolver(schema),
  });

  const createNewChapter = async (data) => {
    try {
      openLoadingPopup();
      const { data: res } = await axios.put(
        `${process.env.API_URL}/novels/${chapter.novel.slug}/${chapter.slug}/update`,
        data,
        {
          headers: {
            token: user.token,
          },
        }
      );

      if (res.ok) {
        setTimeout(() => {
          closeLoadingPopup();
          router.push("/panel/chapters");
        }, 1500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handelChapterDelete = async () => {
    try {
      const novelSlug = chapter.novel.slug;
      const chapterSlug = chapter.slug;

      const res = await axios.delete(
        `${process.env.API_URL}/novels/${novelSlug}/${chapterSlug}/delete`,
        {
          headers: {
            token: user.token,
          },
        }
      );

      if (res?.data?.ok) {
        // TODO: add toast notification
        router.push("/panel/chapters");
      } else {
        // TODO: display error
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="h-full">
      <RenderLoadingPopup />
      <div className="h-full w-full flex justify-center items-center flex-col">
        <form
          onSubmit={handleSubmit(createNewChapter)}
          dir="ltr"
          className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 mx-3 sm:w-4/5 sm:mx-8 md:w-[65vw] md:max-w-[30rem]"
        >
          <h2 className="text-xl text-gray-700 dark:text-white font-bold text-center">
            Edit chapter
          </h2>

          <Line className={"my-3"} />

          <h2 className="mb-4 text-base text-gray-700 dark:text-white font-semibold text-center">
            {chapter.novel.title}
          </h2>
          {/* Fields */}
          <div className="w-full">
            {/* Title */}
            <div className="w-full">
              <input
                dir="auto"
                className="input mt-2"
                type="text"
                placeholder="chapter title..."
                {...register("title")}
              />
              <div className="my-2">
                <div className="text-red-500 text-sm">
                  {errors.title?.message}
                </div>
              </div>
            </div>
            {/* Slug And Published */}
            <div className="w-full flex gap-4 justify-between items-center">
              {/* Slug */}
              <div className="w-2/3">
                <input
                  dir="auto"
                  className="input mt-2"
                  type="text"
                  placeholder="chapter slug..."
                  {...register("slug")}
                />
                <div className="my-2">
                  <div className="text-red-500 text-sm">
                    {errors.slug?.message}
                  </div>
                </div>
              </div>
              {/* Published */}
              <div className="">
                <label className="" htmlFor="published">
                  published
                  <input
                    className="ml-3"
                    type="checkbox"
                    id="published"
                    {...register("published")}
                  />
                </label>
              </div>
            </div>
            {/* Content */}
            <div className="w-full">
              <textarea
                dir="auto"
                rows={6}
                className="input mt-2 min-h-[2.5rem]"
                type="text"
                placeholder="chapter content..."
                {...register("content")}
              />
              <div className="my-2">
                <div className="text-red-500 text-sm">
                  {errors.content?.message}
                </div>
              </div>
            </div>
            {/*  */}
          </div>

          <button className="btn-purple mt-3">Update</button>
          {user.role === "admin" ? (
            <>
              <div className="flex justify-center items-center my-3">
                <Line />
                <p className="px-2">Or</p>
                <Line />
              </div>
              <Button
                onClick={handelChapterDelete}
                color="failure"
                className="w-full rounded-[4px]"
              >
                Delete
              </Button>
            </>
          ) : (
            <OnlyRoleAlert role={"admin"} action={"delete chapters."} />
          )}
        </form>
      </div>
    </Container>
  );
};

export default EditChapterPage;

export const getServerSideProps = async ({ req, params }) => {
  return requireAuthorAuth({ req }, async ({ user }) => {
    // /:novelSlug/:chapterSlug

    const { data } = await axios.get(
      `${process.env.API_URL}/novels/${params?.novelSlug}/${params?.chapterSlug}`,
      {
        headers: {
          token: user.token,
        },
      }
    );

    if (data.ok) {
      return {
        props: { chapter: data.chapter, user },
      };
    }

    return {
      props: { chapter: null },
    };
  });
};
