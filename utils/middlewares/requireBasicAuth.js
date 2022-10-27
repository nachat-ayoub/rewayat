import { isAuth } from "../auth";

const requireBasicAuth = ({ req }, cb) => {
  try {
    const { auth, user } = isAuth({ req }, process.env.JWT_SECRET);

    if (auth) {
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
  }
};

export default requireBasicAuth;
