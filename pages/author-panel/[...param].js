import React from "react";

const CatchRoutes = () => {
  return <div>CatchRoutes</div>;
};

export default CatchRoutes;

export const getServerSideProps = async ({ params }) => {
  return {
    props: {
      data: null,
    },
  };
};
