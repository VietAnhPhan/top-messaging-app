import "./header.css";
import { redirect, useNavigate } from "react-router";
import { useContext } from "react";
import { UserContext } from "../Context";
import { Link } from "react-router";

export const Header = ({ loaderData }) => {
  const navigate = useNavigate();
  function logout() {
    localStorage.removeItem("messaging_app_access");
    localStorage.removeItem("user");
    navigate("/");
  }

  return (
    <header className="flex md:flex-col justify-between items-center dark:bg-slate-800 md:py-8">
      <Link to="/">
        <svg
          className="w-12 h-12 dark:text-gray-50"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M3 5.983C3 4.888 3.895 4 5 4h14c1.105 0 2 .888 2 1.983v8.923a1.992 1.992 0 0 1-2 1.983h-6.6l-2.867 2.7c-.955.899-2.533.228-2.533-1.08v-1.62H5c-1.105 0-2-.888-2-1.983V5.983Zm5.706 3.809a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Zm2.585.002a1 1 0 1 1 .003 1.414 1 1 0 0 1-.003-1.414Zm5.415-.002a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Z"
            clipRule="evenodd"
          />
        </svg>
      </Link>
      <div className="flex md:block">
        <Link className="col-start-1 flex md:block" to="/profile">
          {loaderData.avatarPath ? (
            <img
              className="w-36"
              src={`https://bkudoqbqykfhbgcxfelw.supabase.co/storage/v1/object/public/${loaderData.avatarPath}`}
            ></img>
          ) : (
            <svg
              className="w-[48px] h-[48px] dark:text-gray-50"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z"
                clipRule="evenodd"
              />
            </svg>
          )}

          <p className="dark:text-gray-50">{loaderData.name}</p>
        </Link>
        <button
          className="hover:cursor-pointer dark:text-gray-50"
          onClick={logout}
        >
          Log out
        </button>
      </div>
    </header>
  );
};
