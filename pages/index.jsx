import axios from "axios";

import NovelCard from "../components/NovelCard";

const Home = ({ data }) => {
  return (
    <div className="py-8 px-6 w-full">
      <section className="my-4 w-full">
        <div className="bg-Gray shadow rounded-xl w-full h-72"></div>
      </section>
      <section className="my-4">
        <h2 className="text-xl mb-3">آخر التحديثات</h2>
        <div className="grid place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2">
          {data.novels.length > 0 &&
            data.novels.map((novel) => (
              <NovelCard key={novel.slug} novel={novel} />
            ))}
        </div>
      </section>
    </div>
  );
};

export default Home;

export const getStaticProps = async (ctx) => {
  let { data } = await axios.get(`${process.env.API_URL}/novels`);
  console.log(data);
  // data.novels = [
  //   {
  //     title: "Novel 1",
  //     slug: "novel-1",
  //     image: "/test_novel_poster.jpg",
  //     chapters: [{ slug: "001" }, { slug: "002" }, { slug: "003" }],
  //   },
  //   {
  //     title: "Novel 2",
  //     slug: "novel-2",
  //     image: "/test_novel_poster.jpg",
  //     chapters: [{ slug: "001" }, { slug: "002" }, { slug: "003" }],
  //   },
  //   {
  //     title: "Novel 3",
  //     slug: "novel-3",
  //     image: "/test_novel_poster.jpg",
  //     chapters: [{ slug: "001" }, { slug: "002" }, { slug: "003" }],
  //   },
  //   {
  //     title: "Novel 4",
  //     slug: "novel-4",
  //     image: "/test_novel_poster.jpg",
  //     chapters: [{ slug: "001" }, { slug: "002" }, { slug: "003" }],
  //   },
  //   {
  //     title: "Novel 5",
  //     slug: "novel-5",
  //     image: "/test_novel_poster.jpg",
  //     chapters: [{ slug: "001" }, { slug: "002" }, { slug: "003" }],
  //   },
  //   {
  //     title: "Novel 6",
  //     slug: "novel-6",
  //     image: "/test_novel_poster.jpg",
  //     chapters: [{ slug: "001" }, { slug: "002" }, { slug: "003" }],
  //   },
  //   {
  //     title: "Novel 7",
  //     slug: "novel-7",
  //     image: "/test_novel_poster.jpg",
  //     chapters: [{ slug: "001" }, { slug: "002" }, { slug: "003" }],
  //   },
  //   {
  //     title: "Novel 8",
  //     slug: "novel-8",
  //     image: "/test_novel_poster.jpg",
  //     chapters: [{ slug: "001" }, { slug: "002" }, { slug: "003" }],
  //   },
  //   {
  //     title: "Novel 9",
  //     slug: "novel-9",
  //     image: "/test_novel_poster.jpg",
  //     chapters: [{ slug: "001" }, { slug: "002" }, { slug: "003" }],
  //   },
  //   {
  //     title: "Novel 10",
  //     slug: "novel-10",
  //     image: "/test_novel_poster.jpg",
  //     chapters: [{ slug: "001" }, { slug: "002" }, { slug: "003" }],
  //   },
  // ];

  return {
    props: {
      data,
    },
  };
};
