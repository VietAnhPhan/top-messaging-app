import { useState } from "react";

const conversations = [
  {
    id: 1,
    name: "John Smith",
    last_message: "Hey, are you coming today?",
    last_sent_at: "08:21",
  },
  {
    id: 2,
    name: "Jane Doe",
    last_message: "See you soon!",
    last_sent_at: "09:45",
  },
  {
    id: 3,
    name: "Bob Johnson",
    last_message: "Got the files, thanks!",
    last_sent_at: "10:12",
  },
  {
    id: 4,
    name: "Samantha Lee",
    last_message: "Let’s meet tomorrow.",
    last_sent_at: "11:30",
  },
  {
    id: 5,
    name: "William Chen",
    last_message: "App looks amazing!",
    last_sent_at: "12:15",
  },
  {
    id: 6,
    name: "Emily Kim",
    last_message: "Are you free tonight?",
    last_sent_at: "13:05",
  },
  {
    id: 7,
    name: "Michael Brown",
    last_message: "I'll send it later.",
    last_sent_at: "13:47",
  },
  {
    id: 8,
    name: "Sophia Davis",
    last_message: "Sure, no problem!",
    last_sent_at: "14:22",
  },
  {
    id: 9,
    name: "David Wilson",
    last_message: "Almost done here.",
    last_sent_at: "15:03",
  },
  {
    id: 10,
    name: "Olivia Martinez",
    last_message: "That’s awesome!",
    last_sent_at: "15:44",
  },
  {
    id: 11,
    name: "James Anderson",
    last_message: "When do we start?",
    last_sent_at: "16:10",
  },
  {
    id: 12,
    name: "Ava Thomas",
    last_message: "Thanks for your help!",
    last_sent_at: "16:55",
  },
  {
    id: 13,
    name: "Daniel Garcia",
    last_message: "Got your message.",
    last_sent_at: "17:12",
  },
  {
    id: 14,
    name: "Mia Robinson",
    last_message: "Can't wait to try it.",
    last_sent_at: "17:50",
  },
  {
    id: 15,
    name: "Ethan Lewis",
    last_message: "I'll check and reply.",
    last_sent_at: "18:05",
  },
  {
    id: 16,
    name: "Charlotte Walker",
    last_message: "Good night!",
    last_sent_at: "19:21",
  },
  {
    id: 17,
    name: "Liam Hall",
    last_message: "See you at the meeting.",
    last_sent_at: "20:03",
  },
  {
    id: 18,
    name: "Isabella Young",
    last_message: "Let’s catch up soon.",
    last_sent_at: "20:47",
  },
  {
    id: 19,
    name: "Noah King",
    last_message: "That was really fun!",
    last_sent_at: "21:35",
  },
  {
    id: 20,
    name: "Amelia Scott",
    last_message: "Talk later!",
    last_sent_at: "22:10",
  },
];

const messages = [
  {
    id: 1,
    message: "Hey, did you finish the report?",
    userId: 1,
    conversationId: 1,
    timestamp: "08:30",
  },
  {
    id: 2,
    message: "Not yet, I’m adding the last section now.",
    userId: 2,
    conversationId: 1,
    timestamp: "08:32",
  },
  {
    id: 3,
    message: "Alright, make sure to include the sales data from last quarter.",
    userId: 1,
    conversationId: 1,
    timestamp: "08:33",
  },
  {
    id: 4,
    message: "Got it. Do you have the updated figures?",
    userId: 2,
    conversationId: 1,
    timestamp: "08:35",
  },
  {
    id: 5,
    message: "Yes, I’ll send them over in a minute.",
    userId: 1,
    conversationId: 1,
    timestamp: "08:36",
  },
  {
    id: 6,
    message: "Thanks! That’ll help a lot.",
    userId: 2,
    conversationId: 1,
    timestamp: "08:37",
  },
  {
    id: 7,
    message:
      "No problem. Also, double-check the charts — one of them looked off.",
    userId: 1,
    conversationId: 1,
    timestamp: "08:39",
  },
  {
    id: 8,
    message: "Really? I’ll review them right after this.",
    userId: 2,
    conversationId: 1,
    timestamp: "08:40",
  },
  {
    id: 9,
    message: "Cool. Let me know when you’re done so we can finalize.",
    userId: 1,
    conversationId: 1,
    timestamp: "08:42",
  },
  {
    id: 10,
    message: "Will do! Should be ready in 30 minutes.",
    userId: 2,
    conversationId: 1,
    timestamp: "08:43",
  },
  {
    id: 11,
    message: "Perfect. I’ll be around if you need me.",
    userId: 1,
    conversationId: 1,
    timestamp: "08:44",
  },
  {
    id: 12,
    message:
      "Actually, can you recheck the summary too? I think it’s too long.",
    userId: 2,
    conversationId: 1,
    timestamp: "08:46",
  },
  {
    id: 13,
    message: "Sure thing. I’ll shorten it a bit and make it more concise.",
    userId: 1,
    conversationId: 1,
    timestamp: "08:47",
  },
  {
    id: 14,
    message:
      "Thanks! Also, are we including the new product launch in this report?",
    userId: 2,
    conversationId: 1,
    timestamp: "08:49",
  },
  {
    id: 15,
    message: "Yes, under the upcoming projects section.",
    userId: 1,
    conversationId: 1,
    timestamp: "08:50",
  },
  {
    id: 16,
    message: "Nice. That should make it more complete.",
    userId: 2,
    conversationId: 1,
    timestamp: "08:51",
  },
  {
    id: 17,
    message: "Alright, I’ve sent you the updated charts now.",
    userId: 1,
    conversationId: 1,
    timestamp: "08:53",
  },
  {
    id: 18,
    message: "Got them. Everything looks good so far.",
    userId: 2,
    conversationId: 1,
    timestamp: "08:54",
  },
  {
    id: 19,
    message: "Great. Let’s wrap it up and send it before 9:00.",
    userId: 1,
    conversationId: 1,
    timestamp: "08:56",
  },
  {
    id: 20,
    message: "Agreed. Sending it in 5 minutes!",
    userId: 2,
    conversationId: 1,
    timestamp: "08:57",
  },
];

