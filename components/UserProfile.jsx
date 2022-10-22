import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import { useRouter } from "next/router";

import Image from "next/image";
import axios from "axios";

import { Dropdown } from "flowbite-react";
import { allowedRoles } from "../utils";

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
    <div className="z-50 font-bold mr-2 flex gap-2 justify-center items-center flex-row-reverse">
      <Dropdown inline={true} placement="bottom">
        <Dropdown.Header>{user.username}</Dropdown.Header>
        <Dropdown.Item onClick={() => router.push(`/auth/${user?.username}`)}>
          الملف الشخصـي
        </Dropdown.Item>

        {allowedRoles.includes(user.role) && (
          <Dropdown.Item onClick={() => router.push("/author-panel")}>
            لوحة التحكم
          </Dropdown.Item>
        )}

        <Dropdown.Divider />
        <Dropdown.Item onClick={handleLogout}>تسجيل الخروج</Dropdown.Item>
      </Dropdown>

      <div className="flex items-center justify-center">
        <Image
          src={user.image}
          width={"30px"}
          height={"30px"}
          objectFit="cover"
          className="rounded-full"
        />
      </div>
    </div>
  );
};

export default UserProfile;
