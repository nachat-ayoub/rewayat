import authHelpers from "../services/auth";

const requireLogout = ({ req }, cb) => {
  try {
    const { auth, user } = authHelpers.isAuth({ req }, process.env.JWT_SECRET);

    if (!auth) {
      return cb({ auth, user });
    }
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
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

export default requireLogout;
