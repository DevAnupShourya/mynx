import { useEffect, useState } from "react";
import Toast from "~/components/custom_toast/Toast";
import Loading from "~/components/loading_error_pages/Loading";
import ChatProfilePreview from "~/components/profile/ChatProfilePreview";
import { getPersonalChatsList } from "~/services/Chats/Chats.services";
import useGetCookie from "~/utils/hooks/useGetCookie";
import { useAppSelector } from "~/utils/hooks/redux.hooks";
import { PersonalChatDataListType } from "~/types/chat.types";

function ChatWithUsersListChatsPage() {
  const userState = useAppSelector((state) => state.user);

  const token = useGetCookie();
  const [isLoading, setIsLoading] = useState(false);
  const [isNoUsersToChat, setIsNoUsersToChat] = useState(false);

  const [chatsList, setChatsList] = useState<PersonalChatDataListType>([]);

  const handleGettingPersonalChatsList = async () => {
    setIsLoading(true);
    try {
      const messagesList = await getPersonalChatsList(token!);
      setIsNoUsersToChat(messagesList.length < 1);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      messagesList.map((chat: any) => {
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
      console.error(
        "@handleGettingPersonalChatsList : ",
        error.response.data.message
      );
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
        <>
          {isNoUsersToChat ? (
            <h1 className="text-danger text-lg text-center animate-pulse">
              Find Users and start chatting
            </h1>
          ) : (
            <section className="w-full h-auto flex flex-col gap-2">
              {chatsList.map((data) => {
                return (
                  <ChatProfilePreview
                    key={data.chatId}
                    isGroup={false}
                    lasMessageId={data.lasMessageId}
                    chattingWithUserId={data.chattingWithUserId[0]}
                    lastChatDate={new Date(data.lastChattedDate).toDateString()}
                  />
                );
              })}
            </section>
          )}
        </>
      )}
    </>
  );
}

export default ChatWithUsersListChatsPage;
