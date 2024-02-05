import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarGroup } from "@nextui-org/react";

import Toast from "~/components/custom_toast/Toast";


import Loading from "~/components/loading_error_pages/Loading";

import { getUserByUID } from "~/services/Users/User.services";
import { getMessageById, getGroupChat } from "~/services/Chats/Chats.services";

function ChatProfilePreview({
  lasMessageId,
  chatId,
  chattingWithUserId,
  lastChatDate,
  isGroup,
  members,
}: {
  lasMessageId: string;
  chatId?: string;
  chattingWithUserId?: string;
  lastChatDate: string;
  isGroup: boolean;
  members?: string[];
}) {
  

  const [isLoading, setIsLoading] = useState(true);
  const [chatDetails, setChatDetails] = useState({
    image: "",
    name: "",
    lastMessage: "",
  });
  const [membersAvatarUrl, setMembersAvatarUrl] = useState<string[]>([]);

  const handleGettingChatDetails = async () => {
    try {
      if (isGroup) {
        const groupData = await getGroupChat(chatId!);
        const messageData = await getMessageById(lasMessageId);
        setChatDetails({
          lastMessage: messageData.text,
          image: groupData.groupImage,
          name: groupData.groupName,
        });
      } else {
        const userData = await getUserByUID(chattingWithUserId!);
        const messageData = await getMessageById(lasMessageId);
        setChatDetails({
          image: userData.user.avatarURL,
          name: userData.user.name,
          lastMessage: messageData.text,
        });
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      Toast.error(error.response.data.message);
      console.error(
        "@handleGettingChatDetails : ",
        error.response.data.message
      );
    }
    setIsLoading(false);
  };

  const handleGetMembersAvatar = async () => {
    try {
      if (isGroup) {
        const avatarPromises = members?.map(async (memberId) => {
          const member = await getUserByUID(memberId);
          return member.user.avatarURL;
        });

        if (avatarPromises) {
          const memberAvatars = await Promise.all(avatarPromises);
          setMembersAvatarUrl((prev) => [...prev, ...memberAvatars]);
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      Toast.error(error.response.data.message);
      console.error("[handleGetMembersAvatar] : ", error.response.data.message);
    }
  };

  useEffect(() => {
    handleGettingChatDetails();
    if (isGroup) {
      handleGetMembersAvatar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isLoading ? (
    <Loading label="Chat Details" />
  ) : (
    <Link
      to={isGroup ? `/chats/groups/${chatId}` : `/chats/${chattingWithUserId}`}
      className="flex flex-row justify-between items-stretch w-full gap-6 max-md:gap-3"
    >
      <div className="w-1/12 max-md:w-1/6 h-auto">
        <Avatar
          showFallback
          name={chatDetails.name
            .split(" ")
            .map((name) => name.toUpperCase().slice(0, 1))
            .join()
            .replace(",", " ")}
          src={chatDetails.image}
          radius="full"
          size="lg"
        />
      </div>
      <div className="w-11/12  max-md:w-5/6 h-full">
        <div className="flex flex-row flex-nowrap justify-between items-center">
          <h1 className="font-bold text-base capitalize">{chatDetails.name}</h1>
          <h3 className="font-semibold text-sm max-md:text-xs text-default-500">
            {lastChatDate}
          </h3>
        </div>
        <div className="flex flex-row flex-nowrap justify-between items-center">
          <p
            className="leading-relaxed font-light text-base text-default-400"
            style={{
              textOverflow: "ellipsis",
            }}
          >
            {chatDetails.lastMessage.slice(0, 50)}...
          </p>
          {isGroup && (
            <AvatarGroup isBordered max={3} total={membersAvatarUrl.length}>
              {membersAvatarUrl.map((userImage, i) => {
                return <Avatar key={i} size="sm" src={userImage} />;
              })}
            </AvatarGroup>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ChatProfilePreview;
