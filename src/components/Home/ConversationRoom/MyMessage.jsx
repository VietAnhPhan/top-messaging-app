const MyMessage = ({ message }) => {
  return (
    <div className="flex justify-end bg-[#DBF8C6] justify-self-end py-3 px-2 z-10 relative">
      <div className="flex gap-x-10">
        <span>{message.message}</span>
        <span className="text-sm flex items-end text-[#7C7C7C]">
          {new Date(message.createdAt).toString()}
        </span>
      </div>
    </div>
  );
};

export default MyMessage;
