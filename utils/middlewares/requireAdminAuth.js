import { requireBasicAuth } from "./";

const requireAdminAuth = ({ req }, cb) => {
  try {
    requireBasicAuth({ req }, ({ auth, user }) => {
      if (user.role === "admin") {
        return cb({ auth, user });
      }
      // Not Authorized
      return {
        redirect: {
          permanent: false,
          destination: "/",
        },
        props: {},
      };
    });
  } catch (error) {
    console.log(error);
  }
};

export default requireAdminAuth;
