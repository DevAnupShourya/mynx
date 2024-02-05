import { useEffect, useRef, useState } from "react";
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
  Badge,
} from "@nextui-org/react";
import {
  useNavigate,
  Link as RouterLink,
  useParams,
  Link,
} from "react-router-dom";

import { MdOutlineVideoCall } from "react-icons/md";
import { MdAddIcCall } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { VscSend } from "react-icons/vsc";
import { BiSolidImageAdd } from "react-icons/bi";

import PersonalChatsContainer from "~/components/chat_conversation/PersonalChatsContainer";
import autoScrollToBottom from "~/utils/functions/autoScrollToBottom";
import Loading from "~/components/loading_error_pages/Loading";
import Toast from "~/components/custom_toast/Toast";

import Socket_Events from "~/utils/raw_data/Socket.io";


import {
  createMessage,
  getAllMessageIds,
  getAllMessages,
  getMessageById,
  getPersonalChat,
} from "~/services/Chats/Chats.services";
import { getUserByUID } from "~/services/Users/User.services";
import {
  ChatDataInterface,
  ChattingWithUserDataInterface,
  MessageFormInterface,
  MessageInterface,
  MessagesListResponseInterface,
} from "~/types/chat.types";
import useSocket from "~/utils/hooks/useSocket";

