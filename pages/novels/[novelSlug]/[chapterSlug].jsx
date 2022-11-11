import Container from "../../../components/Container";
import LinkButton from "../../../components/LinkButton";
import Link from "next/link";
import axios from "axios";

const ChapterPage = ({ data }) => {
  return (
    <Container>
      {data ? (
        <div className="w-full flex flex-col">
          <div
            dir="auto"
            className="w-full flex gap-2 justify-center items-center"
          >
            <Link href={`/`}>
              <a className="hover:text-primary-700 transition-all duration-200">
                <h4 className="text-lg font-semibold text-center">Home</h4>
              </a>
            </Link>
            /
            <Link href={`/novels/${data.chapter.novel.slug}`}>
              <a className="hover:text-primary-700 transition-all duration-200">
                <h4 className="text-lg font-semibold text-center">
                  {data.chapter.novel.title}
                </h4>
              </a>
            </Link>
            /
            <Link href={`/novels/${data.chapter.slug}`}>
              <a className="hover:text-primary-700 transition-all duration-200">
                <h4 className="text-lg font-semibold text-center">
                  {data.chapter.title}
                </h4>
              </a>
            </Link>
          </div>

          <div dir="ltr" className="w-full flex justify-between items-center">
            {/*  */}
            {/*  */}
            <LinkButton
              className={`px-5 py-2.5 ${
                data.prev.disable ? "btn-disabled" : ""
              }`}
              href={
                data.prev.disable
                  ? "#"
                  : `/novels/${data.chapter.novel.slug}/${data.prev.slug}`
              }
            >
              الفصل السابق
            </LinkButton>
            {/*  */}
            {/*  */}
            <LinkButton
              className={`px-5 py-2.5 ${
                data.next.disable ? "btn-disabled" : ""
              }`}
              href={
                data.next.disable
                  ? "#"
                  : `/novels/${data.chapter.novel.slug}/${data.next.slug}`
              }
            >
              الفصل التالي
            </LinkButton>
            {/*  */}
            {/*  */}
          </div>

          <div
            dir="auto"
            className="w-full whitespace-pre-line text-justify text-gray-500 dark:text-gray-300 font-semibold py-8 md:px-6"
          >
            {data.chapter.content}
          </div>
          <div dir="ltr" className="w-full flex justify-between items-center">
            {/*  */}
            <LinkButton
              className={`px-5 py-2.5 ${
                data.prev.disable ? "btn-disabled" : ""
              }`}
              href={
                data.prev.disable
                  ? "#"
                  : `/novels/${data.chapter.novel.slug}/${data.prev.slug}`
              }
            >
              الفصل السابق
            </LinkButton>
            {/*  */}
            {/*  */}
            {/*  */}
            <LinkButton
              className="text-base px-4 py-1.5"
              href={`/novels/${data.chapter.novel.slug}`}
            >
              {data.chapter.novel.title}
              <span className="text-sm ml-1">العودة الى</span>
            </LinkButton>
            {/*  */}
            {/*  */}
            {/*  */}
            <LinkButton
              className={`px-5 py-2.5 ${
                data.next.disable ? "btn-disabled" : ""
              }`}
              href={
                data.next.disable
                  ? "#"
                  : `/novels/${data.chapter.novel.slug}/${data.next.slug}`
              }
            >
              الفصل التالي
            </LinkButton>
            {/*  */}
          </div>
        </div>
      ) : (
        <div className="">No Chapter With This Slug</div>
      )}
    </Container>
  );
};

export default ChapterPage;

export const getServerSideProps = async ({ req, params }) => {
  if (isNaN(params.chapterSlug)) {
    return {
      props: {
        data: null,
      },
    };
  }

  const { data } = await axios.get(
    `${process.env.API_URL}/novels/${params.novelSlug}/${params.chapterSlug}`,
    {
      headers: { token: "" },
    }
  );

  console.log(data);
  const { chapter, chapters, nextChapter: next, prevChapter: prev, ok } = data;

  if (!ok) {
    return {
      props: {
        data: null,
      },
    };
  }

  return {
    props: {
      data: { chapter, chapters, next, prev },
    },
  };
};
