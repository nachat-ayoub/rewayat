import { yupResolver } from "@hookform/resolvers/yup";
import { authenticate } from "@store/authSlice";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { getBase64 } from "@utils/index";
import * as yup from "yup";
import axios from "axios";

const EditUserForm = ({ user, isModalHidden, toggleModal }) => {
  const dispatch = useDispatch();

  const [userInfoSaved, setUserInfoSaved] = useState(null);

  const schema = yup.object().shape({
    username: yup.string().trim().min(3).required(),
    email: yup.string().trim().email().required(),
    bio: yup.string().trim().max(200).required(),
    image: yup
      .mixed()
      .test("fileSize", "The image is too large max size is 1MB", ([file]) => {
        if (!file || !file.size) return true;
        const one_MB = 1050000;
        return file && file.size <= one_MB;
      })
      .test(
        "fileType",
        "This image format is not supported (supported formats: png/jpg/jpeg)",
        ([file]) => {
          if (!file || !file.size) return true;
          return ["png", "jpg", "jpeg"].includes(file.type.split("image/")[1]);
        }
      ),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: user?.username,
      email: user?.email,
      bio: user?.bio,
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (isModalHidden) {
      setUserInfoSaved(null);
    }
    if (user.username !== "") {
      reset({
        username: user.username,
        email: user.email,
        bio: user.bio,
      });
    }
  }, [isModalHidden, user]);

  // TODO: Update User Info :
  const updateUserInfo = async (data) => {
    try {
      setUserInfoSaved(false);

      getBase64(data.image[0], async (image) => {
        data.image = image;
        const { data: res } = await axios.put(
          `${process.env.API_URL}/auth/${user?.username}/update`,
          data,
          {
            headers: {
              token: user?.token,
            },
          }
        );

        if (res.ok) {
          const response = await axios.post("/api/auth/authenticate", {
            token: res?.userToken,
          });

          dispatch(
            authenticate({ isAuth: res.ok, token: user?.token, user: res.user })
          );
          setUserInfoSaved(res.ok ?? null);
          toggleModal();
        } else {
          setUserInfoSaved(res.ok ?? null);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  //
  return (
    <form
      dir="ltr"
      onSubmit={handleSubmit(updateUserInfo)}
      className="w-full py-2 dark:text-white"
    >
      {/* 🧑‍💻 it's me nachat ayoub a full stack web developer. */}
      <div className="max-h-[75vh] overflow-auto">
        {/* Username */}
        <div className="">
          <label className="capitalize" htmlFor="username">
            username :
          </label>
          <input
            className="input mt-2"
            id="username"
            type="text"
            placeholder="username..."
            {...register("username")}
          />
          <div className="my-2">
            <div className="text-red-500 text-sm">
              {errors.username?.message}
            </div>
          </div>
        </div>
        {/* Username */}

        {/* Email */}
        <div className="">
          <label className="capitalize" htmlFor="username">
            email :
          </label>
          <input
            className="input mt-2"
            id="email"
            type="text"
            placeholder="email..."
            {...register("email")}
          />
          <div className="my-2">
            <div className="text-red-500 text-sm">{errors.email?.message}</div>
          </div>
        </div>
        {/* Email */}

        {/* Bio */}
        <div className="">
          <label className="capitalize" htmlFor="username">
            bio :
          </label>
          <textarea
            className="input mt-2 min-h-[2.5rem]"
            id="bio"
            rows={4}
            placeholder="bio..."
            {...register("bio")}
          />
          <div className="my-2">
            <div className="text-red-500 text-sm">{errors.bio?.message}</div>
          </div>
        </div>
        {/* Bio */}

        {/* Image */}
        <div className="">
          <label className="capitalize" htmlFor="image">
            Image :<div className="bg-gray-200"></div>
            <input
              id="image"
              className="input mt-2 py-0 focus:py-0"
              accept="image/*"
              type="file"
              {...register("image")}
            />
          </label>
          <div className="my-2">
            <div className="text-red-500 text-sm">{errors.image?.message}</div>
          </div>
        </div>
        {/* Image */}
        <div className="">
          <button className="btn-purple">
            {userInfoSaved === null ? (
              "save"
            ) : !userInfoSaved ? (
              <span className="inline-block animate-spin">
                <i className="fa-solid fa-spinner" />
              </span>
            ) : (
              <>
                saved successfully
                <span className="ml-2">
                  <i className="fa-solid fa-check" />
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditUserForm;
