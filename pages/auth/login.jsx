import usePasswordShow from "@hooks/usePasswordShow";
import { requireLogout } from "@utils/middlewares";
import { authenticate } from "@store/authSlice";
import { loginUser } from "@utils/auth";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";

// <Validation>
//
import Container from "@components/Container";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

//
// </Validation>

const login = () => {
  const [type, toggleType] = usePasswordShow();

  const [formError, setFormError] = useState({
    error: false,
    msg: "",
  });

  const dispatch = useDispatch();
  const router = useRouter();

  const schema = yup.object().shape({
    identifier: yup
      .string()
      .trim()
      .min(3)
      .required("You need to provide email or username."),
    password: yup.string().min(8).required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onFormSubmit = async ({ identifier, password }) => {
    // console.log({ identifier, password });

    // ! Trying to login :
    const response = await loginUser({
      EmailOrUsername: identifier,
      password: password,
    });

    const res = response?.data;

    if (res === undefined) {
      return console.log(`=> response undefined`);
    }

    if (res?.ok) {
      dispatch(
        authenticate({ isAuth: res.ok, token: res.token, user: res.user })
      );
      router.push("/");
    } else {
      setFormError({
        error: true,
        msg: res.msg,
      });
    }
  };
  //
  //
  //
  //

  return (
    <Container className="h-full">
      <div className="flex flex-1 justify-center items-center">
        <form
          onSubmit={handleSubmit(onFormSubmit)}
          className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 mx-3 sm:mx-8 md:w-[50vw] md:max-w-[30rem]"
          dir="ltr"
        >
          <div className="mt-2 mb-4">
            <label
              htmlFor="EmailOrUsername"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Your email or username
            </label>
            <div className="relative">
              <input
                type="text"
                id="EmailOrUsername"
                className="input"
                placeholder="email or username..."
                {...register("identifier")}
              />

              <div className="absolute right-0 top-1/2 -translate-y-1/2">
                {errors.identifier?.message ? (
                  <span className="mr-1.5 text-red-500">
                    <i className="fa-solid fa-exclamation-circle" />
                  </span>
                ) : (
                  <span className="mr-1.5 text-green-500">
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
            <div className="relative group">
              <input
                className="input"
                type={type}
                id="password"
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

            {errors.password?.message ? (
              <div className="text-red-500 text-sm">
                {errors.password.error}
              </div>
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
                    <span className="font-medium capitalize">
                      {formError.msg}
                    </span>
                  </div>
                </div>
              )
            )}
          </div>
          <div className="flex items-start mb-6">
            <div className="flex items-center h-5">
              <input id="terms" type="checkbox" defaultChecked={true} />
            </div>
            <label
              htmlFor="terms"
              className="cursor-pointer ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Remember me.
            </label>
          </div>
          <button type="submit" className="btn-purple">
            Login to your account
          </button>
          <div className="mt-4 mb-3 flex justify-center items-center">
            <hr className="w-1/3 border-gray-300 dark:border-gray-700" />
            <div className="px-2 text-gray-600 dark:text-gray-400">OR</div>
            <hr className="w-1/3 border-gray-300 dark:border-gray-700" />
          </div>
          <div className="text-center text-Purple font-semibold dark:text-lighterPurple ">
            <Link href={"/auth/register"}>
              <a className="hover:underline text-sm">Register new account</a>
            </Link>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default login;

export const getServerSideProps = async ({ req }) => {
  return requireLogout({ req }, () => {
    return {
      props: {},
    };
  });
};
