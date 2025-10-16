import { useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router";
import MyMessage from "./ConversationRoom/MyMessage";
import OthersMessage from "./ConversationRoom/OthersMessage";
import ConversationList from "./ConversationList/ConversationList";
import ContactList from "./ContactList/ContactList";
import ContactInfo from "./ContactInfo/ContactInfo";
import { UserContext } from "../../Context";
import ChatInput from "./ConversationRoom/ChatInput";

function Home(props) {
  const loaderData = useLoaderData();

  const [contacts, setContacts] = useState([]);
  const [isOpenContactInfo, setIsOpenContactInfo] = useState(false);
  const [currentConversation, setCurrentConversation] = useState(
    loaderData.currentConversation
  );

  const [currentName, setCurrentName] = useState(
    loaderData.currentConversation.ChatMember[0].user.name
  );

  const [isChatWindow, setIsChatWindow] = useState(false);
  const [isConversationList, setIsConversationList] = useState(true);

  const containerRef = useRef(null);

  useEffect(() => {
    if (window.innerWidth >= 768 && (!isChatWindow || !isConversationList)) {
      setIsChatWindow(true);
      setIsConversationList(true);
    }

    window.onresize = () => {
      if (window.innerWidth >= 768 && (!isChatWindow || !isConversationList)) {
        setIsChatWindow(true);
        setIsConversationList(true);
      } else if (window.innerWidth < 768) {
        setIsConversationList(true);
        setIsChatWindow(false);
      }
    };
  }, []);

  function handleSelectContact(name) {
    setCurrentName(name);
  }

  function handleCurrentConversation(current) {
    setCurrentConversation(current.conversation);
    setCurrentName(current.friend.name);
  }

  function handleSentMessage(current) {
    setCurrentConversation(current);
  }

  function handleOpenContactInfo() {
    if (!isOpenContactInfo) setIsOpenContactInfo(true);
    else setIsOpenContactInfo(false);
  }

  async function handleSearch(e) {
    if (e.target.value == "") {
      setContacts([]);
      return;
    }
    const rs = await fetch(
      `http://localhost:3000/users?username=${e.target.value}&search=true`,
      {
        method: "GET",
        headers: { Authorization: `bearer ${loaderData.token}` },
      }
    );

    const contacts = await rs.json();
    setContacts(contacts);
  }

  function handleBacktoConversation() {
    setIsConversationList(true);
    setIsChatWindow(false);
  }

  return (
    <UserContext
      value={{
        loaderData,
        handleCurrentConversation,
        handleSentMessage,
        screen: {
          isChatWindow,
          setIsChatWindow,
          isConversationList,
          setIsConversationList,
        },
      }}
    >
      <div
        className="grid grid-cols-1 md:grid-cols-[25%_50%_25%] h-full flex-1"
        ref={containerRef}
      >
        <title>{`Homepage | ${props.sitename}`}</title>
        {/* Column 1*/}
        {isConversationList && (
          <div className="md:col-span-1 border-l-[1px] border-[#DADADA] md:flex flex-col overflow-auto">
            {/* Profile header*/}
            <div className="px-4">
              <img src="/logo-1024x200.png" alt="" className="w-52 pt-3 pb-4" />
              <input
                type="text"
                className="w-full col-span-1 p-2 border-0 bg-[#EDEDED] rounded-2xl mb-4"
                placeholder="Search contacts..."
                // value={searchContact}
                onChange={handleSearch}
              />
            </div>
            {/* Contact list*/}
            <div className="border-0 border-[#DADADA] overflow-y-scroll">
              {contacts.length > 0 ? (
                <ContactList
                  contacts={contacts}
                  handleSelect={handleSelectContact}
                ></ContactList>
              ) : (
                <ConversationList
                  conversations={loaderData.conversations}
                ></ConversationList>
              )}
            </div>
          </div>
        )}

        {/* Column 2*/}
        {isChatWindow && (
          <div
            className={`${
              isOpenContactInfo ? "col-span-1" : "col-span-2"
            } row-span-1 border-l-[1px] border-[#DADADA] bg-[#EDEDED] flex flex-col overflow-auto`}
          >
            {/* Current friend */}
            <div className="flex">
              <button onClick={handleBacktoConversation}>
                <svg
                  className="md:hidden w-6 h-6 text-gray-800"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 12h14M5 12l4-4m-4 4 4 4"
                  />
                </svg>
              </button>
              <div
                className="flex items-center px-2 py-3"
                onClick={handleOpenContactInfo}
              >
                <div className="hover:cursor-pointer flex items-center gap-x-3">
                  <svg
                    className="w-[48px] h-[48px] text-gray-800 hover:cursor-pointer"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p>{currentName}</p>
                </div>
              </div>
            </div>
            {/* Chat window */}
            <div className="border-0 border-[#DADADA] bg-[#DDDBD1] relative overflow-y-scroll flex-1">
              <div className="px-13">
                {currentConversation.messages.length > 0 &&
                  currentConversation.messages.map((message) => {
                    if (message.userId === loaderData.id) {
                      return (
                        <MyMessage
                          key={message.id}
                          message={message}
                        ></MyMessage>
                      );
                    } else
                      return (
                        <OthersMessage
                          key={message.id}
                          message={message}
                        ></OthersMessage>
                      );
                  })}
              </div>
              <div className="bg-[url(/bg-chat-room.png)] w-full h-full opacity-5 absolute top-0"></div>
            </div>
            {/* Chat input */}
            <div className="border-0 border-[#DADADA] bg-[#EDEDED] flex py-4 px-6 gap-x-4">
              <ChatInput></ChatInput>
            </div>
          </div>
        )}

        {/* Column 3 */}
        {isOpenContactInfo && (
          <div className="border-[1px] border-[#DADADA] bg-[#EDEDED] py-4 px-6 gap-x-4">
            <ContactInfo currentName={currentName}></ContactInfo>
          </div>
        )}
      </div>
    </UserContext>
  );
}

export default Home;