const myAccount = {
  id: 2,
  name: "Adam Phan",
};

function Home(props) {
  const [currentName, setCurrentName] = useState(conversations[0].name);
  const [currentConversation, setCurrentConversation] = useState(messages);
  function handleSelect(chatId) {
    setCurrentName(conversations[chatId].name);
    // setCurrentConversation(messages[chatId]);
  }

  return (
    <div className="grid grid-cols-3 h-full">
      <title>{`Homepage | ${props.sitename}`}</title>

      {/* Profile header */}
      <div className="col-span-1 border-[1px] border-[#DADADA] bg-[#EDEDED] py-4">
        <svg
          className="w-[48px] h-[48px] text-gray-800"
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
      </div>

      {/* Current chat header */}
      <div className="col-span-2 border-[1px] border-[#DADADA] bg-[#EDEDED] py-4">
        <div className="flex items-center gap-x-2">
          <svg
            className="w-[48px] h-[48px] text-gray-800"
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

      {/* Search contact */}
      <div className="px-3 py-2">
        <input
          type="text"
          className="w-full col-span-1 p-2 border-0 bg-[#EDEDED] rounded-2xl"
          placeholder="Search contacts..."
        />
      </div>

      {/* Chat list */}
      <div className="col-start-1 col-span-1 row-span-2 border-[1px] border-[#DADADA] overflow-y-scroll">
        {conversations.length > 0 &&
          conversations.map((chat) => (
            <div
              key={chat.id}
              className="flex justify-between p-4 hover:bg-[#EDEDED]"
              onClick={() => handleSelect(chat.id)}
            >
              <div className="flex justify-between gap-x-2">
                <svg
                  className="w-[48px] h-[48px] text-gray-800"
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

                <div>
                  <p className="text-2xl font-medium">{chat.name}</p>
                  <p>{chat.last_message}</p>
                </div>
              </div>
              <p>{chat.last_sent_at}</p>
            </div>
          ))}
      </div>

      {/* Chat window */}
      <div className="col-span-2 col-start-2 row-span-2 row-start-2 border-[1px] border-[#DADADA] bg-[#DDDBD1] relative overflow-y-scroll">
        <div className="px-13">
          {currentConversation.length > 0 &&
            currentConversation.map((message) => {
              if (message.userId === myAccount.id) {
                return (
                  <div
                    key={message.id}
                    className="flex justify-end bg-[#DBF8C6] justify-self-end py-3 px-2 z-10 relative"
                  >
                    <div className="flex gap-x-10">
                      <span>{message.message}</span>
                      <span className="text-sm flex items-end text-[#7C7C7C]">
                        {message.timestamp}
                      </span>
                    </div>
                  </div>
                );
              } else
                return (
                  <div
                    key={message.id}
                    className="flex bg-white justify-self-start py-3 px-2 z-10 relative"
                  >
                    <div className="flex gap-x-10">
                      <span>{message.message}</span>
                      <span className="text-sm flex items-end text-[#7C7C7C]">
                        {message.timestamp}
                      </span>
                    </div>
                  </div>
                );
            })}
        </div>

        <div className="bg-[url(/bg-chat-room.png)] w-full h-full opacity-5 absolute top-0"></div>
      </div>

      {/* Chat input */}
      <div className="col-span-2 col-start-2 border-[1px] border-[#DADADA] bg-[#EDEDED] flex py-4 px-6 gap-x-4">
        <input
          type="text"
          placeholder="Type message here..."
          className="w-full p-3 border-0 bg-white rounded-2xl"
        />
        <button>
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
      </div>
    </div>
  );
}

export default Home;
