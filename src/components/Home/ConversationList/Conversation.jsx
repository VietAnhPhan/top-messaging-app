import { useContext } from "react";
import { UserContext } from "../../../Context";

const Conversation = ({ conversation, userIds }) => {
  const userContext = useContext(UserContext);

  const lastTime = new Date(conversation.messages[0].createdAt);
  const lastTimeFortmat =
    lastTime.getMonth() +
    1 +
    "/" +
    lastTime.getDate() +
    "/" +
    lastTime.getFullYear();

  async function handleSelect() {
    const rs = await fetch(
      `http://localhost:3000/conversations?userIds=${userIds}`,
      {
        method: "GET",
        headers: {
          Authorization: `bearer ${userContext.token}`,
        },
      }
    );

    const currentConversation = await rs.json();

    const chatUserRes = await fetch(
      `http://localhost:3000/users?conversation_id=${currentConversation.id}&auth_id=${userContext.id}`,
      {
        method: "GET",
        headers: {
          Authorization: `bearer ${userContext.token}`,
        },
      }
    );

    const chatUser = await chatUserRes.json();

    // userContext.handleCurrentConversation(currentConversation);
    userContext.handleSelectUser(chatUser, currentConversation);

    if (
      !userContext.screen.isChatWindow ||
      !userContext.screen.isConversationList
    ) {
      userContext.screen.setIsChatWindow(true);
      userContext.screen.setIsConversationList(false);
    }
  }

  return (
    <div
      className="p-4 hover:bg-zinc-200/50 dark:hover:bg-slate-800"
      onClick={handleSelect}
    >
      <div className="flex justify-between">
        <div className="flex items-center gap-x-3">
          <svg
            className="w-[48px] h-[48px] text-gray-800 dark:text-gray-50 shrink-0"
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
          <div className="">
            <p className="text-base font-medium dark:text-slate-50">
              {conversation.ChatMember[0].user.name}
            </p>
            <p className="text-sm dark:text-zinc-400">
              {conversation.messages[0].message}
            </p>
          </div>
        </div>

        <p className="dark:text-zinc-400 text-sm">{lastTimeFortmat}</p>
      </div>
    </div>
  );
};

export default Conversation;
