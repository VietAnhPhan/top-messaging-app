const ContactList = ({ contacts, handleSelect }) => {
  return (
    <>
      {contacts.map((contact) => {
        return (
          <div
            onClick={() => handleSelect(contact.name)}
            key={contact.id}
            className="hover:bg-[#EDEDED]"
          >
            <p>{contact.username}</p>
            <p className="font-medium">{contact.name}</p>
          </div>
        );
      })}
    </>
  );
};

export default ContactList;
