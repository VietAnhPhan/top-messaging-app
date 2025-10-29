import MyMessage from "./MyMessage";
import OthersMessage from "./OthersMessage";
import { useContext, useEffect, useRef } from "react";
import { ConversationContext, UserContext } from "../../../Context";
import styles from "./ChatBody.module.css";

const ChatBody = () => {
  const userContext = useContext(UserContext);
  const conversation = useContext(ConversationContext);
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    chatMessagesRef.current.scrollIntoView({ block: "end" });
  });

  return (
    <div
      className={`bg-[#F5F1EB] dark:bg-slate-900 relative overflow-auto flex-1 ${styles.backgroundImage}`}
    >
      <div className="px-13 pt-4 pb-20" ref={chatMessagesRef}>
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
      {/* <div
        className="bg-[url(/MHVytaGe3gh.png)] dark:bg-[url(/m5BEg2K4OR4.png)] w-full h-full opacity-13 dark:opacity-8 absolute top-0"
        ref={backgroundRef}
      ></div> */}
    </div>
  );
};

export default ChatBody;
