import { useContext } from "react";
import { UserContext } from "../../../Context";
import api from "../../../api";
import Avatar from "../../Avatar";
import styles from "./Conversation.module.css";

const Conversation = ({ conversation, userIds }) => {
  const userContext = useContext(UserContext);
  const chatUser = conversation.ChatMember[0].user;
  const isSeen = conversation.messages[0].isSeen;
  const chatUserId = conversation.messages[0].userId;

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
          <Avatar user={chatUser} type={"chatFrame"}></Avatar>

          <div className="">
            {/* Chat user name */}
            <p
              className={`text-base font-medium dark:text-slate-50 ${
                !isSeen &&
                chatUser.id === chatUserId &&
                styles.userIncomingMessage
              }`}
            >
              {chatUser.name}
            </p>
            {/* Last sent message */}
            <p
              className={`text-sm dark:text-zinc-400 ${
                !isSeen && chatUser.id === chatUserId && styles.incomingMessage
              }`}
            >
              {conversation.messages[0].message}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end">
          {/* Date sent */}
          <p
            className={`dark:text-zinc-400 text-sm ${
              !isSeen &&
              chatUser.id === chatUserId &&
              styles.dateIncomingMessage
            }`}
          >
            {lastTimeFortmat}
          </p>
          {/* Indicated incomming message circle */}
          {!isSeen && chatUser.id === chatUserId && (
            <span className={styles.circleIncomingMessage}></span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Conversation;
