import ClientOnly from "./ClientOnly";

const DropDown = ({ label, items, dividedItem }) => {
  return (
    <div>
      <button
        id="dropdownDividerButton"
        data-dropdown-toggle="dropdownDivider"
        // className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        {label ?? ""}
        <span className="ml-2 w-4 h-4 text-slate-300 cursor-pointer">
          <i className="fa fa-chevron-down" />
        </span>
      </button>

      {/* Dropdown menu */}
      <ClientOnly>
        <div
          id="dropdownDivider"
          className="hidden z-10 w-44 bg-white rounded border border-gray-100 divide-y divide-gray-200 shadow dark:bg-gray-700 dark:divide-gray-600 absolute inset-0 right-auto bottom-auto m-0 translate-x-0 translate-y-[562px]"
          data-popper-reference-hidden=""
          data-popper-escaped=""
          data-popper-placement="bottom"
        >
          <ul
            className="py-1 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDividerButton"
          >
            {items?.length > 0 &&
              items.map((item, index) => (
                <li key={index}>
                  <div className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    {item}
                  </div>
                </li>
              ))}
          </ul>
          {dividedItem && (
            <div className="py-1">
              <div className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                {dividedItem}
              </div>
            </div>
          )}
        </div>
      </ClientOnly>
    </div>
  );
};

export default DropDown;
