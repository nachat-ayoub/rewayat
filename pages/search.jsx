import Container from "@components/Container";

const Search = ({ searchedWord }) => {
  return (
    <div className="w-full h-full flex flex-col items-center mr-32">
      <Container>
        <h1 dir="auto" className="text-center">
          You searched for : "{searchedWord}"
        </h1>
      </Container>
    </div>
  );
};

export default Search;

export const getServerSideProps = async ({ query }) => {
  return {
    props: {
      searchedWord: query?.q ?? "",
    },
  };
};
