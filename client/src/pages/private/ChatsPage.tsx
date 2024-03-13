import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";
import { Link, Outlet, useLocation } from "react-router-dom";

import PageTitle from "~/components/title/PageTitle";
import ProfilesListToChat from "~/components/profile/ProfilesListToChat";
import NewGroupForm from "~/components/chats_form/NewGroupForm";
import { useAppSelector } from "~/utils/hooks/redux.hooks";

import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { TbUserSearch } from "react-icons/tb";
import { BiFilter } from "react-icons/bi";
import { MdOutlineMarkUnreadChatAlt } from "react-icons/md";
import { TiUserOutline } from "react-icons/ti";
import { MdOutlineGroups2 } from "react-icons/md";

export default function ChatsPage() {
  const location = useLocation();
  const isInConversation = /^\/chats\/(?!groups$)[^/]+(?:$|\/)/.test(
    location.pathname
  );

  const {
    isOpen: isOpenUser,
    onOpen: onOpenUser,
    onOpenChange: onOpenChangeUser,
  } = useDisclosure();
  const {
    isOpen: isOpenGroup,
    onOpen: onOpenGroup,
    onOpenChange: onOpenChangeGroup,
  } = useDisclosure();

  const themeState = useAppSelector((state) => state.theme.mode);

  return (
    <>
      {!isInConversation && (
        <PageTitle
          title="chats"
          children={
            <div className="flex flex-row gap-1 justify-normal items-center">
              <Button
                color="default"
                variant="light"
                className="capitalize"
                isIconOnly
                radius="sm"
                title="Find User"
                onPress={onOpenUser}
              >
                <TbUserSearch className="text-lg" />
              </Button>
              <Button
                color="default"
                variant="light"
                className="capitalize"
                isIconOnly
                radius="sm"
                title="Create Group"
                onPress={onOpenGroup}
              >
                <AiOutlineUsergroupAdd className="text-lg" />
              </Button>

              <Popover placement="bottom-end" className={`${themeState}`}>
                <PopoverTrigger>
                  <Button
                    color="default"
                    variant="light"
                    className="capitalize"
                    isIconOnly
                    radius="sm"
                    title="Filter Chats"
                  >
                    <BiFilter className="text-lg" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <h1 className="my-2 text-sm text-default-500 capitalize">
                    Filter Chats By
                  </h1>
                  <div className="flex flex-col flex-nowrap justify-start items-center gap-3">
                    <Button
                      key="unread"
                      fullWidth
                      variant="light"
                      radius="sm"
                      startContent={
                        <MdOutlineMarkUnreadChatAlt className="text-xl" />
                      }
                      className="capitalize justify-between"
                    >
                      unread
                    </Button>
                    <Button
                      key="personal"
                      fullWidth
                      variant="light"
                      radius="sm"
                      startContent={<TiUserOutline className="text-xl" />}
                      className="capitalize  justify-between"
                      as={Link}
                      to={"/chats/"}
                    >
                      personal
                    </Button>
                    <Button
                      key="groups"
                      fullWidth
                      variant="light"
                      radius="sm"
                      startContent={<MdOutlineGroups2 className="text-xl" />}
                      className="capitalize  justify-between"
                      as={Link}
                      to={"/chats/groups"}
                    >
                      groups
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          }
        />
      )}
      <div className="w-full h-auto">
        <Outlet />
      </div>
      {!isInConversation && (
        <div className="my-5">
          <h1 className="text-lg">Find All Users here</h1>
          <div>
            <ProfilesListToChat />
          </div>
        </div>
      )}
      <Modal
        isOpen={isOpenUser}
        onOpenChange={onOpenChangeUser}
        className={`${themeState}`}
        scrollBehavior="inside"
        backdrop="opaque"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-default-700">Find User</ModalHeader>
              <ModalBody className="text-default-500">
                <ProfilesListToChat closeFn={onClose} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isOpenGroup}
        onOpenChange={onOpenChangeGroup}
        className={`${themeState}`}
        scrollBehavior="inside"
        backdrop="opaque"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-default-700">
                Create New Group
              </ModalHeader>
              <ModalBody className="text-default-500">
                <NewGroupForm closeFn={onClose} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
