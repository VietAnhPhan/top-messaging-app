import { useContext } from "react";
import { UserContext } from "../../../Context";
import api from "../../../api";
import Avatar from "../../Avatar";

const Conversation = ({ conversation, userIds }) => {
  const userContext = useContext(UserContext);
  const chatUser = conversation.ChatMember[0].user;

  const lastTime = new Date(conversation.messages[0].createdAt);
  const lastTimeFortmat =
    lastTime.getMonth() +
    1 +
    "/" +
    lastTime.getDate() +
    "/" +
    lastTime.getFullYear();

  async function handleSelect() {
    const currentConversation = await api.getCurrentConversation(
      userIds,
      userContext.token
    );

    

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
          <Avatar
            user={chatUser}
            size={{ w: 12, h: 12 }}
            shrink={"shrink-0"}
          ></Avatar>

          <div className="">
            <p className="text-base font-medium dark:text-slate-50">
              {chatUser.name}
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
