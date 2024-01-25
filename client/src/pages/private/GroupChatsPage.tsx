import { Link as RouterLink } from "react-router-dom";
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
  Progress,
} from "@nextui-org/react";

import { MdOutlineVideoCall } from "react-icons/md";
import { MdAddIcCall } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { VscSend } from "react-icons/vsc";
import { BiSolidImageAdd } from "react-icons/bi";
import { PiGifFill } from "react-icons/pi";
import { AiFillFileAdd } from "react-icons/ai";
import { CgDetailsLess } from "react-icons/cg";

import GroupChatsContainer from "~/components/chat_conversation/GroupChatsContainer";
import ChatGroupDetails from "~/components/chat_conversation/ChatGroupDetails";

function GroupChatsPage() {
  // const { groupId } = useParams();
  const conversationStatus: null | boolean = true;

  const groupData = {
    image: "https://avatars.githubusercontent.com/u/30373412",
    name: "Project X Team",
  };

  return (
    <div className="w-full h-full">
      <Card className="w-full h-full bg-main-text-main" radius="sm">
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
            <Avatar isBordered size="lg" radius="full" src={groupData.image} />
            <h1 className="font-bold">{groupData.name}</h1>
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
              <PopoverContent className="p-0 rounded-full" >
                <ChatGroupDetails />
              </PopoverContent>
            </Popover>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          {conversationStatus === null && (
            <div className="w-full h-full grid place-items-center">
              <Progress
                size="sm"
                color="warning"
                isIndeterminate
                aria-label="Conversation Loading..."
                label="Conversation Loading..."
                className="max-w-md"
              />
            </div>
          )}
          {!conversationStatus && (
            <div className="w-full h-full grid place-items-center">
              <h1 className="text-lg font-bold tracking-widest capitalize text-center text-danger animate-pulse">
                Seems Like Conversation has not started yet.
              </h1>
            </div>
          )}
          {conversationStatus === true && (
            <section>
              <GroupChatsContainer />
            </section>
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
              />
              <Button
                color="primary"
                variant="solid"
                isIconOnly
                radius="sm"
                title="Send Message"
              >
                <VscSend className="text-lg" />
              </Button>
            </div>
          </div>
          <div className="w-full h-auto flex items-center flex-wrap gap-2">
            {/* <span className="text-xs text-default-500">Atachments :</span>
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

export default GroupChatsPage;
