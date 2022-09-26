import requireBasicAuth from "./requireAuth";

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
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }
};

export default requireAdminAuth;
