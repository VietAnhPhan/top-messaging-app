import ChatInput from "./ChatInput";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import styles from "./ChatBody.module.css";

const ChatWindow = ({ chatUser, controls }) => {
  return (
    <>
      <ChatHeader chatUser={chatUser} controls={controls}></ChatHeader>
      <div
        // className="bg-[url(/MHVytaGe3gh.png)] dark:bg-[url(/m5BEg2K4OR4.png)] w-full h-full opacity-13 dark:opacity-8 absolute top-0"
        className={styles.backgroundImage}
      ></div>
      <div className="bg-[#F5F1EB] dark:bg-slate-900 "></div>
      <ChatBody></ChatBody>
      <ChatInput></ChatInput>
    </>
  );
};

export default ChatWindow;
