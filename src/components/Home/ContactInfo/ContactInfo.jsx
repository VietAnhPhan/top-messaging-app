import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../Context";
import Avatar from "../../Avatar";
import {
  UserMinus,
  UserRoundPlus,
  UserRoundX,
  UserRoundCheck,
  UserRoundMinus,
} from "lucide-react";
import styles from "./ContactInfo.module.css";
import api from "../../../api";

const ContactInfo = ({ currentContact }) => {
  const userContext = useContext(UserContext);
  const [requestStatus, setrequestStatus] = useState("");
  const [friendRequest, setFriendRequest] = useState(null);

  useEffect(() => {
    async function fetchInvitations() {
      // const sendingInvitations = await api.getSentRequest(userContext.token);
      // const receivingInvitations = await api.getReceivingInvitations(
      //   userContext.token
      // );

      // const hasSendingInvitation = sendingInvitations.filter((sent) => {
      //   if (
      //     sent.receiverId === currentContact.id &&
      //     sent.status === "pending"
      //   ) {
      //     return true;
      //   }
      // });

      // const hasReceivingInvitation = receivingInvitations.filter(
      //   (receivingInvitation) => {
      //     if (
      //       receivingInvitation.senderId === currentContact.id &&
      //       receivingInvitation.status === "pending"
      //     ) {
      //       return true;
      //     }
      //   }
      // );
      // console.log(hasReceivingInvitation);
      // if (active) {
      //   if (hasSendingInvitation.length > 0) {
      //     setrequestStatus("pending");
      //     setFriendRequest(hasSendingInvitation[0]);
      //   } else if (hasReceivingInvitation.length > 0) {
      //     setrequestStatus("reject");
      //     setFriendRequest(hasReceivingInvitation[0]);
      //   } else {
      //     setrequestStatus("");
      //   }
      // }

      if (active) {
        const invitation = await api.getInvitation(
          currentContact.id,
          userContext.token
        );

        if (invitation && invitation.status === "pending") {
          setrequestStatus("pending");
        }

        if (
          (invitation && invitation.status === "cancel") ||
          (invitation && invitation.status === "rejected") ||
          !invitation
        ) {
          setrequestStatus("");
        }

        setFriendRequest(invitation);
      }
    }
    let active = true;
    fetchInvitations();
    return () => {
      active = false;
    };
  }, [currentContact.id]);

  async function handleSent() {
    await api.sendInvitation(currentContact.id, userContext.token);
    const invitation = await api.getInvitation(
      currentContact.id,
      userContext.token
    );
    setrequestStatus("pending");
    setFriendRequest(invitation);
  }

  async function handleRevoke() {
    await api.revokeInvitation(friendRequest.id, userContext.token);
    setrequestStatus("");
  }

  async function handleAccept() {
    setrequestStatus("accepted");
  }

  async function handleReject() {
    await api.rejectInvitation(friendRequest.id, userContext.token);
    setrequestStatus("");
  }

  return (
    <div className="border-l-[1px] border-l-zinc-300 dark:border-l-slate-700 py-4 px-6 gap-x-4 dark:bg-slate-900">
      <p className="dark:text-gray-50">Contact info</p>
      <div className="flex justify-center mt-10">
        <div className="flex flex-col items-center">
          <Avatar user={currentContact} type={"infoFrame"}></Avatar>

          <p className="dark:text-gray-50">
            {currentContact ? currentContact.name : ""}
          </p>
          <p className="dark:text-gray-50">
            @{currentContact ? currentContact.username : ""}
          </p>

          {/* Display invitation request */}
          <div className="mt-8 hover:cursor-pointer">
            {requestStatus === "pending" &&
              friendRequest &&
              friendRequest.senderId === userContext.id && (
                <div
                  onClick={handleRevoke}
                  className="flex gap-x-3 font-semibold"
                >
                  <UserRoundMinus className={styles.icon} />
                  <p className="text-green-500">Revoke invitation</p>
                </div>
              )}

            {requestStatus === "pending" &&
              friendRequest &&
              friendRequest.receiverId === userContext.id && (
                <div className="flex gap-x-3">
                  <div
                    onClick={handleAccept}
                    className="flex gap-3 font-semibold"
                  >
                    <UserRoundCheck className={styles.icon} />
                    <p className="text-green-500">Accept invitation</p>
                  </div>
                  <div onClick={handleReject} className="flex gap-3">
                    <UserRoundX className={styles.icon} />
                    <p className="text-green-500 font-semibold">
                      Reject invitation
                    </p>
                  </div>
                </div>
              )}

            {requestStatus === "" && (
              <div onClick={handleSent} className="flex gap-3">
                <UserRoundPlus className={styles.icon} />
                <p className="text-green-500 font-semibold">Sent invitation</p>
              </div>
            )}

            {requestStatus === "accepted" && (
              <div className="flex gap-x-3">
                <div
                  onClick={handleAccept}
                  className="flex gap-3 font-semibold"
                >
                  <UserRoundX className={styles.icon} />
                  <p className="text-green-500">Unfriend</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <p className="dark:text-gray-400">About</p>
      <p className="dark:text-gray-50">
        {currentContact && currentContact.about}
      </p>

      <p className="dark:text-gray-400 mt-4">Email</p>
      <p className="dark:text-gray-50">
        {currentContact && currentContact.email}
      </p>
      <p className="dark:text-gray-400 mt-4">Phone number</p>
      <p className="dark:text-gray-50">
        {currentContact && currentContact.phone}
      </p>
    </div>
  );
};

export default ContactInfo;
