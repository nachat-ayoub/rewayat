import LinkButton from "./LinkButton";
import Image from "next/image";
import Link from "next/link";
import { Button } from "flowbite-react";

const NovelCard = ({ chapter, className }) => {
  const novel = chapter.novel;

  return (
    <div className={`w-52 ${className ?? ""}`}>
      <div className="group cursor-pointer relative w-full h-72 bg-Gray rounded-lg shadow-lg overflow-hidden">
        <Link href={"/novels/" + novel.slug}>
          <a>
            <Image
              className="group-hover:scale-110 group-hover:rotate-1 transition-all duration-300"
              width={"208px"}
              height={"288px"}
              objectFit={"cover"}
              src={novel.image}
              alt={novel.title}
            />
          </a>
        </Link>
        <div className="w-full h-full bg-gradient-to-t from-Black flex justify-center items-center flex-col absolute right-0 left-0 bottom-0 top-full group-hover:top-0 transition-all duration-[0.4s] delay-200 gap-4 px-2 py-1">
          {/* Chapter */}
          <LinkButton
            href={`/novels/${novel.slug}/${chapter.slug}`}
            className={`inline-block font-bold text-center bg-primary-400 hover:bg-primary-600 shadow-md hover:text-gray-200 transition-all duration-300 my-1 w-full py-2`}
          >
            الفصل {chapter.slug}
          </LinkButton>
          {/* Line */}
          <div className="border-gray-100 border-t w-0 group-hover:w-48 transition-all duration-300 delay-0 group-hover:delay-500"></div>

          <div className="flex justify-center items-center flex-col">
            <Link href={"/novels/" + novel.slug}>
              <a
                className={`capitalize inline-block text-center font-bold text-white text-shadow hover:text-primary-100 transition-all duration-300`}
              >
                {novel.title}
              </a>
            </Link>
          </div>
        </div>
      </div>

      <div className="px-2 py-1">
        <Link href={"/novels/" + novel.slug}>
          <a>
            <h4
              dir="auto"
              className="capitalize text-center overflow-hidden text-ellipsis w-full whitespace-nowrap font-bold hover:text-primary-700 dark:hover:text-primary-100 transition-all duration-300"
            >
              {novel.title}
            </h4>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default NovelCard;
