import { useAppSelector } from "~/utils/hooks/redux.hooks";

function PersonalChatsContainer({
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
    <div
      id="PersonalChatsContainer"
      className="w-full h-full transition-height"
    >
      <p className="text-sm text-default-500 text-center py-2">
        Chat Started on{" "}
        {chatStarted ? chatStarted : "Chat Started Date Not Found!"}
      </p>
      <div className="my-5">
          {messages.map((message, i) => (
            <OneToOneMessage
              key={i}
              id={message.id}
              senderId={message.senderId}
              text={message.text}
              timestamp={message.created}
              files={message.files}
              isCurrentUser={message.senderId === currentUserId}
            />
          ))}
      </div>
      <p className="text-sm text-default-500 text-center py-2">
        Last Chat on {chatUpdated ? chatUpdated : "Last Chat Date Not Found!"}
      </p>
    </div>
  );
}

interface MessageProps {
  id: string;
  senderId: string;
  text: string;
  files?: string[];
  timestamp: Date;
  isCurrentUser?: boolean;
}

import ImageCollageGrid from "~/components/image_views/ImageCollageGrid";

function OneToOneMessage(messagesData: MessageProps) {
  const formattedTime = new Date(messagesData.timestamp).toLocaleTimeString();

  return (
    <div
      className={`w-full h-auto my-1 grid ${
        messagesData.isCurrentUser ? "place-items-end " : "place-items-start "
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
  );
}

export default PersonalChatsContainer;