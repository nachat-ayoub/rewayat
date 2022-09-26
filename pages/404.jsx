import Container from "../components/Container";
const PageNotFound = () => {
  return (
    <Container>
      <div dir="ltr" className="flex justify-center items-center">
        <span className="text-4xl font-bold">404</span>
        <span className="text-4xl font-bold mx-3 w-1 h-20 bg-gray-800"></span>
        <span className="text-xl font-bold">Page Not Found.</span>
      </div>
    </Container>
  );
};

export default PageNotFound;
