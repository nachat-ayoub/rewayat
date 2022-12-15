import { requireAuthorAuth } from "@utils/middlewares";
import Container from "@components/Container";
import useToggler from "@hooks/useToggler";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";

const UserChaptersPage = (props) => {
  const [chapters, setChapters] = useState(props.chapters ?? []);
  const [isAsc, toggleIsAsc] = useToggler(false);

  // Sort Chapters By Date (Asc | Desc) :
  const sortChaptersByDate = () => {
    toggleIsAsc();
    setChapters(
      [...chapters].sort((a, b) => {
        if (isAsc) {
          return new Date(a.createdAt) - new Date(b.createdAt);
        } else {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
      })
    );
  };
  // Sort Chapters By Novel Name :
  const sortByNovels = (e) => {
    if (e.target.value === "all") {
      return setChapters(props.chapters);
    }
    setChapters(
      props.chapters.filter((ch) => ch.novel.slug === e.target.value)
    );
  };

  const novelsOptions = () => {
    let novels = [];
    props.chapters.map(({ novel }) => {
      if (!novels.some((n) => n.slug === novel.slug)) {
        novels.push(novel);
      }
    });
    return novels;
  };

  return (
    <Container className="px-2">
      <div className="w-full">
        {chapters.length > 0 ? (
          <div className="w-full">
            <div dir="auto" className="w-full mb-6">
              <h4 className="text-xl text-left">Filter :</h4>
              <div className="w-full mb-6 text-Black">
                <select onChange={sortByNovels} className="input mt-2">
                  <option value="all">All</option>
                  {novelsOptions().map((novel) => (
                    <option key={novel.slug} value={novel.slug}>
                      {novel.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="overflow-x-auto relative shadow-md rounded sm:rounded-lg">
              <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-150 dark:bg-gray-700 dark:text-gray-300">
                  <tr>
                    <th
                      onClick={() => setChapters([...chapters].reverse())}
                      scope="col"
                      className="py-3 px-6 cursor-pointer"
                    >
                      <div className="w-full flex items-center justify-center">
                        <span>الفصل</span>
                        <span className="inline-block p-2 rotate-90 cursor-pointer">
                          <i className="fa-solid fa-right-left" />
                        </span>
                      </div>
                    </th>
                    <th scope="col" className="hidden md:table-cell py-3 px-6">
                      عنوان الفصل
                    </th>
                    <th scope="col" className="py-3 px-6 cursor-pointer">
                      عنوان الرواية
                      <span className="inline-block p-2 rotate-90 cursor-pointer">
                        <i className="fa-solid fa-right-left" />
                      </span>
                    </th>
                    <th
                      onClick={sortChaptersByDate}
                      scope="col"
                      className="py-3 px-6 cursor-pointer"
                    >
                      تاريخ النشر
                      <span className="inline-block p-2 rotate-90 cursor-pointer">
                        <i className="fa-solid fa-right-left" />
                      </span>
                    </th>
                    <th scope="col" className="py-3 px-6 cursor-pointer">
                      #
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Row */}
                  {chapters.map((chapter, i) => (
                    <tr
                      key={`${i}__${chapter.novel.slug}-chapter-${chapter.slug}`}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <th
                        scope="row"
                        className="font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <Link
                          href={`/novels/${chapter.novel.slug}/${chapter.slug}`}
                        >
                          <a className="inline-block w-full h-full py-4 px-6">
                            الفصل {chapter.slug}
                          </a>
                        </Link>
                      </th>

                      <td className="hidden md:table-cell ">
                        <Link
                          href={`/novels/${chapter.novel.slug}/${chapter.slug}`}
                        >
                          <a className="inline-block w-full h-full py-4 px-6">
                            {chapter.title}
                          </a>
                        </Link>
                      </td>
                      <td className="">
                        <Link href={`/novels/${chapter.novel.slug}/`}>
                          <a
                            dir="auto"
                            className="inline-block w-full h-full py-4 px-6"
                          >
                            {chapter.novel.title}
                          </a>
                        </Link>
                      </td>
                      <td className="">
                        <Link
                          href={`/novels/${chapter.novel.slug}/${chapter.slug}`}
                        >
                          <a className="flex justify-center gap-4 w-full h-full py-4 px-6">
                            <span className="">
                              {chapter.createdAt
                                .split("T")[1]
                                .split(":")
                                .slice(0, 2)
                                .join(":")}
                            </span>
                            <span className="">
                              {chapter.createdAt.split("T")[0]}
                            </span>
                          </a>
                        </Link>
                      </td>

                      <td className="">
                        <Link
                          href={`/panel/novels/${chapter.novel.slug}/${chapter.slug}/edit`}
                        >
                          <a className="flex justify-center items-center w-full h-full py-4 px-6 hover:text-primary-300">
                            تعديل
                            <span className="inline-block p-2 cursor-pointer">
                              <i className="fa-solid fa-edit" />
                            </span>
                          </a>
                        </Link>
                      </td>
                    </tr>
                  ))}
                  {/*  */}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <h2 className="text-2xl text-gray-300 font-semibold">
              لا يوجد فصول حاليا
            </h2>
          </div>
        )}
      </div>
    </Container>
  );
};

export default UserChaptersPage;

//
export const getServerSideProps = async ({ req }) => {
  return requireAuthorAuth({ req }, async ({ user }) => {
    const { data } = await axios.get(
      `${process.env.API_URL}/auth/${user.username}/chapters`,
      {
        headers: {
          token: user.token,
        },
      }
    );

    if (data.ok) {
      return {
        props: { chapters: data.chapters ?? [] },
      };
    }
  });
};
