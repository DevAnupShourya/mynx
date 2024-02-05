interface MessageProps {
  id: string;
  senderId: string;
  text: string;
  files?: string[];
  timestamp: string;
  isCurrentUser?: boolean;
}

import { Avatar } from "@nextui-org/react";
import { useEffect, useState } from "react";
import ImageCollageGrid from "~/components/image_views/ImageCollageGrid";
import { getUserByUID } from "~/services/Users/User.services";

import { useAppSelector } from "~/utils/hooks/redux.hooks";

import Toast from "../custom_toast/Toast";
import { Link } from "react-router-dom";

function GroupChatMessagesContainer({
  chatStarted,
  chatUpdated,
  messages,
}: {
  chatStarted: string;
  chatUpdated: string;
  messages: {
    id: string;
    created: Date;
    updated: Date;
    files: string[];
    senderId: string;
    text: string;
  }[];
}) {
  const { userId: currentUserId } = useAppSelector((state) => state.user);

  return (
    <div className="w-full h-full">
      <p className="text-sm text-default-500 text-center py-2">
        Chat Started on{" "}
        {chatStarted ? chatStarted : "Chat Started Date Not Found!"}
      </p>

      {messages.map((message) => (
        <OneToOneMessage
          key={message.id}
          id={message.id}
          text={message.text}
          timestamp={new Date(message.created).toString()}
          files={message.files || []}
          senderId={message.senderId}
          isCurrentUser={message.senderId === currentUserId}
        />
      ))}

      <p className="text-sm text-default-500 text-center py-2">
        Last Chat on {chatUpdated ? chatUpdated : "Last Chat Date Not Found!"}
      </p>
    </div>
  );
}

function OneToOneMessage(messagesData: MessageProps) {
  const formattedTime = new Date(messagesData.timestamp).toLocaleTimeString();
  
  const [senderDetails, setSenderDetails] = useState({
    name: "",
    username: "",
    imageUrl: "",
  });

  const getSenderDetails = async () => {
    try {
      const senderData = await getUserByUID(messagesData.senderId);
      setSenderDetails({
        imageUrl: senderData.user.avatarURL,
        username: senderData.user.username,
        name: senderData.user.name,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      Toast.error(error.response.data.message);
      console.error(`@getChatDetails : ${error.response.data.message}`);
    }
  };

  useEffect(() => {
    getSenderDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full flex">
      {!messagesData.isCurrentUser && (
        <div className="w-1/12 h-auto">
          <Link to={`/${senderDetails.username}`}>
            <Avatar
              size="sm"
              src={senderDetails.imageUrl}
              name={senderDetails.name}
              isBordered
            />
          </Link>
        </div>
      )}
      <div
        className={`h-auto my-1 grid ${
          messagesData.isCurrentUser
            ? "place-items-end w-full"
            : "place-items-start  w-11/12 "
        }`}
      >
        <div
          aria-label="Chat Arrow"
          className={`w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent relative top-3 ${
            messagesData.isCurrentUser
              ? "border-l-[20px] border-l-default-100 left-2 -rotate-45"
              : "border-r-[20px] border-r-default-200 -left-2 rotate-45"
          }`}
        />
        <div
          aria-label="Chat Content Container"
          className={`w-11/12 p-2 rounded-md  ${
            messagesData.isCurrentUser ? "bg-default-100" : "bg-default-200"
          }`}
        >
          <p
            aria-label="Chat Texts"
            className={`text-base ${
              messagesData.isCurrentUser ? "text-end" : "text-start"
            }`}
          >
            {messagesData.text}
          </p>
          <div aria-label="Chat Images" className="py-2">
            {messagesData.files && messagesData.files.length > 1 && (
              <ImageCollageGrid images={messagesData.files} />
            )}
          </div>
          <h3
            aria-label="Chat Time"
            className={`text-xs text-default-400 ${
              messagesData.isCurrentUser ? "text-start" : "text-end"
            }`}
          >
            {formattedTime}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default GroupChatMessagesContainer;
