import axios from "axios";
import React from "react";

const Auth = () => {
  return <div>Auth</div>;
};

export default Auth;

export const getServerSideProps = async (ctx) => {
  const { token, username } = ctx.query;
  if (token && username) {
    const { data } = await axios.get(
      `${process.env.API_URL}/auth/${username}`,
      {
        headers: {
          token,
        },
      }
    );

    console.log(data);
    if (data.ok) {
      ctx.req.user = data.user;
      ctx.req.token = token;
      return {
        redirect: {
          permanent: false,
          destination: "/auth/" + data.user.username,
        },
        props: {},
      };
    } else
      return {
        redirect: {
          permanent: false,
          destination: "/auth/login",
        },
        props: {},
      };
  }
  return {
    redirect: {
      permanent: false,
      destination: "/auth/login",
    },
    props: {},
  };
};
