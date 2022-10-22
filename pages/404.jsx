import Container from "../components/Container";
const PageNotFound = () => {
  return (
    <div dir="ltr" className="flex-1 flex justify-center items-center">
      <Container>
        <div className="flex justify-center items-center">
          <span className="text-4xl font-bold">404</span>
          <span className="ml-5 mr-5 border-r-2 border-secondary-800 h-20 bg-secondary-800"></span>
          <span className="text-lg font-bold text-secondary-800">
            Page Not Found.
          </span>
        </div>
      </Container>
    </div>
  );
};

export default PageNotFound;
