import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Button,
  Avatar,
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Spinner,
  Kbd,
  Chip,
} from "@nextui-org/react";

import { MdOutlineVideoCall } from "react-icons/md";
import { MdAddIcCall } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { VscSend } from "react-icons/vsc";
import { BiSolidImageAdd } from "react-icons/bi";
import { CgDetailsLess } from "react-icons/cg";

import GroupChatMessagesContainer from "~/components/chat_conversation/GroupChatMessagesContainer";
import ChatGroupDetails from "~/components/chat_conversation/ChatGroupDetails";
import useGetCookie from "~/utils/hooks/useGetCookie";
import {
  MessageFormInterface,
  MessageInterface,
  MessagesListResponseInterface,
} from "~/types/chat.types";
import { useEffect, useRef, useState } from "react";
import {
  createMessage,
  getAllMessageIds,
  getAllMessages,
  getGroupChat,
  getMessageById,
} from "~/services/Chats/Chats.services";
import Toast from "~/components/custom_toast/Toast";
import autoScrollToBottom from "~/utils/functions/autoScrollToBottom";
import Loading from "~/components/loading_error_pages/Loading";

import Socket_Events from "~/utils/raw_data/Socket.io";
import useSocket from "~/utils/hooks/useSocket";

function GroupChatsPage() {
  // ? Chatting with userid
  const { groupId } = useParams();

  const { socket, isSocketOnline } = useSocket();

  const token = useGetCookie();

  const navigate = useNavigate();

  const MAX_IMAGES_ALLOWED = 1;
  const MAX_IMAGES_SIZE_ALLOWED = 2;

  // ? Message attachment image ref
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  // ? to let know child components about when to get new message
  const [chatMessageIdList, setChatMessageIdList] = useState<string[]>([]);
  const [isChatLoading, setIsChatLoading] = useState<null | boolean>(true);
  const [isMessageSending, setIsMessageSending] = useState<boolean>(false);
  const [groupChatDetails, setGroupChatDetails] = useState({
    chatId: "",
    groupName: "",
    groupImage: "",
    started: "",
    lastChanged: "",
  });

  // ? message form
  const [chatFormData, setChatFormData] = useState<MessageFormInterface>({
    text: "",
    files: [],
  });

  // ? to get chat details as the url of current page
  const getChatDetails = async () => {
    try {
      if (!groupId) {
        window.alert("Wrong GroupId!!!");
        navigate("/chats/groups");
        return;
      }
      const groupChatData = await getGroupChat(groupId, token!);
      setGroupChatDetails({
        chatId: groupChatData._id,
        groupName: groupChatData.groupName,
        groupImage: groupChatData.groupImage,
        started: new Date(groupChatData.createdAt).toDateString(),
        lastChanged: new Date(groupChatData.updatedAt).toLocaleTimeString(),
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response.status === 403) {
        console.log("redirect");
        navigate("/chats/groups");
      }
      Toast.error(error.response.data.message);
      console.error(`@getChatDetails : ${error.response.data.message}`);
    }
    setIsChatLoading(null);
  };

  // * 1. This will run first time when page loads to get Chat Data or It's availability
  useEffect(() => {
    getChatDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // * 2. This will run second time when the first one gets chatDetails
  // ? It wil listen for all events emitted by server
  useEffect(() => {
    if (socket && isSocketOnline) {
      socket.emit(Socket_Events.JOIN_CHAT, groupChatDetails.chatId);

      // ? After getting chat details get all messages id of this
      getChatMessagesId();

      socket.on(Socket_Events.MESSAGE_RECEIVE, onSocketMsgRec);
    }

    return () => {
      if (socket) {
        socket.off(Socket_Events.MESSAGE_RECEIVE);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupChatDetails, isSocketOnline]); // ? will connect to socket.io only after getting chat details saved from DB otherwise will have empty string saved as chatId

  // ? Socket listener fns
  function onSocketMsgRec(data: { chatRoomId: string; messageId: string }) {
    if (!data) return;
    if (groupChatDetails.chatId === data.chatRoomId) {
      setChatMessageIdList((pre) => [...pre, data.messageId]);
    }
  }

  // * 3. This will load all messages Id of this chat then prop it to body to get Data of these messages after connecting with socket
  const getChatMessagesId = async () => {
    try {
      const chatIdsList: { _id: string }[] = await getAllMessageIds(
        groupChatDetails.chatId,
        token!
      );

      chatIdsList.map((msg) =>
        setChatMessageIdList((pre) => [...pre, msg._id])
      );

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      Toast.error(error.response.data.message);
      console.error(`[getChatMessagesId] : ${error.response.data.message}`);
    }
    setIsChatLoading(null);
  };

  // * 4. This will emit new message
  const handleSendMessage = async () => {
    setIsMessageSending(true);
    try {
      const messageData = await createMessage(
        chatFormData.text.trim(),
        groupChatDetails.chatId,
        token!
      );

      // ? Getting fresh details after every message
      const groupChatData = await getGroupChat(groupId!, token!);
      setGroupChatDetails({
        chatId: groupChatData._id,
        groupName: groupChatData.groupName,
        groupImage: groupChatData.groupImage,
        started: new Date(groupChatData.createdAt).toDateString(),
        lastChanged: new Date(groupChatData.updatedAt).toLocaleTimeString(),
      });

      if (socket && isSocketOnline) {
        socket.emit(Socket_Events.MESSAGE_SEND, {
          chatRoomId: groupChatDetails.chatId,
          messageId: messageData._id,
        });
      } else {
        window.alert("Socket not available or not online!!!");
      }
      setChatFormData({ files: [], text: "" });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      Toast.error(error.response.data.message);
      console.error(`[handleSendMessage] : ${error.response.data.message}`);
    }
    setIsMessageSending(false);
  };

  // ? Handling Attachments
  const handleImageChange = () => {
    // ? Checking user input has something or not
    if (imageInputRef.current?.files?.length) {
      // ? Checking user files are not more than 4
      if (imageInputRef.current.files.length > MAX_IMAGES_ALLOWED) {
        Toast.warning(`Not Allowed More Than ${MAX_IMAGES_ALLOWED} Images!!!`);
        return;
      } else {
        const imageFiles = imageInputRef.current.files as FileList;
        for (let i = 0; i < imageFiles.length; i++) {
          const imageBlob = imageFiles[i];
          const imageSizeInMB = imageBlob.size / (1024 * 1024);

          if (imageSizeInMB > MAX_IMAGES_SIZE_ALLOWED) {
            // ? Alert the user if the file size exceeds 4MB
            Toast.warning(
              `File ${imageBlob.name} exceeds ${MAX_IMAGES_SIZE_ALLOWED}MB size limit!`
            );
            return;
          }
          const reader = new FileReader() as FileReader;
          reader.onload = (event) => {
            setChatFormData((prevData) => ({
              ...prevData,
              files: [
                ...prevData.files,
                {
                  name: imageBlob.name,
                  url: event.target?.result as string,
                },
              ],
            }));
          };
          reader.onerror = (event) => {
            console.error(`Error While Loading Image: ${event.target}`);
            Toast.error(`Error While Loading Image: ${event.target}`);
          };
          reader.readAsDataURL(imageBlob);
        }
      }
    }
  };

  return isChatLoading === true ? (
    <div className="w-full h-full grid place-items-center">
      <Spinner color="warning" label="Loading Your Chat...." />
    </div>
  ) : isChatLoading === false ? (
    <div className="w-full h-full grid place-items-center">
      <h1 className="text-danger text-sm capitalize text-center">
        Internal Server Error! <br /> Please Refresh The Page or Try again after
        some time
      </h1>
    </div>
  ) : (
    <div className="w-full h-full">
      <Card className="w-full h-full bg-main-text-main" radius="sm">
        <GroupChatsHeader
          chatId={groupChatDetails.chatId}
          groupName={groupChatDetails.groupName}
          groupImage={groupChatDetails.groupImage}
        />
        <Divider />
        <GroupChatsBody
          chatIdToGetMessagesOf={groupChatDetails.chatId}
          token={token!}
          chatMessageIdList={chatMessageIdList}
          chatInitiated={groupChatDetails.started}
          chatLastUpdated={groupChatDetails.lastChanged}
        />
        <Divider />
        <CardFooter className="overflow-visible flex-col">
          <div className="w-full h-auto flex justify-between items-center flex-nowrap gap-2">
            <Button
              color="default"
              variant="flat"
              isIconOnly
              radius="full"
              title="Share Image"
              onClick={() => {
                imageInputRef.current?.click();
              }}
            >
              <input
                type="file"
                ref={imageInputRef}
                accept="image/png,image/jpeg,image/webp"
                multiple
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              <BiSolidImageAdd className="text-lg" />
            </Button>
            <div className="w-full flex justify-between items-center gap-2">
              <Textarea
                minRows={1}
                variant="flat"
                color="primary"
                name="message"
                placeholder="Type your message"
                value={chatFormData.text}
                onChange={(e) => {
                  setChatFormData({ ...chatFormData, text: e.target.value });
                }}
                description={
                  <div className="flex items-center justify-between">
                    <div>
                      <span>
                        Press
                        <Kbd keys={["ctrl"]} className="m-1" />
                        +
                        <Kbd keys={["enter"]} className="m-1" />
                        to send message
                      </span>
                    </div>
                    <div>
                      <h1
                        className={`${
                          isSocketOnline ? "text-danger" : "text-warning"
                        } font-extralight text-xs uppercase text-center`}
                      >
                        {isSocketOnline ? "you are online" : "you are offline"}
                      </h1>
                    </div>
                  </div>
                }
                onKeyDown={(e) => {
                  if (e.ctrlKey && e.key === "Enter") {
                    handleSendMessage();
                  }
                }}
              />
              <Button
                color="primary"
                variant="solid"
                isIconOnly
                radius="sm"
                title="Send Message"
                isDisabled={chatFormData.text.length < 2}
                isLoading={isMessageSending}
                onClick={handleSendMessage}
              >
                <VscSend className="text-lg" />
              </Button>
            </div>
          </div>
          <div className="w-full h-auto flex items-center flex-wrap gap-2">
            {chatFormData.files.length >= 1 && (
              <>
                <span className="text-xs text-default-500">Attachments :</span>
                {chatFormData.files.map((file, i) => {
                  return (
                    <Chip
                      key={`${file.name}-${i}`}
                      onClose={() =>
                        setChatFormData((prev) => ({
                          ...prev,
                          files: prev.files.filter(
                            (savedFile) => savedFile.url !== file.url
                          ),
                        }))
                      }
                      variant="bordered"
                    >
                      {file.name}
                    </Chip>
                  );
                })}
              </>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

function GroupChatsHeader({
  chatId,
  groupImage,
  groupName,
}: {
  chatId: string;
  groupName: string;
  groupImage: string;
}) {
  return (
    <CardHeader className="flex justify-between px-0 gap-1">
      <Button
        color="default"
        variant="light"
        isIconOnly
        radius="sm"
        title="Previous Location"
        as={RouterLink}
        to="/chats/groups"
        className=""
      >
        <IoIosArrowBack className="text-lg" />
      </Button>
      <div className=" h-auto flex items-center gap-2">
        <Avatar
          isBordered
          size="lg"
          radius="full"
          src={groupImage}
          name={groupName
            .split(" ")
            .map((name) => name.toUpperCase().slice(0, 1))
            .join()
            .replace(",", " ")}
        />
        <h1 className="font-bold capitalize">{groupName}</h1>
      </div>
      <div className=" h-auto flex flex-row gap-1 justify-end items-center">
        <Button
          color="default"
          variant="light"
          className="capitalize"
          isIconOnly
          radius="sm"
          title="Voice Call"
        >
          <MdAddIcCall className="text-lg" />
        </Button>
        <Button
          color="default"
          variant="light"
          className="capitalize"
          isIconOnly
          radius="sm"
          title="Video Call"
        >
          <MdOutlineVideoCall className="text-lg" />
        </Button>
        <Popover placement="bottom-end">
          <PopoverTrigger>
            <Button
              color="default"
              variant="light"
              className="capitalize"
              isIconOnly
              radius="sm"
              title="Chat Menu"
            >
              <CgDetailsLess className="text-lg" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0 rounded-full">
            <ChatGroupDetails groupId={chatId} />
          </PopoverContent>
        </Popover>
      </div>
    </CardHeader>
  );
}

function GroupChatsBody({
  chatIdToGetMessagesOf,
  token,
  chatInitiated,
  chatLastUpdated,
  chatMessageIdList,
}: {
  chatIdToGetMessagesOf: string;
  token: string | null;
  chatInitiated: string;
  chatLastUpdated: string;
  chatMessageIdList: string[];
}) {
  const [messagesList, setMessagesList] = useState<MessageInterface[]>([]);
  const [isChatMessagesLoading, setIsChatMessagesLoading] = useState(false);
  const [isOldMessageLoaded, setIsOldMessageLoaded] = useState(false);

  const handleAllGettingMessages = async () => {
    setIsChatMessagesLoading(true);
    try {
      const messagesListResponse: MessagesListResponseInterface[] =
        await getAllMessages(chatIdToGetMessagesOf, token!);

      messagesListResponse.map((currentMsg) => {
        setMessagesList((pre) => [
          ...pre,
          {
            created: currentMsg.createdAt,
            files: currentMsg.files,
            id: currentMsg._id,
            senderId: currentMsg.sender,
            text: currentMsg.text,
            updated: currentMsg.updatedAt,
          },
        ]);
      });

      setIsOldMessageLoaded(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      Toast.error(error.response.data.message);
      console.error(`@handleGettingMessages : ${error}`);
    }
    setIsChatMessagesLoading(false);
  };

  const handleGetLastMessage = async () => {
    try {
      const lastMessageResponse = await getMessageById(
        chatMessageIdList[chatMessageIdList.length - 1],
        token!
      );
      setMessagesList((pre) => [
        ...pre,
        {
          created: lastMessageResponse.createdAt,
          files: lastMessageResponse.files,
          id: lastMessageResponse._id,
          senderId: lastMessageResponse.sender,
          text: lastMessageResponse.text,
          updated: lastMessageResponse.updatedAt,
        },
      ]);
      setIsOldMessageLoaded(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      Toast.error(error.response.data.message);
      console.error(`[handleGetLastMessage] : ${error}`);
    }
  };

  // * 1. This will run whenever messagesList gets updated
  useEffect(() => {
    // ? Determine whether previous chat has loaded or not
    if (!isOldMessageLoaded && messagesList.length === 0) {
      handleAllGettingMessages();
    }
    // ? Determine whether any new message added
    if (
      isOldMessageLoaded &&
      chatMessageIdList[chatMessageIdList.length - 1] !==
        messagesList[messagesList.length - 1].id
    ) {
      handleGetLastMessage();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatMessageIdList]);

  useEffect(() => {
    autoScrollToBottom("PersonalChatContainer");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messagesList]);

  return (
    <CardBody id="PersonalChatContainer" className="transition-all">
      {isChatMessagesLoading ? (
        <Loading label="Chat Messages" />
      ) : // ? Because First Message is 'Chat Initiated' itself
      messagesList && messagesList.length <= 1 ? (
        <div className="w-full h-full grid place-items-center">
          <h1>No Conversations Started Yet!</h1>
        </div>
      ) : (
        <GroupChatMessagesContainer
          chatStarted={chatInitiated}
          chatUpdated={chatLastUpdated}
          messages={messagesList}
        />
      )}
    </CardBody>
  );
}

export default GroupChatsPage;
