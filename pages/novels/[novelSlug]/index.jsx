import { useEffect, useRef, useState } from "react";
import { useWindowSize } from "use-window-size-hook";
import axios from "axios";

import Container from "../../../components/Container";
import LinkButton from "../../../components/LinkButton";
import useToggler from "../../../hooks/useToggler";
import ClientOnly from "../../../components/ClientOnly";

const NovelPage = ({ novel }) => {
  const [height, setHeight] = useState(0);
  const divRef = useRef(null);

  useEffect(() => {
    setHeight(divRef.current.offsetHeight);
  });

  const [storyHidden, toggleStoryHidden] = useToggler();
  const [genresHidden, toggleGenresHidden] = useToggler();

  const { width, screenLayout } = useWindowSize();
  return (
    <div className="w-full h-full">
      <div className="relative w-full">
        {/* Content */}
        <div className="absolute top-0 left-0 z-10 w-full h-full text-Black dark:text-white md:text-white">
          <div ref={divRef}>
            <Container>
              <div className="flex justify-start items-center flex-col md:justify-start md:items-start md:flex-row">
                {/* Poster */}
                {/* md screen size and above */}
                <img
                  className="border-2 border-gray-500 border-opacity-10 absolute md:static top-1/3 left-1/2 -translate-x-1/2 md:translate-x-0 w-44 h-60 md:w-52 md:h-80 object-cover rounded-md shadow-lg ml-2"
                  src={novel.image}
                  alt={novel.title}
                />

                <div className="hidden md:block mt-60 md:mt-0 md:mr-4">
                  <h1 className="text-2xl font-bold my-3 text-center md:mt-0 md:text-justify">
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
                              onClick={toggleStoryHidden}
                            >
                              {storyHidden ? "read more" : "read less"}
                            </span>
                          )}
                        </td>
                      </tr>
                      {/* Author */}
                      <tr className="align-top text-right">
                        <th className="pl-4 py-2 whitespace-nowrap">
                          المؤلف :
                        </th>
                        <td className="py-2 font-semibold">
                          {novel.publisher.username}
                        </td>
                      </tr>
                      {/* Publish Date */}
                      <tr className="align-top text-right">
                        <th className="pl-4 py-2 whitespace-nowrap">
                          تاريخ النشر :
                        </th>
                        <td className="py-2 font-semibold">
                          {novel.createdAt.split("T")[0].replaceAll("-", "/")}
                        </td>
                      </tr>
                      {/* Genres */}
                      <tr className="align-top text-right">
                        <th className="pl-4 py-2 whitespace-nowrap">
                          التصنيفات :
                        </th>
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
          </div>
        </div>
        <ClientOnly>
          <div
            className="w-full overflow-hidden"
            style={{ height: `${width < 768 ? 180 : height}px` }}
          >
            <div
              style={{
                background: `
            linear-gradient(
              to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.7) 100%
            ),
            url("${novel.image}"),
            no-repeat
            `,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className={`w-full h-full scale-110 blur-sm text-Black dark:text-white md:text-white`}
            ></div>

            <Container>
              <div className="flex justify-start items-center flex-col md:justify-start md:items-start md:flex-row">
                <div className="block md:hidden mt-60 md:mt-0 md:mr-4">
                  <h1 className="text-2xl font-bold my-3 text-center md:mt-0 md:text-justify">
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
                              onClick={toggleStoryHidden}
                            >
                              {storyHidden ? "read more" : "read less"}
                            </span>
                          )}
                        </td>
                      </tr>
                      {/* Author */}
                      <tr className="align-top text-right">
                        <th className="pl-4 py-2 whitespace-nowrap">
                          المؤلف :
                        </th>
                        <td className="py-2 font-semibold">
                          {novel.publisher.username}
                        </td>
                      </tr>
                      {/* Publish Date */}
                      <tr className="align-top text-right">
                        <th className="pl-4 py-2 whitespace-nowrap">
                          تاريخ النشر :
                        </th>
                        <td className="py-2 font-semibold">
                          {novel.createdAt.split("T")[0]}
                        </td>
                      </tr>
                      {/* Genres */}
                      <tr className="align-top text-right">
                        <th className="pl-4 py-2 whitespace-nowrap">
                          التصنيفات :
                        </th>
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
          </div>
        </ClientOnly>
      </div>
      <Container>
        <div className="mt-24 w-full flex justify-between flex-col">
          <div className="">
            <div className="flex justify-start items-center flex-col md:justify-start md:items-start md:flex-row">
              <div className="block md:hidden md:mt-0 md:mr-4">
                <h1 className="text-2xl font-bold my-3 text-center md:mt-0 md:text-justify">
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
                            onClick={toggleStoryHidden}
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
                      <th className="pl-4 py-2 whitespace-nowrap">
                        تاريخ النشر :
                      </th>
                      <td className="py-2 font-semibold">
                        {novel.createdAt.split("T")[0]}
                      </td>
                    </tr>
                    {/* Genres */}
                    <tr className="align-top text-right">
                      <th className="pl-4 py-2 whitespace-nowrap">
                        التصنيفات :
                      </th>
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
          </div>
          {/*  */}
          {/*  */}
          {/*  */}
          <div className="">
            {novel.chapters.length > 0 ? (
              <div className=""></div>
            ) : (
              <div className="w-full">
                {/* <h4 className="text-3xl font-bold text-center">{height}</h4> */}
                {/* <br /> */}
                <h4 className="text-3xl text-center">No chapters (-_-)!</h4>
              </div>
            )}
          </div>
          {/* <LinkButton href={""}></LinkButton> */}
        </div>
      </Container>
    </div>
  );
};

export default NovelPage;

export const getServerSideProps = async (ctx) => {
  const {
    data: { novel },
  } = await axios.get(process.env.API_URL + "/novels/" + ctx.params.novelSlug);

  novel.genres = [
    ...novel.genres,
    ...(() => {
      let elments = [];
      for (let i = 1; i < 40; i++)
        elments.push({
          name: "اكشن " + i,
          slug: "اكشن-" + i,
        });
      return elments;
    })(),
  ];

  // novel.story = `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores quas corporis veritatis libero magni voluptatibus nisi ipsum soluta cupiditate veniam inventore, laboriosam quod harum non beatae molestias maiores nemo dolorum!
  // Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores quas corporis veritatis libero magni voluptatibus nisi ipsum soluta cupiditate veniam inventore, laboriosam quod harum non beatae molestias maiores nemo dolorum!
  // Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores quas corporis veritatis libero magni voluptatibus nisi ipsum soluta cupiditate veniam inventore, laboriosam quod harum non beatae molestias maiores nemo dolorum!
  // Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores quas corporis veritatis libero magni voluptatibus nisi ipsum soluta cupiditate veniam inventore, laboriosam quod harum non beatae molestias maiores nemo dolorum!....`;

  return {
    props: {
      novel,
    },
  };
};
