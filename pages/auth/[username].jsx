import { getImageMainColor, requireBasicAuth } from "../../utils/index";
import useToggler from "../../hooks/useToggler";
import Image from "next/image";

import Container from "../../components/Container";
import CustomModal from "../../components/CustomModal";
import EditUserForm from "../../components/EditUserForm";
import { useSelector } from "react-redux";

const UserPage = ({ userData, profileColor }) => {
  const [isEditModelHidden, showEditModal] = useToggler();
  const user = useSelector((state) => state.auth.value.user);

  return (
    <Container>
      <CustomModal show={!isEditModelHidden} onClose={showEditModal}>
        <EditUserForm
          isModalHidden={isEditModelHidden}
          toggleModal={showEditModal}
          user={userData}
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
          src={user?.image ?? "/avatar.jpg"}
          width={"100px"}
          height={"100px"}
          objectFit={"cover"}
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
            {user?.bio + " "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
            itaque incidunt, nulla odio pariatur quas eaque nesciunt error
            corrupti tempora eum quae voluptas ducimus? Veritatis cumque
            voluptate totam possimus? Reiciendis. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Nobis itaque incidunt, nulla odio
            pariatur quas eaque nesciunt error corrupti tempora eum quae
            voluptas ducimus? Veritatis cumque voluptate totam possimus?
            Reiciendis. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Nobis itaque incidunt, nulla odio pariatur quas eaque nesciunt error
            corrupti tempora eum quae voluptas ducimus? Veritatis cumque
            voluptate totam possimus? Reiciendis.
          </span>
          <span className="">{" ❞"}</span>
        </p>
      </div>
    </Container>
  );
};

export default UserPage;

export const getServerSideProps = async ({ req }) => {
  return requireBasicAuth({ req }, async ({ user }) => {
    // user.image =
    //   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNrixGb5yc8HjoQTNj_E2E61zqr61EWHXbDJR3yNqxm7zUYPk7nmGJi8cVjmFMiYRMTz0&usqp=CAU";
    const imagePath =
      user.image === "/avatar.jpg"
        ? "http://" + req.headers.host + user.image
        : user.image;

    const profileColor = await getImageMainColor(imagePath);
    return {
      props: {
        userData: user,
        profileColor,
      },
    };
  });
};
