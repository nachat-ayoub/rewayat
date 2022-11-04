import { useSelector } from "react-redux";
import Link from "next/link";

import DarkAndLightModeButton from "./DarkAndLightModeButton";
import UserProfile from "./UserProfile";
import BigLogoSvg from "./BigLogoSvg";

const Navbar = () => {
  const auth = useSelector((state) => state.auth.value);

  return (
    <nav
      dir="rtl"
      className="w-full py-3 px-8 text-center bg-gradient-primary text-white flex justify-between items-center"
    >
      <div className="h-14">
        <Link href={"/"}>
          <a className="h-full text-primary-50 flex items-center justify-center">
            <BigLogoSvg />
          </a>
        </Link>
      </div>
      <div className="flex gap-3 justify-center items-center">
        <div className="mr-6 flex gap-3 justify-center items-center">
          {auth.isAuth ? (
            <UserProfile />
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

        <DarkAndLightModeButton size={30} />
      </div>
    </nav>
  );
};

export default Navbar;
