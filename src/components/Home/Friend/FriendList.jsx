import styles from "../../../Button.module.css";
import Avatar from "../../Avatar";

const FriendList = ({ friends }) => {
  return (
    <>
      <p className="dark:text-gray-50 mt-3">Friends</p>
      {friends.length > 0 && (
        <ul className="flex flex-col gap-y-4">
          {friends.map((friend) => (
            <li className="dark:text-gray-50 flex items-center" key={friend.id}>
              <div className="flex flex-1 items-center gap-x-4">
                <Avatar user={friend} type={"chatFrame"}></Avatar>
                <span>{friend.name}</span>
              </div>

              <button className={styles.rejectButton}>Unfriend</button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default FriendList;
