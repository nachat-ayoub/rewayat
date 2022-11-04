import { useEffect } from "react";
import { authenticate } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { wrapper } from "../store";
import axios from "axios";

import Layout from "../components/Layout";
import PanelLayout from "../components/PanelLayout";

import "../styles/globals.css";

function MyApp({ Component, pageProps, router }) {
  // Check user :
  const dispatch = useDispatch();
  const fetchUser = async () => {
    const {
      data: { user, ok: isAuth, token },
    } = await axios.get("/api/auth");

    dispatch(authenticate({ isAuth, token, user }));
    // console.log("fetching user!!!");
  };

  useEffect(() => {
    // Check user :
    fetchUser();
  }, []);

  const isPanelLayout = (paths) => {
    let pathExist = false;
    paths.map((path) => {
      if (!pathExist) {
        pathExist = router.pathname.startsWith(path);
      }
    });
    return pathExist && router.pathname !== "/_error";
  };

  return isPanelLayout(["/panel"]) ? (
    <PanelLayout>
      <Component {...pageProps} />
    </PanelLayout>
  ) : (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default wrapper.withRedux(MyApp);
