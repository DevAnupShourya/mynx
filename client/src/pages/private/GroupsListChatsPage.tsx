import { useEffect, useState } from "react";
import Toast from "~/components/custom_toast/Toast";
import Loading from "~/components/loading_error_pages/Loading";
import ChatProfilePreview from "~/components/profile/ChatProfilePreview";
import { getGroupChatsList } from "~/services/Chats/Chats.services";
import { GroupChatDataListType } from "~/types/chat.types";
import useGetCookie from "~/utils/hooks/useGetCookie";

function GroupsListChatsPage() {
  const token = useGetCookie();

  const [isLoading, setIsLoading] = useState(false);
  const [isNoGroupsToChat, setIsNoGroupsToChat] = useState(false);
  const [groupsChatsList, setGroupsChatsList] = useState<GroupChatDataListType>([]);

  const handleGetGroupChatsList = async () => {
    setIsLoading(true);
    try {
      const groupsList = await getGroupChatsList(token!);
      if (groupsList.length < 1) {
        setIsNoGroupsToChat(true);
        setIsLoading(false);
        return;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      groupsList.map((group: any) => {
        setGroupsChatsList((pre) => [
          ...pre,
          {
            chatId: group._id,
            lasMessageId: group.lastMessage,
            groupName: group.groupName,
            groupImage: group.groupImage,
            lastChattedDate: group.updatedAt,
            members: group.participants            
          },
        ]);
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      Toast.error(error.response.data.message);
      console.error("@getGroupChatsList : ", error.response.data.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    handleGetGroupChatsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoading && <Loading label="Group Chats" />}
      {!isLoading && (
        <section className="w-full h-auto flex flex-col gap-2">
          {isNoGroupsToChat ? (
            <h1 className="text-danger text-lg text-center animate-pulse">
              Find Groups and start chatting...
            </h1>
          ) : (
            groupsChatsList.map((group) => {
              return (
                <ChatProfilePreview
                  key={group.chatId}
                  lasMessageId={group.lasMessageId}
                  chatId={group.chatId}
                  lastChatDate={new Date(group.lastChattedDate).toDateString()}
                  isGroup={true}
                  members={group.members}
                />
              );
            })
          )}
        </section>
      )}
    </>
  );
}

export default GroupsListChatsPage;
