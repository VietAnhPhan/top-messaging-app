import Conversation from "./Conversation";

const ConversationList = ({ conversations, handleSelect }) => {
  return (
    <>
      {conversations.length > 0 &&
        conversations.map((conversation, index) => (
          <Conversation
            key={conversation.id}
            conversation={conversation}
            handleSelect={() => handleSelect(index)}
          ></Conversation>
        ))}
    </>
  );
};

export default ConversationList;
