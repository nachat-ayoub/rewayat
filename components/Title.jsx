const Title = ({ title, className }) => {
  return (
    <h2 className={"text-white font-bold mb-2 " + (className ?? "text-lg")}>
      <span className="flex justify-start items-center">
        <span className="bg-gradient-to-l from-primary-900 to-primary-500 py-1.5 px-4 rounded-sm whitespace-nowrap tracking-wide capitalize">
          {title}
        </span>
        <div className="w-0 h-0 border-t-8 border-b-8 border-t-transparent border-b-transparent border-r-[10px] border-r-primary-500" />
      </span>
    </h2>
  );
};

export default Title;
