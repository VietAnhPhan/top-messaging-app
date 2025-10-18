import "./header.css";

import { Link } from "react-router";

export const Header = ({ loaderData }) => {
  return (
    <header className="flex md:flex-col justify-between items-center dark:bg-slate-800 md:py-8 px-3 border-r-[1px] border-r-slate-700 ">
      <Link to="/">
        <svg
          className="w-8 h-8 dark:text-gray-50"
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

      <div className="flex flex-col gap-y-3">
        <Link to="/settings">
          <svg
            className="w-8 h-8 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="square"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h2m10 1a3 3 0 0 1-3 3m3-3a3 3 0 0 0-3-3m3 3h1m-4 3a3 3 0 0 1-3-3m3 3v1m-3-4a3 3 0 0 1 3-3m-3 3h-1m4-3v-1m-2.121 1.879-.707-.707m5.656 5.656-.707-.707m-4.242 0-.707.707m5.656-5.656-.707.707M12 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </Link>
        <div className="flex md:block">
          <Link className="col-start-1 flex md:block" to="/profile">
            {loaderData.avatarPath ? (
              <div
                className="w-7 h-7 bg-cover rounded-[50%]"
                style={{
                  backgroundImage: `url(https://bkudoqbqykfhbgcxfelw.supabase.co/storage/v1/object/public/${loaderData.avatarPath})`,
                }}
              >
                {/* <img
                  className="w-36"
                  src={`https://bkudoqbqykfhbgcxfelw.supabase.co/storage/v1/object/public/${loaderData.avatarPath}`}
                ></img> */}
              </div>
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
            {/* <p className="dark:text-gray-50">{loaderData.name}</p> */}
          </Link>
        </div>
      </div>
    </header>
  );
};
