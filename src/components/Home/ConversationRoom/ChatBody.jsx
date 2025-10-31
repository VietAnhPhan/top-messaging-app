import MyMessage from "./MyMessage";
import OthersMessage from "./OthersMessage";
import { useContext, useEffect, useRef } from "react";
import { ConversationContext, UserContext } from "../../../Context";

const ChatBody = () => {
  const userContext = useContext(UserContext);
  const conversation = useContext(ConversationContext);
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    chatMessagesRef.current.scrollIntoView({ block: "end" });
  });

  return (
    <div
      className={`relative overflow-auto flex-1 z-10`}
    >
      <div className={`px-13 pt-4 pb-20`} ref={chatMessagesRef}>
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
    </div>
  );
};

export default ChatBody;
