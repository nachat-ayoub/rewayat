import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authenticate } from "../store/authSlice";

import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const {
      data: { user, ok: isAuth, token },
    } = await axios.get("/api/auth");

    // console.log("var's:", { isAuth, token, user });

    dispatch(authenticate({ isAuth, token, user }));
  };

  return (
    <div className="font-cairo w-full min-h-screen flex flex-col">
      <Navbar />
      <main
        dir="rtl"
        className="bg-white dark:bg-Black dark:text-white flex flex-1"
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
