import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../Context";
import Avatar from "../../Avatar";
import { UserMinus, UserRoundPlus, UserRoundX } from "lucide-react";
import styles from "./ContactInfo.module.css";
import api from "../../../api";

const ContactInfo = ({ currentContact }) => {
  const userContext = useContext(UserContext);
  const [requestStatus, setrequestStatus] = useState("");

  useEffect(() => {
    async function fetchInvitations() {
      const sendingInvitations = await api.getSentRequest(userContext.token);
      const receivingInvitations = await api.getReceivingInvitations(
        userContext.token
      );

      const hasSendingInvitation = sendingInvitations.filter((sent) => {
        if (
          sent.receiverId === currentContact.id &&
          sent.status === "pending"
        ) {
          return true;
        }
      });

      const hasReceivingInvitation = receivingInvitations.filter(
        (receivingInvitation) => {
          if (
            receivingInvitation.senderId === currentContact.id &&
            receivingInvitation.status === "pending"
          ) {
            return receivingInvitation;
          }
        }
      );

      if (hasSendingInvitation[0]) {
        setrequestStatus("pending");
      } else if (hasReceivingInvitation[0]) {
        setrequestStatus("reject");
      } else {
        setrequestStatus("");
      }
    }

    fetchInvitations();
  }, [currentContact.id]);

  async function handleSent() {
    await api.sendInvitation(currentContact.id, userContext.token);

    setrequestStatus("pending");
  }

  async function handleRevoke() {
    await api.revokeInvitation(currentContact.id, userContext.token);
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

          {/* Add friend */}
          <div className="mt-8 hover:cursor-pointer">
            {requestStatus === "pending" && (
              <div onClick={handleRevoke} className="flex gap-3 font-semibold">
                <UserMinus className={styles.icon} />
                <p className="text-green-500">Revoke invitation</p>
              </div>
            )}
            {requestStatus === "" && (
              <div onClick={handleSent} className="flex gap-3">
                <UserRoundPlus className={styles.icon} />
                <p className="text-green-500 font-semibold">Sent invitation</p>
              </div>
            )}
            {requestStatus === "reject" && (
              <div onClick={handleSent} className="flex gap-3">
                <UserRoundX className={styles.icon} />
                <p className="text-green-500 font-semibold">
                  Reject invitation
                </p>
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
