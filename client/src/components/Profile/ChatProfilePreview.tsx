import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "@nextui-org/react";

import Toast from "~/components/custom_toast/Toast";

import useGetCookie from "~/utils/hooks/useGetCookie";
import Loading from "~/components/loading_error_pages/Loading";

import { getUserByUID } from "~/services/Users/User.services";
import { getMessageById } from "~/services/Chats/Chats.services";

function ChatProfilePreview({
  lasMessageId,
  chattingWithUserId,
  lastChatDate,
  isGroup,
}: {
  lasMessageId: string;
  chattingWithUserId: string;
  lastChatDate: string;
  isGroup: boolean;
}) {
  const token = useGetCookie();

  const [isLoading, setIsLoading] = useState(true);
  const [chattingWithUserDetails, setChattingWithUserDetails] = useState({
    image: "",
    name: "",
  });
  const [lastMessageDetails, setLastMessageDetails] = useState({ text: "" });

  const handleGettingChatDetails = async () => {
    try {
      const userData = await getUserByUID(chattingWithUserId, token!);
      setChattingWithUserDetails({
        image: userData.user.avatarURL,
        name: userData.user.name,
      });

      const messageData = await getMessageById(lasMessageId, token!);
      setLastMessageDetails({ text: messageData.data.responseData.text });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      Toast.error(error.response.data.message);
      console.error("Error Getting Posts: ", error.response.data.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    handleGettingChatDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isLoading ? (
    <Loading label="Chat Details" />
  ) : (
    <Link
      to={isGroup ? `/chats/groups/${chattingWithUserId}` : `/chats/${chattingWithUserId}`}
      className="flex flex-row justify-between items-stretch w-full gap-6 max-md:gap-3"
    >
      <div className="w-1/12 max-md:w-1/6 h-auto">
        <Avatar
          showFallback
          name={chattingWithUserDetails.name
            .split(" ")
            .map((name) => name.toUpperCase().slice(0, 1))
            .join()
            .replace(",", " ")}
          src={chattingWithUserDetails.image}
          radius="full"
          size="lg"
        />
      </div>
      <div className="w-11/12  max-md:w-5/6 h-full ">
        <div className="flex flex-row flex-nowrap justify-between items-center">
          <h1 className="font-bold text-base">
            {chattingWithUserDetails.name}
          </h1>
          <h3 className="font-semibold text-sm max-md:text-xs text-default-500">
            {lastChatDate}
          </h3>
        </div>
        <div>
          <p className="leading-relaxed font-light text-base text-default-400">
            {lastMessageDetails.text}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default ChatProfilePreview;
