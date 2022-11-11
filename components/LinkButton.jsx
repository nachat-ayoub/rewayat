import { twMerge } from "tailwind-merge";
import Link from "next/link";

const LinkButton = ({ href, className, children }) => {
  return (
    <Link href={href ?? "#"}>
      <a
        className={twMerge(
          `h-fit text-xs min-h-[1.5rem] font-bold text-white bg-primary-500 hover:bg-primary-600 transition-all duration-200 px-2 py-1 rounded-sm shadow-sm whitespace-nowrap flex justify-center items-center ${
            className ?? ""
          }`
        )}
      >
        {children}
      </a>
    </Link>
  );
};

export default LinkButton;
