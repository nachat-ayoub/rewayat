import Container from "@components/Container";
import DropDown from "@components/DropDown";

const Search = () => {
  return (
    <div className="w-full h-full flex flex-col items-center mr-32">
      <Container>
        <DropDown
          items={[<div>AYOUB</div>]}
          dividedItem={
            <div className="cursor-pointer" onClick={() => {}}>
              Logout
            </div>
          }
        />
      </Container>
    </div>
  );
};

export default Search;
