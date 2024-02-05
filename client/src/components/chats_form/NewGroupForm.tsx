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
  Textarea,
} from "@nextui-org/react";
import { useRef, useState } from "react";
import { TiUserAddOutline } from "react-icons/ti";

import { useAppSelector } from "~/utils/hooks/redux.hooks";
import Toast from "~/components/custom_toast/Toast";
import ProfilesListWithState from "~/components/profile/ProfilesListWithState";
import ProfilePreview from "~/components/profile/ProfilePreview";

import { LuBadgeMinus } from "react-icons/lu";
import { RiImageEditFill } from "react-icons/ri";
import { GroupFormType } from "~/types/chat.types";
import { createGroupChat } from "~/services/Chats/Chats.services";

import { useNavigate } from "react-router-dom";

function NewGroupForm({ closeFn }: { closeFn: () => void }) {
  const navigate = useNavigate();
  const themeState = useAppSelector((state) => state.theme.mode);

  const groupImageInputRef = useRef<HTMLInputElement | null>(null);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [groupMembersId, setGroupMembersId] = useState<string[]>([]);

  const [isSubmitBtnLoading, setIsSubmitBtnLoading] = useState(false);
  const [nameErrorMsg, setNameErrorMsg] = useState("");
  const [descErrorMsg, setDescErrorMsg] = useState("");

  const [groupFormData, setGroupFormData] = useState<GroupFormType>({
    groupImage: "https://avatars.githubusercontent.com/u/40372425?v=1",
    groupName: "",
    groupDescription: "",
  });

  async function handleGroupCreation() {
    setIsSubmitBtnLoading(true);
    setNameErrorMsg("");
    setDescErrorMsg("");

    //  ? mutating from child component
    setGroupFormData((prevGroupData) => ({
      ...prevGroupData,
      participants: groupMembersId,
    }));

    // ? validating group name
    if (groupFormData.groupName === "" || groupFormData.groupName === " ") {
      setNameErrorMsg("Enter Group Name!!");
      setIsSubmitBtnLoading(false);
      return;
    }

    if (
      groupFormData.groupDescription === "" ||
      groupFormData.groupDescription === " "
    ) {
      setDescErrorMsg("Enter Group Description!!");
      setIsSubmitBtnLoading(false);
      return;
    }

    // ? validating group participants array
    if (
      groupMembersId.length === 0 ||
      groupMembersId.length < 2 ||
      groupMembersId.length > 11
    ) {
      window.alert(
        "Minimum 2 and maximum 11 members required to create a group!"
      );
      setIsSubmitBtnLoading(false);
      return;
    }

    try {
      const groupResponse = await createGroupChat(
        groupFormData,
        groupMembersId
      );
      // ? closing modal and redirecting user to the group
      closeFn();
      Toast.success(`Group Created Successfully.`);
      navigate(`/chats/groups/${groupResponse._id}`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      Toast.error(`${error.response.data.message}`);
      console.error("Error :", error.response.data.message);
    }
    setIsSubmitBtnLoading(false);
  }

  function handleGroupImageChange() {
    if (groupImageInputRef.current?.files?.[0]) {
      const file = groupImageInputRef.current.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        setGroupFormData({
          ...groupFormData,
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
          title="Add Group Image"
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
        <Image className="rounded-full" src={groupFormData.groupImage} />
      </div>
      <Input
        size="lg"
        type="text"
        label="Group Name"
        variant="faded"
        value={groupFormData.groupName}
        onChange={(e) => {
          setGroupFormData({ ...groupFormData, groupName: e.target.value });
        }}
        errorMessage={nameErrorMsg}
        isRequired
      />
      <br />
      <Textarea
        size="lg"
        type="text"
        label="Group Description"
        variant="faded"
        value={groupFormData.groupDescription}
        onChange={(e) => {
          setGroupFormData({
            ...groupFormData,
            groupDescription: e.target.value,
          });
        }}
        errorMessage={descErrorMsg}
        isRequired
      />
      <Divider className="my-2" />
      <div className="flex flex-row justify-between items-center">
        <h4 className="capitalize text-lg">
          Group members | {groupMembersId.length} Added
        </h4>
        <Button
          variant="bordered"
          color="warning"
          onPress={onOpen}
          isIconOnly
          title="Add Group Members"
        >
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
        isDisabled={groupMembersId.length < 2}
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
