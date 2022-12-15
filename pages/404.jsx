import Container from "@components/Container";
const PageNotFound = () => {
  return (
    <div dir="ltr" className="flex-1 flex justify-center items-center">
      <Container>
        <div className="flex justify-center items-center">
          <span className="text-4xl font-bold">404</span>
          <span className="ml-5 mr-5 border-r-2 border-gray-800 dark:border-gray-500 h-20"></span>
          <span className="text-lg font-bold text-gray-900 dark:text-gray-200">
            Page Not Found.
          </span>
        </div>
      </Container>
    </div>
  );
};

export default PageNotFound;
