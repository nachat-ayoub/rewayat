import { requireAuthorAuth } from "../../utils";

const AuthorPanel = ({ user }) => {
  return (
    <div>
      <h1 className="text-lg">AuthorPanel</h1>
      <pre dir="ltr">{JSON.stringify(user, null, 4)}</pre>
    </div>
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
