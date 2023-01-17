import NovelCard from "./NovelCard";
import Title from "./Title";

const NovelRow = ({ title, novels, small }) => {
  return (
    <>
      {novels && novels?.length > 0 ? (
        <div className="my-3">
          <Title title={title} className="text-sm" />
          {small ? (
            <div className="px-2 py-5 gap-3 sm:gap-6 flex flex-wrap justify-center">
              {novels.map((novel) => (
                <NovelCard key={novel?.title} small novel={novel} />
              ))}
            </div>
          ) : (
            <div className="px-2 py-5 gap-4 sm:gap-6 md:gap-8 flex flex-wrap justify-center">
              {novels.map((novel) => (
                <NovelCard key={novel?.title} novel={novel} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="w-full">
          <Title title={`”${title}”`} className="text-sm" />
          <div className="w-full flex justify-center items-center py-5 px-4">
            <img
              className="w-full md:w-1/3 object-contain"
              src="/404_Novel.png"
              alt="404 Novel"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default NovelRow;
