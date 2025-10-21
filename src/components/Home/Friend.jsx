import { useLoaderData } from "react-router";

const Friend = () => {
  const friendsLoader = useLoaderData();
  console.log(friendsLoader);

  return (
    <>
      <div>
          <p className="dark:text-gray-50">Sent requests</p>
          {friendsLoader.sentRequests.length > 0 && (
            <ul>
              {friendsLoader.sentRequests.map((sentRequest) => (
                <li className="dark:text-gray-50" key={sentRequest.id}>
                  {sentRequest.receiver.name}
                </li>
              ))}
            </ul>
          )}
      </div>
    </>
  );
};

export default Friend;
