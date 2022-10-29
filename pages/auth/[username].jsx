import { requireBasicAuth } from "../../utils/middlewares";
import useToggler from "../../hooks/useToggler";
import { getImageMainColor } from "../../utils";
import Image from "next/image";

import Container from "../../components/Container";
import CustomModal from "../../components/CustomModal";
import EditUserForm from "../../components/EditUserForm";
import { useSelector } from "react-redux";

const UserPage = ({ /* userData, */ profileColor }) => {
  const [isEditModelHidden, showEditModal] = useToggler();
  const user = useSelector((state) => state.auth.value.user);

  return (
    <Container>
      <CustomModal show={!isEditModelHidden} onClose={showEditModal}>
        <EditUserForm
          isModalHidden={isEditModelHidden}
          toggleModal={showEditModal}
          user={user}
        />
      </CustomModal>

      <div
        className={`relative bg-primary-300 ${
          profileColor.isDark ? "text-white" : "text-secondary-900"
        } p-8 w-full min-h-[20rem] rounded flex flex-col justify-center items-center`}
        style={profileColor && { backgroundColor: profileColor.hex }}
      >
        <div
          onClick={showEditModal}
          className="absolute text-lg px-1 top-2 right-2 cursor-pointer"
        >
          <i className="fa-solid fa-pen-to-square" />
        </div>

        <Image
          className="rounded-full shadow"
          src={user?.image}
          width={100}
          height={100}
          objectFit={"cover"}
          alt={`${user?.username ?? "User"} profile picture`}
          unoptimized
        />
        <h2
          dir="auto"
          className="text-2xl flex gap-1 items-center justify-center capitalize my-2"
        >
          <span className="">
            <i className="fa-solid fa-at" />
          </span>
          <span className="font-bold">{user?.username}</span>
        </h2>
        <p dir="auto" className="text-lg text-justify font-semibold">
          <span className="">{"❝ "}</span>
          <span className={`${profileColor.isDark && "text-gray-100"}`}>
            {user?.bio}
          </span>
          <span className="">{" ❞"}</span>
        </p>
      </div>
    </Container>
  );
};

export default UserPage;

export const getServerSideProps = async ({ req, params }) => {
  return requireBasicAuth({ req }, async ({ user }) => {
    if (params?.username !== user?.username) {
      return {
        redirect: {
          permanent: false,
          destination: "/auth/" + user?.username,
        },
        props: {},
      };
    }

    const imagePath =
      user.image === "/avatar.jpg"
        ? "http://" + req.headers.host + user.image
        : user.image;

    const profileColor = undefined; // await getImageMainColor(imagePath);
    return {
      props: {
        userData: user,
        profileColor: profileColor ?? {
          value: [225, 225, 225, 255],
          rgb: "rgb(225,225,225)",
          rgba: "rgba(225,225,225,1)",
          hex: "#e1e1e1",
          hexa: "#e1e1e1ff",
          isDark: false,
          isLight: true,
        },
      },
    };
  });
};
