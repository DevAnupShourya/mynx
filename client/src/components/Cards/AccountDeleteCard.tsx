import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const cookie = import.meta.env.VITE_COOKIE_NAME as string;

import Toast from "~/components/custom_toast/Toast";
import { deleteUser } from "~/services/Users/User.services";

function AccountDeleteCard() {
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [isReqProcessing, setIsReqProcessing] = useState(false);

  const deleteAccount = async () => {
    setIsReqProcessing(true);
    try {
      const response = await deleteUser();
      Cookies.remove(cookie);
      Toast.success(response?.data.message);

      navigate("/", { replace: true });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      Toast.error(error.response.data.message);
      console.error("Error Update user data:", error.response.data.message);
    }
    setIsReqProcessing(false);
  };

  return (
    <div>
      <h1 className="text-xl font-semibold tracking-widest capitalize text-light-main dark:text-dark-main my-2">
        This will deactivate your account
      </h1>
      <p>
        You’re about to start the process of deactivating your Mynx account.
        Your display name, @username, and public profile will no longer be
        viewable on Mynx.com and all supported platforms by us.
      </p>
      <Button
        color="danger"
        variant="flat"
        fullWidth
        onPress={onOpen}
        isLoading={isReqProcessing}
      >
        Delete
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Account Delete
              </ModalHeader>
              <ModalBody>
                Are you sure you want to delete your account?
              </ModalBody>
              <ModalFooter>
                <Button color="warning" variant="light" onPress={onClose}>
                  No
                </Button>
                <Button
                  color="danger"
                  onPress={onClose}
                  isLoading={isReqProcessing}
                  onClick={deleteAccount}
                >
                  Yes! Delete It
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default AccountDeleteCard;
