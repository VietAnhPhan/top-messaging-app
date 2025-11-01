import { useLoaderData } from "react-router";
import SentFriendRequest from "./SentFriendRequest";
import FriendList from "./FriendList";
import ReceivingFriendRequest from "./receivingFriendRequest";
import { useContext, useEffect } from "react";
import { HeaderContext } from "../../../Context";

const Friend = (props) => {
  const dataLoader = useLoaderData();

  const headerContext = useContext(HeaderContext);

  useEffect(() => {
    headerContext.setactiveMenuItem("friends");
  });

  return (
    <>
      <title>{`Friends | ${props.sitename}`}</title>
      <div className="flex flex-col gap-y-7">
        <SentFriendRequest
          sentRequests={dataLoader.sentRequests}
        ></SentFriendRequest>
        <ReceivingFriendRequest
          receivingRequests={dataLoader.receivingRequests}
        ></ReceivingFriendRequest>
        <FriendList friends={dataLoader.friendList}></FriendList>
      </div>
    </>
  );
};

export default Friend;
