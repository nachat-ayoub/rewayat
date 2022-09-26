import Image from "next/image";
import Link from "next/link";

const NovelCard = ({ novel }) => {
  return (
    <div className="w-52 m-1">
      <div className="w-full h-72 bg-Gray rounded-lg shadow-lg overflow-hidden">
        <Link href={"/novels/" + novel.slug}>
          <a>
            <Image
              width={"208px"}
              height={"288px"}
              objectFit={"cover"}
              src={novel.image}
              alt={novel.title}
            />
          </a>
        </Link>
      </div>
      <div className="px-2 py-1">
        <Link href={"/novels/" + novel.slug}>
          <a>
            <h4 dir="auto" className="capitalize font-bold">
              {novel.title}
            </h4>
          </a>
        </Link>
        {novel.chapters.length > 0 && (
          <div className="flex flex-col">
            {novel.chapters.length >= 3
              ? novel.chapters.slice(-3).map((chapter) => (
                  <Link
                    key={chapter.slug}
                    href={`/novels/${novel.slug}/${chapter.slug}`}
                  >
                    <a className=""> {chapter.slug} </a>
                  </Link>
                ))
              : novel.chapters.map((chapter) => (
                  <Link
                    key={chapter.slug}
                    href={`/novels/${novel.slug}/${chapter.slug}`}
                  >
                    <a className=""> {chapter.slug} </a>
                  </Link>
                ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NovelCard;
