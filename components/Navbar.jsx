import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

import useDarkMode from "../hooks/useDarkMode";
import ClientOnly from "./ClientOnly";
import { useRouter } from "next/router";
import UserProfile from "./UserProfile";

const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const auth = useSelector((state) => state.auth.value);

  const handleLogout = async () => {
    if (auth.isAuth) {
      await axios.get("/api/auth/logout");
      dispatch(logout());
      router.push("/");
    }
  };
  return (
    <nav
      dir="rtl"
      className="w-full py-3 px-8 text-center bg-gradient-purple text-white flex justify-between items-center"
    >
      <div className="h-14">
        <Link href={"/"}>
          <a className="h-full flex items-center justify-center">
            <Image
              src={"/logo.png"}
              height={"50%"}
              width={"160px"}
              objectFit="contain"
            />
          </a>
        </Link>
      </div>
      <div className="flex gap-3 items-center">
        <div className="mr-6 flex gap-3 justify-center items-center">
          {auth.isAuth ? (
            <>
              {/* Auth Links (Crud) */}
              {["admin", "author"].includes(auth.user.role) && (
                <div className="flex justify-center items-center">
                  <Link href="/novels/new">
                    <a dir="ltr" className="font-bold">
                      New?
                    </a>
                  </Link>
                </div>
              )}
              <UserProfile />
              {/* <div
                onClick={handleLogout}
                className="hidden md: font-bold cursor-pointer text-sm hover:text-gray-300"
              >
                Logout
              </div> */}
            </>
          ) : (
            <>
              <Link href={"/auth/register"}>
                <a className="font-bold text-sm hover:text-gray-300">
                  Register
                </a>
              </Link>
              <Link href={"/auth/login"}>
                <a className="font-bold text-sm hover:text-gray-300">Login</a>
              </Link>
            </>
          )}
        </div>

        <ModeButton />
      </div>
    </nav>
  );
};

export default Navbar;

const ModeButton = () => {
  let [theme, toggleTheme] = useDarkMode();
  return (
    <ClientOnly>
      <div
        onClick={toggleTheme}
        className="bg-lightPurple text-white hover:bg-opacity-50 shadow transition-colors duration-300 h-8 w-8 rounded-full flex justify-center items-center cursor-pointer"
      >
        {theme === "dark" ? (
          <i className="fa-solid fa-sun" />
        ) : (
          <i className="fa-solid fa-moon" />
        )}
      </div>
    </ClientOnly>
  );
};
