import styles from "./Message.module.css";

const OthersMessage = ({ message }) => {
  const sentAt = new Date(message.createdAt);
  const sentAtHour = sentAt.getHours() + ":" + sentAt.getMinutes();
  return (
    <div
      className={`flex bg-white justify-self-start z-10 relative ${styles.otherMessage}`}
    >
      <span
        aria-hidden="true"
        data-icon="tail-in"
        className={styles.otherMessageTail}
      >
        <svg
          viewBox="0 0 8 13"
          height="13"
          width="8"
          preserveAspectRatio="xMidYMid meet"
          className=""
          version="1.1"
          x="0px"
          y="0px"
          enableBackground="new 0 0 8 13"
        >
          <title>tail-in</title>
          <path
            opacity="0.13"
            fill="#0000000"
            d="M1.533,3.568L8,12.193V1H2.812 C1.042,1,0.474,2.156,1.533,3.568z"
          ></path>
          <path
            fill="currentColor"
            d="M1.533,2.568L8,11.193V0L2.812,0C1.042,0,0.474,1.156,1.533,2.568z"
          ></path>
        </svg>
      </span>
      <div className="flex gap-x-10">
        <span>{message.message}</span>
        {message.Media && message.Media.length > 0 && (
          <img
            className="w-52"
            src={`https://bkudoqbqykfhbgcxfelw.supabase.co/storage/v1/object/public/${message.Media[0].filePath}`}
          />
        )}
        <span
          className={`text-sm flex items-end text-[#7C7C7C] ${styles.timeSentMessage}`}
        >
          {sentAtHour}
        </span>
      </div>
    </div>
  );
};

export default OthersMessage;
