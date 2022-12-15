import axios from "axios";

import ChapterCard from "@components/ChapterCard";

const Home = ({ data }) => {
  return (
    <div className="py-8 px-6 w-full">
      <section className="my-4 w-full">
        <div className="bg-Gray shadow rounded-xl w-full h-72"></div>
      </section>
      <section className="my-4">
        <h2 className="text-3xl font-bold text-Black my-6">آخر التحديثات :</h2>
        <div className="grid place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2">
          {data.chapters.length > 0 &&
            data.chapters.map((chapter) => (
              <ChapterCard key={chapter.slug} chapter={chapter} />
            ))}
        </div>
      </section>
    </div>
  );
};

export default Home;

export const getStaticProps = async (ctx) => {
  let { data } = await axios.get(`${process.env.API_URL}/chapters`);

  return {
    props: {
      data,
    },
  };
};
