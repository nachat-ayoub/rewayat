import Link from "next/link";
import { useState } from "react";
import usePasswordShow from "../../hooks/usePasswordShow";
import auth from "../../services/auth";

import {
  areMatch,
  isBigThen,
  isEmail,
  isEmpty,
  isLessThen,
  isValidUsername,
} from "../../services/validation";
import { requireLogout } from "../../utils";

const register = () => {
  const [type, toggleType] = usePasswordShow();
  const [type_2, toggleType_2] = usePasswordShow();

  const [username, setUsername] = useState({
    value: "",
    valid: false,
    error: "",
    focused: false,
  });
  const [email, setEmail] = useState({
    value: "",
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
  const [repeat_password, setRepeat_password] = useState({
    value: "",
    valid: false,
    error: "",
    focused: false,
  });

  const submitHandler = async () => {
    // Username :
    if (
      !isEmpty([username, setUsername]) &&
      !isLessThen([username, setUsername], 4) &&
      !isBigThen([username, setUsername], 20) &&
      isValidUsername([username, setUsername])
    ) {
      setUsername({
        ...username,
        valid: true,
        error: "",
        focused: true,
      });
    } else return;
    // Email :
    if (!isEmpty([email, setEmail]) && isEmail([email, setEmail])) {
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
    // Password Confirmation :
    if (
      !isEmpty([repeat_password, setRepeat_password]) &&
      !isLessThen([repeat_password, setRepeat_password], 8) &&
      areMatch([repeat_password, setRepeat_password], password.value)
    ) {
      setRepeat_password({
        ...repeat_password,
        valid: true,
        error: "",
        focused: true,
      });
    } else return;

    const res = await auth.register({
      username: username.value,
      email: email.value,
      password: password.value,
    });
    console.log(res);
  };

  return (
    <div className="flex flex-1 justify-center items-center">
      <form
        className="w-full shadow border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 m-3 sm:mx-8 md:w-[50vw] md:max-w-[30rem]"
        dir="ltr"
        onSubmit={(e) => e.preventDefault()}
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
              value={username.value}
              onChange={(e) =>
                setUsername({ ...username, value: e.target.value })
              }
            />

            <div className="absolute pr-1.5 right-0 top-1/2 -translate-y-1/2">
              {username.focused && username.valid ? (
                <span className="ml-1.5 text-green-500">
                  <i className="fa-solid fa-circle-check" />
                </span>
              ) : (
                username.focused && (
                  <span className="ml-1.5 text-red-500">
                    <i className="fa-solid fa-exclamation-circle" />
                  </span>
                )
              )}
            </div>
          </div>
          <div
            className={`mt-1 text-red-500 text-sm ${
              username.focused && !username.valid ? "visible" : "invisible"
            }`}
          >
            {username.error}
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
              type="email"
              id="email"
              className="input"
              placeholder="example@gmail.com"
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
          <div className="relative">
            <input
              type="password"
              id="password"
              className="input"
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
          <div
            className={`mt-1 text-red-500 text-sm ${
              password.focused && !password.valid ? "visible" : "invisible"
            }`}
          >
            {password.error}
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
              value={repeat_password.value}
              onChange={(e) =>
                setRepeat_password({
                  ...repeat_password,
                  value: e.target.value,
                })
              }
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

              {repeat_password.focused && repeat_password.valid ? (
                <span className="ml-1.5 text-green-500">
                  <i className="fa-solid fa-circle-check" />
                </span>
              ) : (
                repeat_password.focused && (
                  <span className="ml-1.5 text-red-500">
                    <i className="fa-solid fa-exclamation-circle" />
                  </span>
                )
              )}
            </div>
          </div>
          <div
            className={`mt-1 text-red-500 text-sm ${
              repeat_password.focused && !repeat_password.valid
                ? "visible"
                : "invisible"
            }`}
          >
            {repeat_password.error}
          </div>
        </div>
        <div className="flex items-start mb-4">
          <div className="flex items-center h-5">
            <input
              id="terms"
              type="checkbox"
              value=""
              className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
            />
          </div>
          <label
            htmlFor="terms"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Remember me.
          </label>
        </div>
        <button onClick={submitHandler} type="submit" className="btn-purple">
          Register new account
        </button>
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

export default register;

export const getServerSideProps = async ({ req }) => {
  return requireLogout({ req }, () => {
    return {
      props: {},
    };
  });
};
