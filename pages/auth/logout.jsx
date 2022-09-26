import { wrapper } from "../../store/index";
// import { logout } from "../../store/authSlice";

// import helpers from "../../services/helpers";

const LogoutPage = () => {
  return <div>LogoutPage</div>;
};
export default LogoutPage;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res }) => {
      // helpers.deleteToken({ req, res });
      // store.dispatch(logout());

      return {
        redirect: {
          permanent: false,
          destination: "/",
        },
        props: {},
      };
    }
);
