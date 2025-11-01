import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { HeaderContext } from "../Context";

const Setting = (props) => {
  const navigate = useNavigate();

  const headerContext = useContext(HeaderContext);

  useEffect(() => {
    headerContext.setactiveMenuItem("settings");
  });

  function logout() {
    localStorage.removeItem("messaging_app_access");
    localStorage.removeItem("user");
    navigate("/");
  }
  return (
    <>
    <title>{`Settings | ${props.sitename}`}</title>
      <div className="md:grid md:grid-cols-3 flex-1 overflow-y-auto">
        <div className="flex flex-col gap-y-4">
          <p className="dark:text-gray-50 text-2xl">Settings</p>
          <ul>
            <li>
              <button
                className="hover:cursor-pointer dark:text-gray-50 flex gap-x-4"
                onClick={logout}
              >
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"
                  />
                </svg>
                Log out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Setting;
