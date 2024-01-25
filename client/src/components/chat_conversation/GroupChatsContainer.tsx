interface MessageProps {
  id: string;
  senderId: string;
  text: string;
  files?: string[];
  timestamp: string;
  isCurrentUser?: boolean;
}

interface ConversationProps {
  id: string;
  participants: string[];
  messages: MessageProps[];
}

import { Avatar } from "@nextui-org/react";
import ImageCollageGrid from "~/components/image_views/ImageCollageGrid";

function OneToOneMessage(messagesData: MessageProps) {
  const formattedTime = new Date(messagesData.timestamp).toLocaleTimeString();
  return (
    <div className="w-full flex">
      {!messagesData.isCurrentUser && (
        <div className="w-1/12 h-auto">
          <Avatar
            size="sm"
            src="https://avatars.githubusercontent.com/u/4847084"
          />
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

const sampleConversation: ConversationProps = {
  id: "abc123def456ldkfopg23",
  participants: ["65a5340772cc30820980f27c", "65a533f772cc30820980f279"],
  messages: [
    {
      id: "ghi789jkl012",
      senderId: "65a5344772cc30820980f285",
      text: "Hi Jane, how's your day going?",
      timestamp: "2024-01-17T11:50:00.000Z",
      files: ["https://via.placeholder.com/200X100"],
    },
    {
      id: "mno345pqr67adadad8",
      senderId: "65a5344772cc30820980f285",
      text: "Hey John! It's been busy but productive. How about you?",
      timestamp: "2024-01-17T11:51:30.000Z",
      files: [
        "https://via.placeholder.com/500X400",
        "https://via.placeholder.com/500X400",
      ],
    },
    {
      id: "stu901vwx234a",
      senderId: "65a5340772cc30820980f27c",
      text: "Same here. Just finished a big project, so I'm feeling relieved. ",
      timestamp: "2024-01-17T11:52:15.000Z",
      files: [],
    },
    {
      id: "yz567abc8903123",
      senderId: "65a5344772cc30820980f285",
      text: "Congrats!  That's awesome. Any plans to celebrate?",
      timestamp: "2024-01-17T11:53:00.000Z",
      files: ["https://via.placeholder.com/500X400"],
    },
    {
      id: "def456jkl0122342424234",
      senderId: "65a5340772cc30820980f27c",
      text: "Hey Sarah, how's your coding session going?",
      timestamp: "2024-02-05T14:30:00.000Z",
      files: [
        "https://via.placeholder.com/500X400",
        "https://via.placeholder.com/500X400",
      ],
    },
    {
      id: "nop789qrs012",
      senderId: "65a5344772cc30820980f285",
      text: "Hi Mike! It's challenging, but I'm making progress. What about you?",
      timestamp: "2024-02-05T14:32:30.000Z",
    },
    {
      id: "vwx345yzu678",
      senderId: "65a5337772cc30820980f26d",
      text: "I just implemented a new feature. Feeling accomplished!",
      timestamp: "2024-02-05T14:35:15.000Z",
    },
    {
      id: "abc901ghi234",
      senderId: "65a5340772cc30820980f27c",
      text: "Great job! Want to grab a virtual coffee and discuss the code?",
      timestamp: "2024-02-05T14:38:00.000Z",
    },
    {
      id: "mno567pqr890",
      senderId: "65a5337772cc30820980f26d",
      text: "Just encountered a tricky bug. Need some fresh eyes on it!",
      timestamp: "2024-02-06T09:45:00.000Z",
    },
    {
      id: "stu901vwx234sdf",
      senderId: "65a5344772cc30820980f285",
      text: "I'm up for the challenge. Share the code, and let's debug together!",
      timestamp: "2024-02-06T09:46:30.000Z",
      files: ["https://via.placeholder.com/500X400"],
    },
    {
      id: "yz567abc890567",
      senderId: "65a5344772cc30820980f285",
      text: "Thanks! Sending the code snippet your way. Let's crack this!",
      timestamp: "2024-02-06T09:48:15.000Z",
    },
    {
      id: "def456jkl012234324",
      senderId: "65a5337772cc30820980f26d",
      text: "Found it! It was a sneaky typo. All good now!",
      timestamp: "2024-02-06T09:50:00.000Z",
    },
    {
      id: "ghi789jkl345",
      senderId: "65a5344772cc30820980f285",
      text: "I attended a tech meetup yesterday. Heard about some exciting frameworks!",
      timestamp: "2024-02-07T18:15:00.000Z",
    },
    {
      id: "mno345pqr678",
      senderId: "65a5337772cc30820980f26d",
      text: "That sounds interesting! Share the highlights. I might explore those frameworks too.",
      timestamp: "2024-02-07T18:17:30.000Z",
    },
    {
      id: "stu901vwx23sdfdfsf4",
      senderId: "65a5344772cc30820980f285",
      text: "Sure, I'll compile a list of key takeaways and send them your way.",
      timestamp: "2024-02-07T18:20:15.000Z",
    },
    {
      id: "yz567abc8903453",
      senderId: "65a5337772cc30820980f26d",
      text: "Thanks, looking forward to it! Always eager to explore new tech trends.",
      timestamp: "2024-02-07T18:22:00.000Z",
      files: [
        "https://via.placeholder.com/500X400",
        "https://via.placeholder.com/500X400",
        "https://via.placeholder.com/500X400",
      ],
    },
  ],
};

function GroupChatsContainer() {
  // ? Id form state
  const currentUserId = "65a5340772cc30820980f27c";

  return (
    <div className="w-full h-full">
      {sampleConversation.messages.map((message) => (
        <OneToOneMessage
          key={message.id}
          {...message}
          senderId={message.senderId}
          isCurrentUser={message.senderId === currentUserId}
        />
      ))}
    </div>
  );
}

export default GroupChatsContainer;
