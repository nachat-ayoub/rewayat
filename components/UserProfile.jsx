import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import { useRouter } from "next/router";

import Image from "next/image";
import axios from "axios";

import { Dropdown } from "flowbite-react";

const UserProfile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, isAuth } = useSelector((state) => state.auth.value);

  const handleLogout = async () => {
    if (isAuth) {
      await axios.get("/api/auth/logout");
      dispatch(logout());
      router.push("/");
    }
  };

  return (
    <div className="font-bold mr-2 flex gap-2 justify-center items-center flex-row-reverse">
      <Dropdown inline={true} placement="bottom">
        <Dropdown.Header>{user.username}</Dropdown.Header>
        <Dropdown.Item>الملف الشخصي</Dropdown.Item>
        <Dropdown.Item>New Novel</Dropdown.Item>
        <Dropdown.Item>New Chapter</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={handleLogout}>تسجيل الخروج</Dropdown.Item>
      </Dropdown>

      <div className="">
        <Image
          src={user.image}
          width={"30px"}
          height={"30px"}
          objectFit="cover"
          className="rounded-full"
        />
      </div>
      <div className="hidden md:block">{user.username}</div>
    </div>
  );
};

export default UserProfile;
