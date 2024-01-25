import { useEffect, useRef, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Button,
  Avatar,
  Badge,
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Spinner,
  Kbd,
} from "@nextui-org/react";
import { Link as RouterLink, useParams } from "react-router-dom";

import { MdOutlineVideoCall } from "react-icons/md";
import { MdAddIcCall } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { VscSend } from "react-icons/vsc";
import { BiSolidImageAdd } from "react-icons/bi";
import { PiGifFill } from "react-icons/pi";
import { AiFillFileAdd } from "react-icons/ai";

import PersonalChatsContainer from "~/components/chat_conversation/PersonalChatsContainer";
import Toast from "~/components/custom_toast/Toast";
import useGetCookie from "~/utils/hooks/useGetCookie";
import {
  createMessage,
  getAllMessages,
  getPersonalChat,
} from "~/services/Chats/Chats.services";
import { getUserByUID } from "~/services/Users/User.services";

import { io, Socket } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_API_URL as string;
import Socket_Events from "~/utils/raw_data/Socket.io";
import {
  ChatDataInterface,
  ChatMetadataInterface,
  ChattingWithUserDataInterface,
  MessageFormInterface,
  MessageInterface,
  MessagesListResponseInterface,
} from "~/types/chat.types";
import autoScrollToBottom from "~/utils/functions/autoScrollToBottom";
import Loading from "~/components/loading_error_pages/Loading";

