import Conversation from "./Conversation";

const ConversationList = ({ conversations }) => {
  return (
    <>
      {conversations.length > 0 &&
        conversations.map((conversation) => (
          <Conversation
            key={conversation.id}
            conversation={conversation}
            userIds={conversation.userIds}
          ></Conversation>
        ))}
    </>
  );
};

export default ConversationList;
