import axios from "axios";
import Link from "next/link";

import NovelRow from "@components/NovelRow";
import Container from "@components/Container";
import Title from "@components/Title";

export default function SearchByGenrePage({ data }) {
  return (
    <Container>
      <NovelRow
        title={`”${data?.genre?.name ?? data?.genre?.slug}”`}
        genre={data?.genre}
        novels={data?.genre?.novels}
      />

      <div className="w-full">
        <Title title={`التصنيفات :`} className="text-sm" />
        <ul className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 py-5 px-4">
          {data?.genres?.map((genre) => (
            <Link key={genre.slug} href={"/novels/genres/" + genre.slug}>
              <a>
                <li className="flex items-center w-12 min-w-fit py-1 px-3 font-semibold text-sm hover:text-primary-500">
                  <span className="ml-2">
                    <i className="fa-solid fa-caret-left"></i>
                  </span>
                  <span className="text-ellipsis overflow-hidden whitespace-nowrap">
                    {genre.name}
                  </span>
                </li>
              </a>
            </Link>
          ))}
        </ul>
      </div>
    </Container>
  );
}

export const getServerSideProps = async (ctx) => {
  const { data } = await axios.get(
    encodeURI(`${process.env.API_URL}/novels/genres/${ctx.params.genre}`)
  );

  console.log(data);

  return {
    props: {
      data,
    },
  };
};
