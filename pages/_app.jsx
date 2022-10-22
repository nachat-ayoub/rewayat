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
    fetchUser();
  }, []);
  // Check user :

  return (router.pathname.startsWith("/author-panel") ||
    router.pathname.startsWith("/admin-panel")) &&
    router.pathname !== "/_error" ? (
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
