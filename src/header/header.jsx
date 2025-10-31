import { MessageSquareText, Users, Settings } from "lucide-react";
import styles from "./header.module.css";

import { Link } from "react-router";
import { useContext } from "react";
import { AvatarContext, HeaderContext } from "../Context";

export const Header = ({ loaderData }) => {
  const avatarContext = useContext(AvatarContext);
  const headerContext = useContext(HeaderContext);

  return (
    <header className="flex md:flex-col justify-between items-center bg-zinc-100 dark:bg-slate-800 md:py-8 px-3 border-r-[1px] border-r-zinc-300 dark:border-r-slate-700 z-10">
      <div className="flex flex-col gap-y-3">
        <Link to="/">
          <div
            className={`${styles.menuIconWrapper} ${
              headerContext.activeMenuItem === "chats"
                ? styles.activeMenuItem
                : ""
            }`}
          >
            <MessageSquareText className={styles.menuIcon} />
          </div>
        </Link>
        <Link to="/friends">
          <div
            className={`${styles.menuIconWrapper} ${
              headerContext.activeMenuItem === "friends"
                ? styles.activeMenuItem
                : ""
            }`}
          >
            <Users className={styles.menuIcon} />
          </div>
        </Link>
      </div>

      <div className="flex flex-col items-center gap-y-3">
        <Link to="/settings">
          <div
            className={`${styles.menuIconWrapper} ${
              headerContext.activeMenuItem === "settings"
                ? styles.activeMenuItem
                : ""
            }`}
          >
            <Settings className={styles.menuIcon} />
          </div>
        </Link>
        <div className="flex md:block">
          <Link to="/profile" className="col-start-1 flex md:block">
            <div
              className={`${styles.menuIconWrapper} ${
                headerContext.activeMenuItem === "profile"
                  ? styles.activeMenuItem
                  : ""
              }`}
            >
              {loaderData.avatarPath ? (
                <div className="w-7 h-7">
                  <img
                    className="rounded-[50%] object-cover object-top w-full h-full"
                    src={`https://bkudoqbqykfhbgcxfelw.supabase.co/storage/v1/object/public/${avatarContext.avatarPath}`}
                    alt={`${loaderData.name}'s avatar`}
                  />
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
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};
