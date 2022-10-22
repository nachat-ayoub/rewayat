import { requireAuthorAuth } from "../../utils";

import Container from "../../components/Container";

const AuthorPanel = ({ user }) => {
  return (
    <Container className="h-full flex justify-center items-center flex-col">
      <div dir="ltr" className="text-center">
        <h1 className="text-2xl font-semibold">
          We are sorry {user?.username}!
        </h1>
        <p className="text-lg">The panel dashboard currently under updates.</p>
      </div>
    </Container>
  );
};

export default AuthorPanel;

export const getServerSideProps = async ({ req }) => {
  return requireAuthorAuth({ req }, ({ user }) => {
    return {
      props: { user },
    };
  });
};
