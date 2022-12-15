const Line = ({ className }) => {
  return (
    <div
      className={`h-0 w-full border-b border-b-gray-200 dark:border-b-gray-500 ${
        className ?? ""
      }`}
    ></div>
  );
};

export default Line;
