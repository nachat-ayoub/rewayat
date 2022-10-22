import { allowedRoles, requireBasicAuth } from "./index";

const requireAuthorAuth = ({ req }, cb) => {
  try {
    return requireBasicAuth({ req }, ({ auth, user }) => {
      if (!allowedRoles.includes(user.role)) {
        // Not Authorized
        return {
          redirect: {
            permanent: false,
            destination: "/",
          },
          props: {},
        };
      } else return cb({ auth, user });
    });
  } catch (error) {
    console.log(error);
  }
};

export default requireAuthorAuth;
