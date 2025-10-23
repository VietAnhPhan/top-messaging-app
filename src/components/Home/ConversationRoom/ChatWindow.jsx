import { useContext } from "react";
import { UserContext } from "../../../Context";
import MyMessage from "./MyMessage";
import OthersMessage from "./OthersMessage";
const ChatWindow = ({ currentConversation }) => {
  const userContext = useContext(UserContext);

  return (
    <div className="bg-rose-100/50 dark:bg-slate-900 opacity-95 relative overflow-auto flex-1">
      <div className="px-13">
        {currentConversation &&
          currentConversation.messages.length > 0 &&
          currentConversation.messages.map((message) => {
            if (message.userId === userContext.id) {
              return <MyMessage key={message.id} message={message}></MyMessage>;
            } else
              return (
                <OthersMessage
                  key={message.id}
                  message={message}
                ></OthersMessage>
              );
          })}
      </div>
      <div className="bg-[url(/bg-chat-room.png)] dark:bg-[url(/m5BEg2K4OR4.png)] w-full h-full opacity-10 dark:opacity-8 absolute top-0"></div>
    </div>
  );
};

export default ChatWindow;
