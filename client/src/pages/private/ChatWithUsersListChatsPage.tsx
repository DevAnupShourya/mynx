import { useEffect, useState } from "react";
import Toast from "~/components/custom_toast/Toast";
import Loading from "~/components/loading_error_pages/Loading";
import ChatProfilePreview from "~/components/profile/ChatProfilePreview";
import { getPersonalChatsList } from "~/services/Chats/Chats.services";
import useGetCookie from "~/utils/hooks/useGetCookie";
import { useAppSelector } from "~/utils/hooks/redux.hooks";

function ChatWithUsersListChatsPage() {
  const userState = useAppSelector((state) => state.user);

  const token = useGetCookie();
  const [isLoading, setIsLoading] = useState(false);
  const [isNoUsersToChat, setIsNoUsersToChat] = useState(false);

  const [chatsList, setChatsList] = useState<
    {
      chatId: string;
      lastChattedDate: Date;
      lasMessageId: string;
      chattingWithUserId: string;
    }[]
  >([]);

  const handleGettingPersonalChatsList = async () => {
    setIsLoading(true);
    try {
      const { data } = await getPersonalChatsList(token!);
      setIsNoUsersToChat(data.responseData.length < 1);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data.responseData.map((chat: any) => {
        setChatsList((pre) => [
          ...pre,
          {
            chatId: chat._id,
            chattingWithUserId: chat.participants.filter(
              (userId: string) => userId !== userState.userId
            ),
            lasMessageId: chat.lastMessage,
            lastChattedDate: chat.updatedAt,
          },
        ]);
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      Toast.error(error.response.data.message);
      console.error("Error Getting Posts: ", error.response.data.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    handleGettingPersonalChatsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoading && <Loading label="Chats" />}
      {!isLoading && (
        <section className="w-full h-auto flex flex-col gap-2">
          {isNoUsersToChat ? (
            <h1 className="text-danger text-lg text-center animate-pulse">
              Find Users and start chatting
            </h1>
          ) : (
            chatsList.map((data) => {
              return (
                <ChatProfilePreview
                  key={data.chatId}
                  lasMessageId={data.lasMessageId}
                  chattingWithUserId={data.chattingWithUserId}
                  lastChatDate={new Date(data.lastChattedDate).toDateString()}
                  isGroup={false}
                />
              );
            })
          )}
        </section>
      )}
    </>
  );
}

export default ChatWithUsersListChatsPage;
