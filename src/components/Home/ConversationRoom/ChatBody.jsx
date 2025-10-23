import MyMessage from "./MyMessage";
import OthersMessage from "./OthersMessage";
import { useContext } from "react";
import { ConversationContext, UserContext } from "../../../Context";

const ChatBody = () => {
  const userContext = useContext(UserContext);
  const conversation = useContext(ConversationContext);

  return (
    <div className="bg-[#F5F1EB] dark:bg-slate-900 opacity-95 relative overflow-auto flex-1">
      <div className="px-13">
        {conversation.currentConversation &&
          conversation.currentConversation.messages.length > 0 &&
          conversation.currentConversation.messages.map((message) => {
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
      <div className="bg-[url(/MHVytaGe3gh.png)] dark:bg-[url(/m5BEg2K4OR4.png)] w-full h-full opacity-13 dark:opacity-8 absolute top-0"></div>
    </div>
  );
};

export default ChatBody;
