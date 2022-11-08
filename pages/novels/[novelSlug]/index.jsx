import { useWindowSize } from "use-window-size-hook";
import { useEffect, useRef, useState } from "react";
import { isAuth } from "../../../utils/auth";
import axios from "axios";

import Container from "../../../components/Container";
import LinkButton from "../../../components/LinkButton";
import useToggler from "../../../hooks/useToggler";
import ClientOnly from "../../../components/ClientOnly";

const NovelPage = ({ novel }) => {
  const [height, setHeight] = useState(0);
  const [storyHidden, toggleStoryHidden] = useToggler();

  const divRef = useRef(null);

  useEffect(() => {
    setHeight(divRef.current.offsetHeight);
  });

  const { width } = useWindowSize();
  return (
    <div className="w-full h-full">
      <div className="relative w-full">
        {/* Content */}
        <div className="absolute top-0 left-0 z-10 w-full h-full text-Black dark:text-white md:text-white">
          <div ref={divRef}>
            <NovelInfo
              toggleStoryHidden={toggleStoryHidden}
              storyHidden={storyHidden}
              novel={novel}
            />
          </div>
        </div>
        <ClientOnly>
          <div
            className="w-full overflow-hidden"
            style={{ height: `${width < 768 ? 190 : height}px` }}
          >
            <div
              style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0.55) 50%, rgba(0, 0, 0, 0.8) 100%),
                url("${novel.image}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              className={`w-full h-full scale-110 blur-sm text-Black dark:text-white md:text-white`}
            />

            <NovelInfo storyHidden={storyHidden} novel={novel} />
          </div>
        </ClientOnly>
      </div>
      <NovelInfo
        novel={novel}
        storyHidden={storyHidden}
        toggleStoryHidden={toggleStoryHidden}
        mobileView
      />
    </div>
  );
};

export default NovelPage;

const NovelInfo = ({ novel, storyHidden, toggleStoryHidden, mobileView }) => {
  const voidFunction = () => {};

  return (
    <Container>
      <div
        className={`flex justify-start items-center flex-col md:justify-start md:items-start md:flex-row ${
          mobileView ? "flex md:hidden" : "hidden md:flex"
        }`}
      >
        {/* Poster */}
        <img
          className="border border-gray-500 border-opacity-80 absolute md:static top-1/4 left-1/2 -translate-x-1/2 md:translate-x-0 w-44 h-60 md:w-52 md:h-80 object-cover rounded-md shadow-lg md:ml-8 md:min-w-[13rem]"
          src={novel.image}
          alt={novel.title}
        />

        <div className={`mt-24 md:mt-0`}>
          <h1 className="text-2xl font-bold my-3 md:mt-0 text-center md:text-justify">
            {novel.title}
          </h1>
          <table className="">
            <tbody>
              {/* Story */}
              <tr className="align-top text-right">
                <th className="pl-4 py-2 whitespace-nowrap">القصة :</th>
                <td className="py-2 whitespace-pre-line font-semibold">
                  {storyHidden && novel.story.length > 200
                    ? novel.story.slice(0, 200) + "..."
                    : novel.story}

                  {novel.story.length > 200 && (
                    <span
                      className="btn btn-purple m-1 py-0 px-2 cursor-pointer whitespace-nowrap"
                      onClick={toggleStoryHidden ?? voidFunction}
                    >
                      {storyHidden ? "read more" : "read less"}
                    </span>
                  )}
                </td>
              </tr>
              {/* Author */}
              <tr className="align-top text-right">
                <th className="pl-4 py-2 whitespace-nowrap">المؤلف :</th>
                <td className="py-2 font-semibold">
                  {novel.publisher.username}
                </td>
              </tr>
              {/* Publish Date */}
              <tr className="align-top text-right">
                <th className="pl-4 py-2 whitespace-nowrap">تاريخ النشر :</th>
                <td className="py-2 font-semibold">
                  {novel.createdAt.split("T")[0].replaceAll("-", "/")}
                </td>
              </tr>

              {/* Views */}
              <tr className="align-top text-right">
                <th className="pl-4 py-2 whitespace-nowrap">المشاهدات :</th>
                <td className="py-2 font-semibold">{novel.views}</td>
              </tr>
              {/* Genres */}
              <tr className="align-top text-right">
                <th className="pl-4 py-2 whitespace-nowrap">التصنيفات :</th>
                <td className="relative py-2 font-semibold">
                  <div className="invisibles flex flex-wrap gap-1.5">
                    {novel.genres.length &&
                      novel.genres.map((genre) => (
                        <LinkButton
                          key={genre.slug}
                          href={`/novels/genre/${genre.slug}`}
                        >
                          {genre.name}
                        </LinkButton>
                      ))}
                  </div>
                </td>
              </tr>
              {/*  */}
            </tbody>
          </table>
        </div>
        {/*  */}
      </div>
    </Container>
  );
};

export const getServerSideProps = async ({ req, params }) => {
  const { user } = isAuth({ req }, process.env.JWT_SECRET);
  let novel;

  // if (auth) {
  const { data } = await axios.get(
    process.env.API_URL + "/novels/" + params.novelSlug,
    {
      headers: { token: user?.token ?? "" },
    }
  );

  novel = data?.novel;

  return {
    props: {
      novel,
    },
  };
};
