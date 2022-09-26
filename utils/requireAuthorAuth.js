import requireBasicAuth from "./requireAuth";

const allowedRoles = ["admin", "author"];

const requireAuthorAuth = ({ req }, cb) => {
  try {
    requireBasicAuth({ req }, ({ auth, user }) => {
      if (!allowedRoles.includes(user.role)) {
        // Not Authorized
        return {
          redirect: {
            permanent: false,
            destination: "/",
          },
          props: {},
        };
      }
      return cb({ auth, user });
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

export default requireAuthorAuth;
