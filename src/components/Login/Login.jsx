import styles from "./Login.module.css";
import logoImage from "/messaging-app-logo-500x500px.png";
import introImage from "/intro-app.png";
import { ErrorBoundary } from "react-error-boundary";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import api from "../../api";

function Login(props) {
  const [username, setUsername] = useState("");
  const [authResults, setAuthResults] = useState("");

  let navigate = useNavigate();

  function typingUsername(e) {
    setUsername(e.target.value);
  }
  async function login(formData) {
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const result = await api.login(username, password);
      if (result.info) {
        setAuthResults(result.info.message);
        return;
      }

      localStorage.setItem(
        "messaging_app_access",
        JSON.stringify({
          username: result.username,
          token: result.token,
        })
      );

      navigate("/");
    } catch (e) {
      throw new Error(`login error: ${e.message}`);
    }
  }

  return (
    <ErrorBoundary
      fallback={<p>There was an error while submitting the form</p>}
    >
      <div className={styles.backgroundColor}>
        <div className={styles.container}>
          <title>{`Login | ${props.sitename}`}</title>
          <div className="flex pt-5">
            <Link to="/">
              <img src={logoImage} alt="login icon" className="w-32" />
            </Link>
          </div>
          <div className="flex items-center gap-x-10 h-full justify-center">
            <div className="rounded-md xl:col-span-1 xl:col-start-3 flex-1">
              <div className="mb-8 flex flex-col gap-2.5">
                <h1 className="font-bold text-green-600 text-[60px]">
                  Have a conversation has never been easier
                </h1>
                <p className="text-gray-500">
                  Please enter your credientials and press login
                </p>
              </div>
              <form action={login} className="flex flex-col">
                <div className="flex flex-col">
                  <label htmlFor="username" className="text-zinc-500">
                    Username:
                  </label>
                  <div className="flex">
                    <span className="flex items-center h-[100%] border-1 border-r-0 rounded-l-md border-zinc-400 bg-icon-box">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="size-9 fill-zinc-500 pl-2 pr-2"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      className="p-1.5 w-full"
                      onChange={typingUsername}
                      value={username}
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col mt-3">
                  <label htmlFor="password" className="text-zinc-500">
                    Password:
                  </label>
                  <div className="flex">
                    <span className="flex items-center h-[100%] border-1 border-r-0 rounded-l-md border-zinc-400 bg-icon-box">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-9 fill-zinc-500 pl-2 pr-2"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="p-1.5 w-full"
                      required
                      minLength={8}
                      maxLength={30}
                    />
                  </div>
                </div>
                {authResults && <p className="text-red-500">{authResults}</p>}
                <button type="submit" className="mt-5 button-solid">
                  Login
                </button>
                <p className="text-center">Or</p>{" "}
                <Link className="text-center" to="/sign-up">
                  Sign up with email
                </Link>
              </form>
            </div>
            <div className="flex-1">
              <img width={700} src={introImage} alt="intro app" />
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default Login;
