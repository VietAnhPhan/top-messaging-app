import styles from "./Message.module.css";

const MyMessage = ({ message }) => {
  const sentAt = new Date(message.createdAt);
  const sentAtHour = sentAt.getHours() + ":" + sentAt.getMinutes();

  return (
    <div
      className={`flex justify-end bg-[#DBF8C6] justify-self-end py-3 px-2 z-10 relative my-5 ${styles.myMessage}`}
    >
      <span aria-hidden="true" data-icon="tail-out" className={styles.myMessageTail}><svg viewBox="0 0 8 13" height="13" width="8" preserveAspectRatio="xMidYMid meet" className="" version="1.1" x="0px" y="0px" enableBackground="new 0 0 8 13"><title>tail-out</title><path opacity="0.13" d="M5.188,1H0v11.193l6.467-8.625 C7.526,2.156,6.958,1,5.188,1z"></path><path fill="currentColor" d="M5.188,0H0v11.193l6.467-8.625C7.526,1.156,6.958,0,5.188,0z"></path></svg></span>
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

export default MyMessage;
