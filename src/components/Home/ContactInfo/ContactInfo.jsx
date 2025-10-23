import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../Context";

const ContactInfo = ({ currentContact }) => {
  const userContext = useContext(UserContext);
  const [isSent, setisSent] = useState(false);

  useEffect(() => {
    async function fetchFriendRequest() {}
  });

  async function handleSent() {
    try {
      const rs = await fetch("http://localhost:3000/friendrequests", {
        method: "POST",
        body: JSON.stringify({
          senderId: userContext.id,
          receiverId: currentContact.id,
        }),
        headers: {
          "Content-type": "application/json",
          Authorization: `bearer ${userContext.token}`,
        },
      });

      if (rs.ok) {
        setisSent(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleRevoke() {
    setisSent(false);
  }

  return (
    <div className="border-l-[1px] border-l-zinc-300 dark:border-l-slate-700 py-4 px-6 gap-x-4 dark:bg-slate-900">
      <p className="dark:text-gray-50">Contact info</p>
      <div className="flex justify-center mt-10">
        <div className="flex flex-col items-center">
          <svg
            className="w-[150px] h-[150px] text-gray-800 hover:cursor-pointer dark:text-gray-50"
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
          <p className="dark:text-gray-50">
            {currentContact ? currentContact.name : ""}
          </p>
          <p className="dark:text-gray-50">
            @{currentContact ? currentContact.username : ""}
          </p>

          {/* Add friend */}
          <div className="mt-8 hover:cursor-pointer">
            {!isSent ? (
              <div onClick={handleSent}>
                <svg
                  className="w-7 h-7 text-green-600"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  onClick={handleSent}
                >
                  <path
                    fillRule="evenodd"
                    d="M9 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H7Zm8-1a1 1 0 0 1 1-1h1v-1a1 1 0 1 1 2 0v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 0 1-1-1Z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-green-600">Add</p>
              </div>
            ) : (
              <div onClick={handleRevoke}>
                <svg
                  className="w-7 h-7 text-gray-800 dark:text-green-600"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  onClick={handleRevoke}
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 8a4 4 0 1 1 8 0 4 4 0 0 1-8 0Zm-2 9a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1Zm13-6a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-4Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <p className="text-green-600">Revoke</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <p>About</p>
      <p>{currentContact && currentContact.about}</p>
    </div>
  );
};

export default ContactInfo;