function UserChatsPage() {
  const socketRef = useRef<Socket | null>(null);

  const { userId } = useParams();
  const token = useGetCookie();

  const [isChatLoading, setIsChatLoading] = useState<null | boolean>(true);
  const [isChatMessagesLoading, setIsChatMessagesLoading] = useState(true);
  const [isMessageSending, setIsMessageSending] = useState<boolean>(false);
  const [chatDetails, setChatDetails] = useState<ChatDataInterface>({
    chatId: "",
    started: "",
    lastChanged: "",
  });
  const [chattingWithUser, setChattingWithUser] =
    useState<ChattingWithUserDataInterface>({
      image: "",
      name: "",
      username: "",
    });

  const [chatFormData, setChatFormData] = useState<MessageFormInterface>({
    text: "",
  });

  const [messagesList, setMessagesList] = useState<MessageInterface[]>([]);
  const [chatMetaStates, setChatMetaStates] = useState<ChatMetadataInterface>({
    isCurrentUserOnline: false,
    isCurrentUserTyping: false,
    isChattingWithUserOnline: false,
    isChattingWithUserTyping: false,
  });

  const handleGettingPersonalChat = async () => {
    try {
      const personalChatData = await getPersonalChat(userId!, token!);
      setChatDetails({
        chatId: personalChatData._id,
        started: new Date(personalChatData.createdAt).toDateString(),
        lastChanged: new Date(personalChatData.updatedAt).toLocaleTimeString(),
      });

      const { user } = await getUserByUID(userId!, token!);
      setChattingWithUser({
        image: user.avatarURL,
        name: user.name,
        username: user.username,
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      Toast.error(error.response.data.message);
      console.error(
        `@handleGettingPersonalChat : ${error.response.data.message}`
      );
    }
    setIsChatLoading(null);
  };

  useEffect(() => {
    // ? This will run first time when page loads to get Chat Data and Chatting with User Data from DB
    handleGettingPersonalChat();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    autoScrollToBottom("PersonalChatContainer");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messagesList]);

  const handleGettingMessages = async () => {
    setIsChatMessagesLoading(true);
    try {
      const messagesListResponse: MessagesListResponseInterface[] =
        await getAllMessages(chatDetails.chatId, token!);

      const messagesListResponseFiltered = messagesListResponse.map(
        (currentMsg) => ({
          created: currentMsg.createdAt,
          files: currentMsg.files,
          id: currentMsg._id,
          senderId: currentMsg.sender,
          text: currentMsg.text,
          updated: currentMsg.updatedAt,
        })
      );

      // ? Checking if new Messages in DB only then mutating
      if (!(messagesListResponseFiltered === messagesList)) {
        setMessagesList(messagesListResponseFiltered);
      }

      // ? First Time messagesList will be [] then can not check (messagesListResponseFiltered === messagesList) or not
      if (messagesList.length === 0) {
        setMessagesList(messagesListResponseFiltered);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setIsChatLoading(false);
      Toast.error(error.response.data.message);
      console.error(`@handleGettingMessages : ${error.response.data.message}`);
    }
    setIsChatMessagesLoading(false);
  };

  // ? This will try to connect to socket after getting chatDetails
  useEffect(() => {
    console.log("Trying ro Connect With Socket.....");
    // ws://127.0.0.1:3300
    socketRef.current = io(SOCKET_URL.replace("v1", ""), {
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    const socket = socketRef.current;

    socket.on("connect", () => {
      console.log("Connected With Socket.");
      setChatMetaStates({ ...chatMetaStates, isCurrentUserOnline: true });

      socket.emit(Socket_Events.join_personal_chat, chatDetails.chatId);
      socket.on(Socket_Events.receive_message_personal_chat, (data) => {
        if (!data) return;
        handleGettingMessages();
      });

      socket.on(Socket_Events.personal_chat_typing, (chatRoomId: string) => {
        if (!chatRoomId) return;
        if (chatRoomId === chatDetails.chatId) {
          setChatMetaStates({
            ...chatMetaStates,
            isChattingWithUserTyping: true,
          });
        }
      });
      socket.on(Socket_Events.personal_chat_online, (chatRoomId: string) => {
        if (!chatRoomId) return;
        if (chatRoomId === chatDetails.chatId) {
          setChatMetaStates({
            ...chatMetaStates,
            isChattingWithUserOnline: true,
          });
        }
      });

      // ? Will Only run when chatDetails will be updated after every message sending
      handleGettingMessages();
    });

    socket.on(Socket_Events.socket_error_connect, (err: Error) => {
      Toast.error(err.message);
      console.error(`Socket Connection error : ${err}`);
    });

    socket.on(Socket_Events.socket_error_failed, (err: Error) => {
      Toast.error(err.message);
      console.error(`Socket Failed Error : ${err}`);
    });

    socket.on(Socket_Events.socket_disconnect, (err: Error) => {
      Toast.error(err.message);
      console.error(`Socket Disconnect Error : ${err}`);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.off();
      }
      setChatMetaStates({ ...chatMetaStates, isCurrentUserOnline: false });
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatDetails]); // ? will connect to socket.io only after getting chat details saved from DB otherwise will have empty string saved as chatId

  const handleSendMessage = async () => {
    setIsMessageSending(true);

    if (socketRef.current) {
      const messageData = await createMessage(
        chatFormData.text.trim(),
        chatDetails.chatId,
        token!
      );

      // ? Getting fresh details after every message
      const personalChatResponse = await getPersonalChat(userId!, token!);
      setChatDetails({
        chatId: personalChatResponse._id,
        started: new Date(personalChatResponse.createdAt).toDateString(),
        lastChanged: new Date(
          personalChatResponse.updatedAt
        ).toLocaleTimeString(),
      });

      socketRef.current.emit(Socket_Events.send_message_personal_chat, {
        chatRoomId: chatDetails.chatId,
        message: messageData._id,
      });
    }

    setChatFormData({ text: "" });
    setIsMessageSending(false);
  };

  useEffect(() => {
    if (socketRef.current) {
      if (chatMetaStates.isCurrentUserTyping) {
        socketRef.current.emit(
          Socket_Events.personal_chat_typing,
          chatDetails.chatId
        );
      }
      if (chatMetaStates.isCurrentUserOnline) {
        socketRef.current.emit(
          Socket_Events.personal_chat_online,
          chatDetails.chatId
        );
      }

    }

    if (chatMetaStates.isChattingWithUserTyping) {
      setTimeout(() => {
        setChatMetaStates({
          ...chatMetaStates,
          isChattingWithUserTyping: false,
        });
      }, 2000);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatMetaStates]);

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
      {/* Chatting with {userId} */}
      <Card className="w-full h-full bg-main-text-main" radius="sm">
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
            <Badge
              content=""
              color={
                chatMetaStates.isChattingWithUserOnline ? "success" : "danger"
              }
              shape="circle"
              placement="top-right"
            >
              <Avatar
                isBordered
                size="lg"
                radius="full"
                src={chattingWithUser.image}
                showFallback
              />
            </Badge>
            <div className="flex flex-col justify-between">
              <h1 className="font-bold">{chattingWithUser.name}</h1>
              <p className="font-light text-sm animate-pulse text-success">
                {chatMetaStates.isChattingWithUserTyping ? (
                  <span>typing..</span>
                ) : (
                  <span>&nbsp;</span>
                )}
              </p>
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
        <Divider />
        <CardBody id="PersonalChatContainer" className="transition-all">
          {/* Because First Message is 'Chat Initiated' itself */}
          {isChatMessagesLoading ? (
            <Loading label="Chat Messages" />
          ) : messagesList && messagesList.length <= 1 ? (
            <div className="w-full h-full grid place-items-center">
              <h1>No Conversations Started Yet!</h1>
            </div>
          ) : (
            <PersonalChatsContainer
              chatStarted={chatDetails.started}
              chatUpdated={chatDetails.lastChanged}
              messages={messagesList}
            />
          )}
        </CardBody>
        <Divider />
        <CardFooter className="overflow-visible flex-col">
          <div className="w-full h-auto flex justify-between items-center flex-nowrap max-lg:flex-wrap gap-2">
            <Button
              color="warning"
              variant="flat"
              isIconOnly
              radius="full"
              title="Share Image"
            >
              <BiSolidImageAdd className="text-lg" />
            </Button>
            <Button
              color="warning"
              variant="flat"
              isIconOnly
              radius="full"
              title="Share GIF"
            >
              <PiGifFill className="text-lg" />
            </Button>
            <Button
              color="warning"
              variant="flat"
              isIconOnly
              radius="full"
              title="Share File"
            >
              <AiFillFileAdd className="text-lg" />
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
                  setChatFormData({ text: e.target.value });
                }}
                onKeyUp={() => {
                  setChatMetaStates({
                    ...chatMetaStates,
                    isCurrentUserTyping: true,
                  });
                }}
                description={
                  <span>
                    Press
                    <Kbd keys={["ctrl"]} className="m-1" />
                    +
                    <Kbd keys={["enter"]} className="m-1" />
                    to send message
                  </span>
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
            {/* <span className="text-xs text-default-500">Attachments :</span>
              <Chip onClose={() => console.log("close")} variant="bordered">
                Image.png
              </Chip>
              <Chip onClose={() => console.log("close")} variant="bordered">
                so close.png
              </Chip>
              <Chip onClose={() => console.log("close")} variant="bordered">
                so close.png
              </Chip>
              <Chip onClose={() => console.log("close")} variant="bordered">
                so close.png
              </Chip>
              <Chip onClose={() => console.log("close")} variant="bordered">
                so close.png
              </Chip> */}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
export default UserChatsPage;
