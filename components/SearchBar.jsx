import { useRouter } from "next/router";
import { useState } from "react";

const SearchBar = () => {
  const [searchedWord, setSearchedWord] = useState("");
  const router = useRouter();

  function handleSerach(e) {
    e.preventDefault();
    if (searchedWord.trim() === "") return;

    router.push("/search?q=" + searchedWord.trim());
  }

  return (
    <form
      className="bg-primary-200 w-full flex justify-center items-center shadow-sm rounded"
      onSubmit={handleSerach}
    >
      <button
        className={
          "h-[46px] w-12 bg-transparent rounded rounded-l-none hover:bg-primary-800 focus:bg-primary-800 outline-primary-300 focus:outline-4 focus:outline z-10 transition-all duration-150"
        }
      >
        <i className="fa-solid fa-search" />
      </button>
      <input
        className="rounded-l border-none py-2 px-4 w-full text-secondary-800 focus:outline-primary-300 focus:outline-4 focus:ring-0 focus:outline-offset-0 focus:outline focus:z-10 transition-all duration-150"
        placeholder="البحث"
        type="text"
        value={searchedWord}
        onChange={(e) => setSearchedWord(e.target.value)}
      />
    </form>
  );
};

export default SearchBar;
