import ChatInput from "./ChatInput";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";

const ChatWindow = ({ chatUser, controls }) => {
  return (
    <>
      <ChatHeader chatUser={chatUser} controls={controls}></ChatHeader>
      <ChatBody></ChatBody>
      <ChatInput></ChatInput>
    </>
  );
};

export default ChatWindow;
