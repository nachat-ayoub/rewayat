import usePasswordShow from "../../hooks/usePasswordShow";
import { authenticate } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";

import { requireLogout } from "../../utils/middlewares";
import { registerUser } from "../../utils/auth";

// <Validation>
//

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

//
// </Validation>

const registerPage = () => {
  const [type, toggleType] = usePasswordShow();
  const [type_2, toggleType_2] = usePasswordShow();

  const [formError, setFormError] = useState({
    error: false,
    msg: "",
  });

  const dispatch = useDispatch();
  const router = useRouter();

  const schema = yup.object().shape({
    username: yup
      .string()
      .trim()
      .min(3)
      .required("You need to provide an username."),
    email: yup
      .string()
      .trim()
      .email()
      .required("You need to provide an email."),
    password: yup.string().min(8).required(),
    repeated_password: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords don't match")
      .required("repeated password is a required field"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onFormSubmit = async ({ username, email, password }) => {
    const { data: res } = await registerUser({
      username,
      email,
      password,
    });

    console.log(res);

    if (res.ok) {
      dispatch(
        authenticate({ isAuth: res.ok, token: res.token, user: res.user })
      );
      router.push("/");
      return setFormError({ error: false, msg: "" });
    } else {
      setFormError({ error: true, msg: res.msg });
    }
  };

  return (
    <div className="flex flex-1 justify-center items-center">
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="w-full shadow border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 m-4 md:my-8 sm:mx-8 md:w-[50vw] md:max-w-[30rem]"
        dir="ltr"
      >
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Your username
          </label>
          <div className="relative">
            <input
              type="text"
              id="username"
              className="input"
              placeholder="username..."
              {...register("username")}
            />

            <div className="absolute pr-1.5 right-0 top-1/2 -translate-y-1/2">
              {errors.username?.message ? (
                <span className="ml-1.5 text-red-500">
                  <i className="fa-solid fa-exclamation-circle" />
                </span>
              ) : (
                <span className="ml-1.5 text-green-500">
                  <i className="fa-solid fa-circle-check" />
                </span>
              )}
            </div>
          </div>
          <div
            className={`mt-1 text-red-500 text-sm ${
              errors.username?.message ? "visible" : "invisible"
            }`}
          >
            {errors.username?.message}
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Your email
          </label>

          <div className="relative">
            <input
              type="text"
              id="email"
              className="input"
              placeholder="example@gmail.com"
              {...register("email")}
            />

            <div className="absolute pr-1.5 right-0 top-1/2 -translate-y-1/2">
              {errors.email?.message ? (
                <span className="ml-1.5 text-red-500">
                  <i className="fa-solid fa-exclamation-circle" />
                </span>
              ) : (
                <span className="ml-1.5 text-green-500">
                  <i className="fa-solid fa-circle-check" />
                </span>
              )}
            </div>
          </div>
          <div
            className={`mt-1 text-red-500 text-sm ${
              errors.email?.message ? "visible" : "invisible"
            }`}
          >
            {errors.email?.message}
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Your password
          </label>
          <div className="relative">
            <input
              type="password"
              id="password"
              className="input"
              {...register("password")}
            />
            <div className="absolute pr-1.5 right-0 top-1/2 -translate-y-1/2">
              <span
                onClick={toggleType}
                className="hidden text-gray-700 dark:text-gray-200 group-hover:inline-block ml-1.5 cursor-pointer"
              >
                {type === "text" ? (
                  <i className="fa-solid fa-eye-slash" />
                ) : (
                  <i className="fa-solid fa-eye" />
                )}
              </span>

              {errors.password?.message ? (
                <span className="ml-1.5 text-red-500">
                  <i className="fa-solid fa-exclamation-circle" />
                </span>
              ) : (
                <span className="ml-1.5 text-green-500">
                  <i className="fa-solid fa-circle-check" />
                </span>
              )}
            </div>
          </div>
          <div
            className={`mt-1 text-red-500 text-sm ${
              errors.password?.message ? "visible" : "invisible"
            }`}
          >
            {errors.password?.message}
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="repeat-password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Repeat password
          </label>
          <div className="relative">
            <input
              type="password"
              id="repeat-password"
              className="input"
              {...register("repeated_password")}
            />

            <div className="absolute pr-1.5 right-0 top-1/2 -translate-y-1/2">
              <span
                onClick={toggleType_2}
                className="hidden text-gray-700 dark:text-gray-200 group-hover:inline-block ml-1.5 cursor-pointer"
              >
                {type_2 === "text" ? (
                  <i className="fa-solid fa-eye-slash" />
                ) : (
                  <i className="fa-solid fa-eye" />
                )}
              </span>
              {errors.repeated_password?.message ? (
                <span className="ml-1.5 text-red-500">
                  <i className="fa-solid fa-exclamation-circle" />
                </span>
              ) : (
                <span className="ml-1.5 text-green-500">
                  <i className="fa-solid fa-circle-check" />
                </span>
              )}
            </div>
          </div>
          <div
            className={`mt-1 text-red-500 text-sm ${
              errors.repeated_password?.message ? "visible" : "invisible"
            }`}
          >
            {errors.repeated_password?.message}
          </div>
        </div>
        <div className="flex items-start mb-4">
          <div className="flex items-center h-5">
            <input id="terms" type="checkbox" defaultChecked={true} />
          </div>
          <label
            htmlFor="terms"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Remember me.
          </label>
        </div>

        {errors.password?.message ? (
          <div className="text-red-500 text-sm">{errors.password.error}</div>
        ) : (
          formError.error && (
            <div
              className="flex p-4 my-3 text-sm shadow-sm text-red-600 bg-red-200 rounded dark:bg-red-200 dark:text-red-600"
              role="alert"
            >
              <span className="mr-3">
                <i className="fa-solid fa-triangle-exclamation"></i>
              </span>
              <span className="sr-only">Info</span>
              <div>
                <span className="font-medium capitalize">{formError.msg}</span>
              </div>
            </div>
          )
        )}

        <button className="btn-purple">Register new account</button>
        <div className="mt-4 mb-3 flex justify-center items-center">
          <hr className="w-1/3 border-gray-300 dark:border-gray-700" />
          <div className="px-2 text-gray-600 dark:text-gray-400">OR</div>
          <hr className="w-1/3 border-gray-300 dark:border-gray-700" />
        </div>
        <div className="text-center text-Purple font-semibold dark:text-lighterPurple ">
          <Link href={"/auth/login"}>
            <a className="hover:underline text-sm">Login to your account</a>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default registerPage;

export const getServerSideProps = async ({ req }) => {
  return requireLogout({ req }, () => {
    return {
      props: {},
    };
  });
};
