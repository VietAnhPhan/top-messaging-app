import { useContext } from "react";
import { UserContext } from "../../../Context";

const ContactSearchList = ({ contacts }) => {
  const userContext = useContext(UserContext);

  async function handleSelect(contact) {
    const rs = await fetch(
      `http://localhost:3000/conversations?userIds=${userContext.id},${contact.id}`,
      {
        method: "GET",
        headers: {
          Authorization: `bearer ${userContext.token}`,
        },
      }
    );

    const currentConversation = await rs.json();

    userContext.handleSelectUser(contact, currentConversation);

    if (
      !userContext.screen.isChatWindow ||
      !userContext.screen.isConversationList
    ) {
      userContext.screen.setIsChatWindow(true);
      userContext.screen.setIsConversationList(false);
    }
  }

  return (
    <>
      {contacts.map((contact) => {
        return (
          <div
            onClick={() => handleSelect(contact)}
            key={contact.id}
            className="p-4 hover:bg-slate-800"
          >
            <p className="text-base font-medium dark:text-slate-50">
              {contact.username}
            </p>
            <p className="text-sm dark:text-zinc-400 font-medium">
              {contact.name}
            </p>
          </div>
        );
      })}
    </>
  );
};

export default ContactSearchList;
