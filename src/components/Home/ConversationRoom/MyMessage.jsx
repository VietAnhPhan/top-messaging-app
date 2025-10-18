const MyMessage = ({ message }) => {
  const sentAt = new Date(message.createdAt);
  const sentAtHour = sentAt.getHours() + ":" + sentAt.getMinutes();

  return (
    <div className="flex justify-end bg-[#DBF8C6] justify-self-end py-3 px-2 z-10 relative">
      <div className="flex gap-x-10">
        <span>{message.message}</span>
        {message.Media.length > 0 && (
          <img
            className="w-52"
            src={`https://bkudoqbqykfhbgcxfelw.supabase.co/storage/v1/object/public/${message.Media[0].filePath}`}
          />
        )}
        <span className="text-sm flex items-end text-[#7C7C7C]">
          {sentAtHour}
        </span>
      </div>
    </div>
  );
};

export default MyMessage;
