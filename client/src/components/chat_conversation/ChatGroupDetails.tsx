import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Button,
  Chip,
} from "@nextui-org/react";
import { useAppSelector } from "~/utils/hooks/redux.hooks";
import { HiUserRemove } from "react-icons/hi";
import ProfilePreview from "~/components/profile/ProfilePreview";
import { useEffect, useState } from "react";
import {
  getGroupChat,
  removeUserByAdmin,
} from "~/services/Chats/Chats.services";
import useGetCookie from "~/utils/hooks/useGetCookie";
import Toast from "../custom_toast/Toast";

function ChatGroupDetails({ groupId }: { groupId: string }) {
  const theme = useAppSelector((state) => state.theme.mode);
  const currentUserId = useAppSelector((state) => state.user.userId);
  const token = useGetCookie();

  const [groupDetails, setGroupDetails] = useState({
    image: "",
    name: "",
    description: "",
    admin: "",
    members: [],
  });

  const getGroupDetails = async () => {
    try {
      const groupChatData = await getGroupChat(groupId!, token!);
      setGroupDetails({
        name: groupChatData.groupName,
        image: groupChatData.groupImage,
        description: groupChatData.groupDescription,
        admin: groupChatData.admin,
        members: groupChatData.participants,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      Toast.error(error.response.data.message);
      console.error(`@getChatDetails : ${error.response.data.message}`);
    }
  };

  useEffect(() => {
    getGroupDetails();
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  const handleRemoveUser = async (userIdToRemove: string) => {
    console.log(`remove ${userIdToRemove}`);

    try {
      const removedResponse = await removeUserByAdmin(
        groupId,
        userIdToRemove,
        token!
      );
      Toast.success(removedResponse.message);
      setGroupDetails({
        ...groupDetails,
        members: removedResponse.responseData.participants,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      Toast.error(error.response.data.message);
      console.error(`@getChatDetails : ${error.response.data.message}`);
    }
  };

  return (
    <Card className={`${theme} max-md:max-w-[300px] max-w-[400px]`} radius="sm">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          radius="sm"
          src={groupDetails.image}
          height={40}
          width={40}
          isZoomed
        />
        <div className="flex flex-col">
          <p className="text-md capitalize">{groupDetails.name}</p>
          <p className="text-small text-default-500 capitalize">
            {groupDetails.description}
          </p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="max-h-96 gap-2 overflow-y-scroll ">
        {groupDetails.members.map((user) => {
          return (
            <ProfilePreview
              userId={user}
              key={user}
              endContent={
                groupDetails.admin === user ? (
                  <Chip color="warning" variant="shadow">
                    Admin
                  </Chip>
                ) : groupDetails.admin === currentUserId ? (
                  <Button
                    title="Remove this User"
                    size="sm"
                    isIconOnly
                    color="danger"
                    variant="faded"
                    onClick={() => handleRemoveUser(user)}
                  >
                    <HiUserRemove />
                  </Button>
                ) : null
              }
            />
          );
        })}
      </CardBody>
      <Divider />
      <CardFooter className="gap-2 flex-wrap">
        <Button
          fullWidth
          color="warning"
          variant="light"
          className="capitalize"
          radius="sm"
          title="report User"
        >
          report {groupDetails.name}
        </Button>
        <Button
          fullWidth
          color="danger"
          variant="flat"
          className="capitalize"
          radius="sm"
          title="Block User"
        >
          Block {groupDetails.name}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ChatGroupDetails;