function UserChatsPage() {
  // ? Chatting with userid
  const { userId } = useParams();

  const { socket, isSocketOnline } = useSocket();

  const navigate = useNavigate();

  const MAX_IMAGES_ALLOWED = 1;
  const MAX_IMAGES_SIZE_ALLOWED = 2;

  // ? Message attachment image ref
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  // ? to let know child components about when to get new message
  const [chatMessageIdList, setChatMessageIdList] = useState<string[]>([]);
  const [isChatLoading, setIsChatLoading] = useState<null | boolean>(true);
  const [isMessageSending, setIsMessageSending] = useState<boolean>(false);
  const [chatDetails, setChatDetails] = useState<ChatDataInterface>({
    chatId: "",
    started: "",
    lastChanged: "",
  });
  // ? message form
  const [chatFormData, setChatFormData] = useState<MessageFormInterface>({
    text: "",
    files: [],
  });
  // ? meta states of this chat
  const [chatMeta, setChatMeta] = useState({
    isChattingWithUserOnline: false,
    isChattingWithUserTyping: false,
    isEmittedTypingStart: false,
    isEmittedTypingStop: false,
  });

  // * 1. This will run first time when page loads to get Chat Data or It's availability
  useEffect(() => {
    getChatDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ? 1.1. to get chat details as the url of current page
  const getChatDetails = async () => {
    try {
      if (!userId) {
        window.alert("Wrong UserId!!!");
        navigate("/chats");
        return;
      }
      const personalChatData = await getPersonalChat(userId);
      setChatDetails({
        chatId: personalChatData._id,
        started: new Date(personalChatData.createdAt).toDateString(),
        lastChanged: new Date(personalChatData.updatedAt).toLocaleTimeString(),
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response.status === 403) {
        navigate("/chats");
      }
      Toast.error(error.response.data.message);
      console.error(`[getChatDetails] : ${error.response.data.message}`);
    }
    setIsChatLoading(null);
  };

  // * 2. This will run second time when the first one gets chatDetails
  // ? It wil listen for all events emitted by server
  useEffect(() => {
    if (socket) {
      if (isSocketOnline) {
        socket.emit(Socket_Events.USER_ONLINE, chatDetails.chatId);
      }
      if (!isSocketOnline) {
        socket.emit(Socket_Events.USER_OFFLINE, chatDetails.chatId);
      }
    }

    if (socket && isSocketOnline && chatDetails.chatId) {
      socket.emit(Socket_Events.JOIN_CHAT, chatDetails.chatId);

      // ? After getting chat details get all messages id of this
      getChatMessagesId();

      socket.on(Socket_Events.USER_TYPING_START, onSocketUserTypingStart);
      socket.on(Socket_Events.USER_TYPING_STOP, onSocketUserTypingStop);
      socket.on(Socket_Events.USER_ONLINE, onSocketUserOnline);
      socket.on(Socket_Events.USER_OFFLINE, onSocketUserOffline);
      socket.on(Socket_Events.MESSAGE_RECEIVE, onSocketMsgRec);
    }

    return () => {
      if (socket) {
        socket.off(Socket_Events.MESSAGE_RECEIVE);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatDetails, isSocketOnline]); // ? will connect to socket.io only after getting chat details saved from DB otherwise will have empty string saved as chatId

  // ? Socket listener fns
  function onSocketMsgRec(data: { chatRoomId: string; messageId: string }) {
    if (!data) return;
    if (chatDetails.chatId === data.chatRoomId) {
      setChatMessageIdList((pre) => [...pre, data.messageId]);
    }
  }
  function onSocketUserOnline(chatRoomId: string) {
    if (!chatRoomId) return;
    if (chatDetails.chatId === chatRoomId) {
      setChatMeta({ ...chatMeta, isChattingWithUserOnline: true });
    }
  }
  function onSocketUserOffline(chatRoomId: string) {
    if (!chatRoomId) return;
    if (chatDetails.chatId === chatRoomId) {
      setChatMeta({ ...chatMeta, isChattingWithUserOnline: false });
    }
  }
  function onSocketUserTypingStart(chatRoomId: string) {
    if (!chatRoomId) return;
    if (chatDetails.chatId === chatRoomId) {
      setChatMeta({ ...chatMeta, isChattingWithUserTyping: true });
    }
  }
  function onSocketUserTypingStop(chatRoomId: string) {
    if (!chatRoomId) return;
    if (chatDetails.chatId === chatRoomId) {
      setChatMeta({ ...chatMeta, isChattingWithUserTyping: false });
    }
  }

  // * 3. This will load all messages Id of this chat then prop it to body to get Data of these messages after connecting with socket
  const getChatMessagesId = async () => {
    try {
      const chatIdsList: { _id: string }[] = await getAllMessageIds(
        chatDetails.chatId
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
        chatDetails.chatId
      );

      // ? Getting fresh details after every message
      const personalChatResponse = await getPersonalChat(userId!);
      setChatDetails({
        chatId: personalChatResponse._id,
        started: new Date(personalChatResponse.createdAt).toDateString(),
        lastChanged: new Date(
          personalChatResponse.updatedAt
        ).toLocaleTimeString(),
      });

      if (socket && isSocketOnline) {
        socket.emit(Socket_Events.MESSAGE_SEND, {
          chatRoomId: chatDetails.chatId,
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

  // ? For Attachment Image
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

  const handleTyping = () => {
    if (socket) {
      if (!chatMeta.isEmittedTypingStart || chatMeta.isEmittedTypingStop) {
        socket.emit(Socket_Events.USER_TYPING_START, chatDetails.chatId);

        setChatMeta({
          ...chatMeta,
          isEmittedTypingStart: true,
          isEmittedTypingStop: false,
        });
      }

      if (chatMeta.isEmittedTypingStart && !chatMeta.isEmittedTypingStop) {
        setTimeout(() => {
          socket.emit(Socket_Events.USER_TYPING_STOP, chatDetails.chatId);

          setChatMeta({
            ...chatMeta,
            isEmittedTypingStop: true,
            isEmittedTypingStart: false,
          });
        }, 3000);
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
        <UserChatsHeader
          chattingWithUserId={userId || null}
          isChattingWithUserOnline={chatMeta.isChattingWithUserOnline}
          isChattingWithUserTyping={chatMeta.isChattingWithUserTyping}
        />
        <Divider />
        <UserChatsBody
          chatIdToGetMessagesOf={chatDetails.chatId}
          chatMessageIdList={chatMessageIdList}
          chatInitiated={chatDetails.started}
          chatLastUpdated={chatDetails.lastChanged}
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
                  handleTyping();
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
                isDisabled={chatFormData.text.length < 2 || !isSocketOnline}
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
export default UserChatsPage;

function UserChatsBody({
  chatIdToGetMessagesOf,
  chatInitiated,
  chatLastUpdated,
  chatMessageIdList,
}: {
  chatIdToGetMessagesOf: string;
  chatInitiated: string;
  chatLastUpdated: string;
  chatMessageIdList: string[];
}) {
  const [messagesList, setMessagesList] = useState<MessageInterface[]>([]);
  const [isChatMessagesLoading, setIsChatMessagesLoading] = useState(true);

  const [isOldMessageLoaded, setIsOldMessageLoaded] = useState(false);

  const handleAllGettingMessages = async () => {
    setIsChatMessagesLoading(true);
    try {
      const messagesListResponse: MessagesListResponseInterface[] =
        await getAllMessages(chatIdToGetMessagesOf);

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
      console.error(`[handleAllGettingMessages] : ${error}`);
    }
    setIsChatMessagesLoading(false);
  };

  const handleGetLastMessage = async () => {
    try {
      const lastMessageResponse = await getMessageById(
        chatMessageIdList[chatMessageIdList.length - 1]
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

  // ? It will make sure that user will always be at the bottom when new message adds
  useEffect(() => {
    autoScrollToBottom("PersonalChatContainer");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messagesList]);

  return (
    <CardBody id="PersonalChatContainer">
      {isChatMessagesLoading ? (
        <Loading label="Chat Messages" />
      ) : // ? Because First Message is 'Chat Initiated' itself so starting from 1
      messagesList && messagesList.length <= 1 ? (
        <div className="w-full h-full grid place-items-center">
          <h1>No Conversations Started Yet!</h1>
        </div>
      ) : (
        <PersonalChatsContainer
          chatStarted={chatInitiated}
          chatUpdated={chatLastUpdated}
          messages={messagesList}
        />
      )}
    </CardBody>
  );
}

function UserChatsHeader({
  chattingWithUserId,
  isChattingWithUserOnline,
  isChattingWithUserTyping,
}: {
  chattingWithUserId: string | null;
  isChattingWithUserOnline: boolean;
  isChattingWithUserTyping: boolean;
}) {
  // ? The Other user state
  const [chattingWithUser, setChattingWithUser] =
    useState<ChattingWithUserDataInterface>({
      image: "",
      name: "",
      username: "",
    });

  const getChattingWithUserDetails = async () => {
    try {
      if (chattingWithUserId) {
        const { user } = await getUserByUID(chattingWithUserId);
        setChattingWithUser({
          image: user.avatarURL,
          name: user.name,
          username: user.username,
        });
      } else {
        console.error("User Id not provided!");
        Toast.warning("User Id not found!!");
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      Toast.error(error.response.data.message);
      console.error(
        `[getChattingWithUserDetails] : ${error.response.data.message}`
      );
    }
  };

  // * This will run first time when page loads to get chatting with user Data from DB
  useEffect(() => {
    getChattingWithUserDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CardHeader className="flex justify-between px-0 gap-1">
      <Button
        color="default"
        variant="light"
        isIconOnly
        radius="sm"
        title="Previous Location"
        as={RouterLink}
        to="/chats"
      >
        <IoIosArrowBack className="text-lg" />
      </Button>
      <div className="max-md:w-1/2 w-1/4 h-auto flex items-center gap-2">
        <Link to={`/${chattingWithUser.username}`}>
          <Badge
            content=""
            color={isChattingWithUserOnline ? "success" : "warning"}
            shape="circle"
            placement="bottom-right"
          >
            <Avatar
              isBordered
              size="lg"
              radius="full"
              src={chattingWithUser.image}
              showFallback
            />
          </Badge>
        </Link>
        <div className="flex flex-col justify-between">
          <h1 className="font-bold capitalize">{chattingWithUser.name}</h1>
          {isChattingWithUserTyping ? (
            <p className="text-xs animate-pulse text-success">typing...</p>
          ) : (
            <span>&nbsp;</span>
          )}
        </div>
      </div>
      <div className="max-md:w-1/2 w-1/4 h-auto flex flex-row gap-1 justify-end items-center">
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
              <BsThreeDotsVertical className="text-lg" />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Button
              fullWidth
              color="warning"
              variant="light"
              className="capitalize"
              radius="sm"
              title="report User"
            >
              report {chattingWithUser.name}
            </Button>
            <Button
              fullWidth
              color="danger"
              variant="flat"
              className="capitalize"
              radius="sm"
              title="Block User"
            >
              Block {chattingWithUser.name}
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </CardHeader>
  );
}
