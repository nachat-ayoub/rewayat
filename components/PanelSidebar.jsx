import DarkAndLightModeButton from "./DarkAndLightModeButton";
import useDropdownMenu from "../hooks/useDropdownMenu";
import { useSelector } from "react-redux";
import BigLogoSvg from "./BigLogoSvg";
import Image from "next/image";
import Link from "next/link";

const PanelSidebar = ({ children }) => {
  const { user } = useSelector((state) => state.auth.value);
  const [isSideNavOpen, toggleSideNav] = useDropdownMenu();

  const [isNovelDropdownOpen, toggleNovelDropdown] = useDropdownMenu();
  const [isChapterDropdownOpen, toggleChapterDropdown] = useDropdownMenu();

  return (
    // DarkAndLightModeButton
    <div className="flex flex-1 w-full h-full">
      {/* Sidebar */}
      <div
        onMouseLeave={() => {
          if (isSideNavOpen === null || !isSideNavOpen) {
            toggleChapterDropdown({ init: true });
            toggleNovelDropdown({ init: true });
          }
        }}
        className={`z-30 shadow-sm md:w-60 md:static md:h-auto overflow-hidden bg-primary-700 text-gray-200 ${
          isSideNavOpen !== null && isSideNavOpen
            ? "fixed h-screen w-60"
            : "group w-0 md:w-16 md:animate-closeFromLeft md:hover:animate-openFromRight"
        }`}
      >
        <h2 className="w-full border-b-2 border-primary-600 text-xl font-semibold tracking-wide capitalize text-center py-3 px-2">
          {isSideNavOpen !== null && isSideNavOpen ? (
            "Author Panel"
          ) : (
            <div className="w-full cursor-pointer">
              <span className="md:hidden md:group-hover:block whitespace-nowrap">
                Author Panel
              </span>
              <span className="md:block md:group-hover:hidden">
                <i className="fa-solid fa-screwdriver-wrench"></i>
              </span>
            </div>
          )}
        </h2>
        <ul
          className={`text-sm font-bold ${
            isSideNavOpen !== null &&
            !isSideNavOpen &&
            "md:flex md:flex-col md:items-center"
          }`}
        >
          {/* <Links List> */}
          <li className="w-full hover:bg-primary-600 hover:text-white transition-all duration-150 ease-in">
            <Link href={`/auth/${user?.username}`}>
              <a className="p-4 flex items-center gap-5 h-[52px]">
                <Image
                  className="rounded-full"
                  src={user?.image ?? "/avatar.jpg"}
                  width={"32px"}
                  height={"32px"}
                  objectFit={"cover"}
                  unoptimized
                />
                <h3
                  className={`capitalize text-base ${
                    isSideNavOpen !== null && isSideNavOpen
                      ? "md:block"
                      : "md:hidden"
                  } md:group-hover:flex`}
                >
                  {user?.username}
                </h3>
              </a>
            </Link>
          </li>
          {/*  */}
          <li className="hover:bg-primary-600 hover:text-white transition-all duration-150 ease-in w-full">
            <Link href="/">
              <a
                className={`p-4 flex gap-4 ${
                  !isSideNavOpen && "md:flex md:justify-center"
                } md:group-hover:justify-start`}
              >
                <span>
                  <i className="fa-solid fa-home"></i>
                </span>
                <span
                  className={`whitespace-nowrap ${
                    isSideNavOpen !== null && isSideNavOpen
                      ? "md:block"
                      : "md:hidden"
                  } md:group-hover:block`}
                >
                  الواجهة الرئيسية
                </span>
              </a>
            </Link>
          </li>
          {/*  */}
          <li className="hover:bg-primary-600 hover:text-white transition-all duration-150 ease-in md:w-full">
            <Link href="/">
              <a
                className={`p-4 flex gap-4 ${
                  !isSideNavOpen && "md:justify-center"
                } md:group-hover:justify-start`}
              >
                <span>
                  <i className="fa-solid fa-gear"></i>
                </span>
                <span
                  className={`whitespace-nowrap ${
                    isSideNavOpen !== null && isSideNavOpen
                      ? "md:block"
                      : "md:hidden"
                  } md:group-hover:block`}
                >
                  لوحة التحكم
                </span>
              </a>
            </Link>
          </li>
          {/* Dropdown menu */}
          <li className="md:w-full">
            <div
              onClick={() => {
                if (isChapterDropdownOpen === true) {
                  toggleChapterDropdown();
                }
                toggleNovelDropdown();
              }}
              className={`cursor-pointer p-4 flex items-center justify-between hover:bg-primary-600 hover:text-white transition-all duration-150 ease-in ${
                isNovelDropdownOpen && "bg-primary-600 text-white"
              } ${
                !isSideNavOpen && "md:flex md:justify-center"
              } md:group-hover:justify-between`}
            >
              <div className="flex gap-4">
                <span>
                  <i className="fa-solid fa-feather"></i>
                </span>
                <span
                  className={`whitespace-nowrap ${
                    isSideNavOpen !== null && isSideNavOpen
                      ? "md:block"
                      : "md:hidden"
                  } md:group-hover:block`}
                >
                  الروايات
                </span>
              </div>
              <div
                className={`cursor-pointer px-2 ${
                  isNovelDropdownOpen ? "-rotate-90" : "rotate-0"
                } duration-150 ease-linear ${
                  isSideNavOpen !== null && isSideNavOpen
                    ? "md:block"
                    : "md:hidden"
                } md:group-hover:block`}
              >
                <i className="fa-solid fa-caret-left" />
              </div>
            </div>
            {/* Dropdown list */}

            {(isSideNavOpen === null || isSideNavOpen) && (
              <ul
                className={`bg-primary-800 overflow-hidden ${
                  isNovelDropdownOpen === null
                    ? "h-0"
                    : isNovelDropdownOpen
                    ? "animate-openFromTop"
                    : "animate-closeFromBottom"
                }`}
              >
                <li className="cursor-pointer hover:bg-primary-900 hover:text-white transition-all duration-150 ease-in">
                  <Link href={`/panel/novels/new`}>
                    <a className="p-4 w-full h-full flex items-center gap-4">
                      <span className="w-3">
                        <i className="fa-solid fa-square-plus"></i>
                      </span>
                      <span>اضافة رواية جديدة</span>
                    </a>
                  </Link>
                </li>
                <li className="cursor-pointer hover:bg-primary-900 hover:text-white transition-all duration-150 ease-in">
                  <Link href={`/panel/novels`}>
                    <a className="p-4 w-full h-full flex items-center gap-4">
                      <span className="w-3">
                        <i className="fa-solid fa-eye"></i>
                      </span>
                      <span>روايات أضفتها</span>
                    </a>
                  </Link>
                </li>
              </ul>
            )}

            {/*  */}
          </li>
          {/*  */}

          {/* Dropdown menu */}
          <li className="md:w-full">
            <div
              onClick={() => {
                if (isNovelDropdownOpen === true) {
                  toggleNovelDropdown();
                }
                toggleChapterDropdown();
              }}
              className={`cursor-pointer p-4 flex items-center justify-between hover:bg-primary-600 hover:text-white transition-all duration-150 ease-in ${
                isChapterDropdownOpen && "bg-primary-600 text-white"
              } ${
                !isSideNavOpen && "md:justify-center"
              } md:group-hover:justify-between`}
            >
              <div className="flex gap-4">
                <span>
                  <i className="fa-solid fa-feather"></i>
                </span>
                <span
                  className={`whitespace-nowrap ${
                    isSideNavOpen !== null && isSideNavOpen
                      ? "md:block"
                      : "md:hidden"
                  } md:group-hover:block`}
                >
                  الفصول
                </span>
              </div>
              <div
                className={`cursor-pointer px-2 ${
                  isChapterDropdownOpen ? "-rotate-90" : "rotate-0"
                } duration-150 ease-linear ${
                  isSideNavOpen !== null && isSideNavOpen
                    ? "md:block"
                    : "md:hidden"
                } md:group-hover:block`}
              >
                <i className="fa-solid fa-caret-left" />
              </div>
            </div>
            {/* Dropdown list */}
            {(isSideNavOpen === null || isSideNavOpen) && (
              <ul
                className={`bg-primary-800 overflow-hidden ${
                  isChapterDropdownOpen === null
                    ? "h-0"
                    : isChapterDropdownOpen
                    ? "animate-openFromTop"
                    : "animate-closeFromBottom"
                }`}
              >
                <li className="cursor-pointer hover:bg-primary-900 hover:text-white transition-all duration-150 ease-in">
                  <Link href={`/panel/chapters/new`}>
                    <a className="p-4 w-full h-full flex items-center gap-4">
                      <span className="w-3">
                        <i className="fa-solid fa-square-plus"></i>
                      </span>
                      <span>أضف فصل جديد</span>
                    </a>
                  </Link>
                </li>
                <li className="cursor-pointer hover:bg-primary-900 hover:text-white transition-all duration-150 ease-in">
                  <Link href={`/panel/chapters`}>
                    <a className="p-4 w-full h-full flex items-center gap-4">
                      <span className="w-3">
                        <i className="fa-solid fa-eye"></i>
                      </span>
                      <span>الفصول التي أضفتها</span>
                    </a>
                  </Link>
                </li>
              </ul>
            )}
            {/*  */}
          </li>

          {/*  */}

          {/* </ Links List> */}
        </ul>
      </div>

      {/* Black Shadow */}
      {isSideNavOpen !== null && isSideNavOpen && (
        <div
          onClick={toggleSideNav}
          className="z-30 backdrop-blur-[0.6px] md:hidden fixed h-screen w-[calc(100vw-15rem)] cursor-pointer left-0 bg-primary-900 bg-opacity-40"
        ></div>
      )}
      {/* Black Shadow */}

      {/* Navbar & Content */}
      <div className="w-full flex flex-col flex-1">
        {/* Navbar */}
        <div className="relative flex items-center justify-between w-full py-3 text-primary-600 text-xl px-4 shadow-sm">
          <div className="flex items-center justify-center gap-4">
            <span
              onClick={() => {
                if (isSideNavOpen) {
                  toggleSideNav({ init: true });
                  toggleChapterDropdown({ init: true });
                  toggleNovelDropdown({ init: true });
                } else {
                  toggleSideNav();
                }
              }}
              className="cursor-pointer text-2xl"
            >
              <i className="fa-solid fa-bars"></i>
            </span>

            <DarkAndLightModeButton size={24} />
          </div>

          <div className="">
            <Link href={"/"}>
              <a className="h-full text-primary-200 flex items-center justify-center">
                <BigLogoSvg />
              </a>
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="flex w-full flex-1 bg-gray-100">{children}</div>
      </div>
    </div>
  );
};

export default PanelSidebar;
