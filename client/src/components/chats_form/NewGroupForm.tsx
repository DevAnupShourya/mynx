import {
  Divider,
  Image,
  Input,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";
import { useRef, useState } from "react";
import { TiUserAddOutline } from "react-icons/ti";

import { useAppSelector } from "~/utils/hooks/redux.hooks";
import Toast from "~/components/custom_toast/Toast";
import ProfilesListWithState from "~/components/profile/ProfilesListWithState";
import ProfilePreview from "~/components/profile/ProfilePreview";

import { LuBadgeMinus } from "react-icons/lu";
import { RiImageEditFill } from "react-icons/ri";

function NewGroupForm({ closeFn }: { closeFn: () => void }) {
  const themeState = useAppSelector((state) => state.theme.mode);
  const groupImageInputRef = useRef<HTMLInputElement | null>(null);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [groupMembersId, setGroupMembersId] = useState<string[]>([]);

  const [isSubmitBtnLoading, setIsSubmitBtnLoading] = useState(false);
  const [inputErrorMsg, setInputErrorMsg] = useState("");
  const [groupData, setGroupData] = useState<{
    groupImage: string;
    groupName: string;
    groupMembers: string[];
  }>({
    groupImage: "https://avatars.githubusercontent.com/u/40372425?v=1",
    groupName: "",
    groupMembers: [],
  });

  async function handleGroupCreation() {
    setIsSubmitBtnLoading(true);
    setInputErrorMsg("");
    try {
      if (groupData.groupName === "") {
        setInputErrorMsg("Enter Group Name");
      } else {
        setGroupData((prevGroupData) => ({
          ...prevGroupData,
          groupMembers: groupMembersId,
        }));

        if (groupData.groupMembers.length < 2) {
          Toast.warning("At least 2 Members required to create a group!");
        }
        console.log(groupData);

        setIsSubmitBtnLoading(false);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      Toast.error(`Error : ${error.response.data.message}`);
      console.error("Error :", error.response.data.message);
    }
    setIsSubmitBtnLoading(false);
    closeFn();
  }

  function handleGroupImageChange() {
    if (groupImageInputRef.current?.files?.[0]) {
      const file = groupImageInputRef.current.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        setGroupData({
          ...groupData,
          groupImage: event.target?.result as string,
        });
      };

      reader.onerror = (event) => {
        console.error(`Error : ${event.target}`);
      };

      reader.readAsDataURL(file);
    }
  }

  return (
    <div className="w-full h-auto">
      <div className="flex flex-row justify-between">
        <h4 className="capitalize text-lg">Group Image :</h4>
        <Button
          variant="bordered"
          color="warning"
          isIconOnly
          onClick={() => {
            groupImageInputRef.current?.click();
          }}
        >
          <RiImageEditFill className="text-lg" />
          <input
            type="file"
            ref={groupImageInputRef}
            name="groupImage"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleGroupImageChange}
          />
        </Button>
      </div>
      <div className="w-1/4 h-auto my-4 mx-auto grid place-items-center">
        <Image className="rounded-full" src={groupData.groupImage} />
      </div>
      <Input
        size="lg"
        type="text"
        label="Group Name"
        variant="faded"
        value={groupData.groupName}
        onChange={(e) => {
          setGroupData({ ...groupData, groupName: e.target.value });
        }}
        errorMessage={inputErrorMsg}
        isRequired
      />
      <Divider className="my-2" />
      <div className="flex flex-row justify-between items-center">
        <h4 className="capitalize text-lg">
          Group members | {groupMembersId.length} Added
        </h4>
        <Button variant="bordered" color="warning" onPress={onOpen} isIconOnly>
          <TiUserAddOutline className="text-lg" />
        </Button>
      </div>
      <section className="w-full h-auto flex flex-col gap-4 my-4">
        {groupMembersId && groupMembersId.length < 1 && (
          <h1>No Users Selected.</h1>
        )}
        {groupMembersId.length > 0 &&
          groupMembersId.map((userId) => {
            return (
              <div
                key={userId}
                className="w-full h-auto flex flex-row flex-nowrap justify-between items-center"
              >
                <ProfilePreview userId={userId} />
                <Button
                  variant="flat"
                  color="warning"
                  isIconOnly
                  title="Chat With This User"
                  onClick={() => {
                    setGroupMembersId((previousMembers) =>
                      previousMembers.filter((memberId) => memberId !== userId)
                    );
                  }}
                >
                  <LuBadgeMinus className="text-lg" title="Remove This User" />
                </Button>
              </div>
            );
          })}
      </section>
      <Divider className="my-2" />
      <Button
        variant="flat"
        color="primary"
        fullWidth
        isLoading={isSubmitBtnLoading}
        onClick={handleGroupCreation}
      >
        Create
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className={`${themeState}`}
        scrollBehavior="inside"
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="text-default-700">Find User</ModalHeader>
              <ModalBody className="text-default-500">
                <ProfilesListWithState
                  groupMembersId={groupMembersId}
                  setGroupMembersId={setGroupMembersId}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default NewGroupForm;