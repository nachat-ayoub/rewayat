import Link from "next/link";

const LinkButton = ({ href, className, children }) => {
  return (
    <Link href={href ?? "#"}>
      <a
        className={`text-xs max-h-[1.5rem] font-bold text-white bg-primary-500 px-2 py-1 m-1d rounded-sm shadow-sm whitespace-nowrap flex justify-center items-center ${
          className ?? ""
        }`}
      >
        <div>{children}</div>
      </a>
    </Link>
  );
};

export default LinkButton;
