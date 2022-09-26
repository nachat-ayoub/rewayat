import { useState } from "react";
import Link from "next/link";
import usePasswordShow from "../../hooks/usePasswordShow";
import { isEmpty, isLessThen } from "../../services/validation";
import auth, { isAuth } from "../../services/auth";

import { useDispatch } from "react-redux";
import { authenticate } from "../../store/authSlice";
import { useRouter } from "next/router";
import { requireLogout } from "../../utils";

const login = () => {
  const [type, toggleType] = usePasswordShow();

  const [email, setEmail] = useState({
    value: "ayoub@gmail.com",
    valid: false,
    error: "",
    focused: false,
  });
  const [password, setPassword] = useState({
    value: "",
    valid: false,
    error: "",
    focused: false,
  });
  const [formError, setFormError] = useState({
    error: false,
    msg: "",
  });

  const dispatch = useDispatch();
  const router = useRouter();

  const submitHandler = async () => {
    // Email Or Username :
    if (!isEmpty([email, setEmail]) && !isLessThen([email, setEmail], 3)) {
      setEmail({
        ...email,
        valid: true,
        error: "",
        focused: true,
      });
    } else return;
    // Password :
    if (
      !isEmpty([password, setPassword]) &&
      !isLessThen([password, setPassword], 8)
    ) {
      setPassword({
        ...password,
        valid: true,
        error: "",
        focused: true,
      });
    } else return;

    const data = await auth.login({
      EmailOrUsername: email.value,
      password: password.value,
    });
    const res = data?.data;

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

  return (
    <div className="flex flex-1 justify-center items-center">
      <form
        onSubmit={(e) => e.preventDefault()}
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
              value={email.value}
              onChange={(e) => setEmail({ ...email, value: e.target.value })}
            />

            <div className="absolute right-0 top-1/2 -translate-y-1/2">
              {email.focused && email.valid ? (
                <span className="mr-1.5 text-green-500">
                  <i className="fa-solid fa-circle-check" />
                </span>
              ) : (
                email.focused && (
                  <span className="mr-1.5 text-red-500">
                    <i className="fa-solid fa-exclamation-circle" />
                  </span>
                )
              )}
            </div>
          </div>
          <div
            className={`mt-1 text-red-500 text-sm ${
              email.focused && !email.valid ? "visible" : "invisible"
            }`}
          >
            {email.error}
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
              value={password.value}
              onChange={(e) =>
                setPassword({
                  ...password,
                  value: e.target.value,
                })
              }
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

              {password.focused && password.valid ? (
                <span className="ml-1.5 text-green-500">
                  <i className="fa-solid fa-circle-check" />
                </span>
              ) : (
                password.focused && (
                  <span className="ml-1.5 text-red-500">
                    <i className="fa-solid fa-exclamation-circle" />
                  </span>
                )
              )}
            </div>
          </div>

          {password.focused && !password.valid ? (
            <div className="text-red-500 text-sm">{password.error}</div>
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
            <input
              id="terms"
              type="checkbox"
              className="cursor-pointer w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
            />
          </div>
          <label
            htmlFor="terms"
            className="cursor-pointer ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Remember me.
          </label>
        </div>
        <button onClick={submitHandler} type="submit" className="btn-purple">
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
