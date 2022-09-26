import Link from "next/link";

const LinkButton = ({ href, children }) => {
  return (
    <Link href={href}>
      <a className="text-xs font-bold text-white bg-primary-500 px-2 py-1 m-1d rounded-sm shadow-sm">
        {children}
      </a>
    </Link>
  );
};

export default LinkButton;
