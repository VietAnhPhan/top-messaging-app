import { useContext, useState } from "react";
import { UserContext } from "../../../Context";

const ChatInput = () => {
  const userContext = useContext(UserContext);
  const [message, setMessage] = useState("");
  const currentConversation = { ...userContext.loaderData.currentConversation };

  function handleClick() {
    const lastMessage = {
      conversationId: currentConversation.id,
      message: message,
      createdAt: new Date().toString(),
      userId: userContext.loaderData.id,
      id: 3,
    };
    const updatedMessages = [
      ...userContext.loaderData.currentConversation.messages,
      lastMessage,
    ];
    currentConversation.messages = updatedMessages;
    userContext.handleSentMessage(currentConversation);
  }

  return (
    <>
      <input
        type="text"
        placeholder="Type message here..."
        className="w-full p-3 border-0 bg-white rounded-2xl"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleClick}>
        <svg
          className="w-6 h-6 text-gray-800 rotate-90"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M12 2a1 1 0 0 1 .932.638l7 18a1 1 0 0 1-1.326 1.281L13 19.517V13a1 1 0 1 0-2 0v6.517l-5.606 2.402a1 1 0 0 1-1.326-1.281l7-18A1 1 0 0 1 12 2Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </>
  );
};

export default ChatInput;
