import LinkButton from "@components/LinkButton";
import Container from "@components/Container";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";

const ChapterPage = ({ data }) => {
  return (
    <Container>
      {data ? (
        <div className="w-full flex flex-col">
          <div
            dir="auto"
            className="w-full flex gap-2 justify-center items-center mb-6 text-sm text-gray-600 dark:text-gray-300"
          >
            <Link href={`/`}>
              <a className="hover:text-primary-600 transition-all duration-200">
                <h4 className="">Home</h4>
              </a>
            </Link>
            /
            <Link href={`/novels/${data.chapter.novel.slug}`}>
              <a className="hover:text-primary-600 transition-all duration-200">
                <h4 className="">{data.chapter.novel.title}</h4>
              </a>
            </Link>
            /
            <Link href={`/novels/${data.chapter.slug}`}>
              <a className="hover:text-primary-600 transition-all duration-200">
                <h4 className="">{data.chapter.title}</h4>
              </a>
            </Link>
          </div>

          <ChapterNavigation
            chapter={data.chapter}
            chapters={data.chapters}
            prev={data.prev}
            next={data.next}
          />

          {/* Chapter Content */}
          <div
            dir="auto"
            className="w-full whitespace-pre-line text-justify text-gray-500 dark:text-gray-300 font-semibold py-10 md:p-12 md:px-6"
          >
            {data.chapter.content}
          </div>
          {/* Chapter Content */}

          <ChapterNavigation
            chapter={data.chapter}
            chapters={data.chapters}
            prev={data.prev}
            next={data.next}
          />

          <div
            dir="ltr"
            className="w-full flex justify-center items-center mt-8"
          >
            <LinkButton
              className="text-base px-6 py-1.5"
              href={`/novels/${data.chapter.novel.slug}`}
            >
              {data.chapter.novel.title}
              <span className="text-sm ml-1">العودة الى</span>
            </LinkButton>
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

  if (data?.ok) {
    const { chapter, chapters, nextChapter: next, prevChapter: prev } = data;
    return {
      props: {
        data: { chapter, chapters, next, prev },
      },
    };
  }

  return {
    props: {
      data: null,
    },
  };
};

const ChapterNavigation = ({ chapter, chapters, prev, next }) => {
  const router = useRouter();
  const [selectedChapter, setSelectedChapter] = useState(chapter.slug);

  useEffect(() => {
    setSelectedChapter(chapter.slug);
  }, [router.query.chapterSlug]);

  return (
    <div dir="ltr" className="w-full flex justify-between items-center">
      <LinkButton
        className={`px-5 py-2.5 ${prev.disable ? "btn-disabled" : ""}`}
        href={prev.disable ? "#" : `/novels/${chapter.novel.slug}/${prev.slug}`}
      >
        <span className="mr-1 text-lg leading-5">
          <i className="fa-solid fa-caret-left" />
        </span>
        الفصل السابق
      </LinkButton>
      {/*  */}
      <select
        dir="auto"
        className="input mx-20 px-10 cursor-pointer"
        onChange={(e) => {
          const chapterSlug = e.target.value;
          setSelectedChapter(chapterSlug);

          if (!chapterSlug || chapterSlug === chapter.slug) return;
          router.push(`/novels/${chapter.novel.slug}/${chapterSlug}`);
        }}
        value={selectedChapter}
      >
        <option value="">اختر الفصل</option>
        {chapters.map((ch) => (
          <option
            key={ch.slug}
            value={ch.slug}
          >{`الفصل رقم ${ch.slug} - "${ch.title}"`}</option>
        ))}
      </select>
      {/*  */}
      <LinkButton
        className={`px-5 py-2.5 ${next.disable ? "btn-disabled" : ""}`}
        href={next.disable ? "#" : `/novels/${chapter.novel.slug}/${next.slug}`}
      >
        الفصل التالي
        <span className="ml-1 text-lg leading-5">
          <i className="fa-solid fa-caret-right" />
        </span>
      </LinkButton>
    </div>
  );
};
