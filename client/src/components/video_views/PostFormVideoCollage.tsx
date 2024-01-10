import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

import { TfiFullscreen } from "react-icons/tfi";
import { MdDeleteOutline } from "react-icons/md";

import { PostDataInterface } from "~/types/post.types";

type PostFormVideoCollageProps = {
  index: number;
  video: string;
  setPostData: React.Dispatch<
    React.SetStateAction<PostDataInterface>
  >;
};

export default function PostFormVideoCollage({
  index,
  video,
  setPostData,
}: PostFormVideoCollageProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className={`relative`}>
      <div className="absolute z-20 top-4 right-4">
        <Button
          size="sm"
          variant="bordered"
          isIconOnly
          color="danger"
          title="Delete Video"
          className="font-medium text-large mr-1"
          onClick={() => {
            setPostData((prevData) => ({
              ...prevData,
              videos: prevData.videos ? prevData.videos.filter((_, i) => i !== index) : [],
              videosDisplay: prevData.videosDisplay ? prevData.videosDisplay.filter((_, i) => i !== index) : [],
            }));
          }}
        >
          <MdDeleteOutline />
        </Button>
        <Button
          title="Preview Video"
          variant="bordered"
          size="sm"
          isIconOnly
          color="warning"
          className="font-medium text-large"
          href={video}
          onPress={onOpen}
        >
          <TfiFullscreen />
        </Button>
        <Modal
          backdrop="blur"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          className="max-w-screen-md text-warning"
          classNames={{
            closeButton: "text-danger font-bold bg-danger-300",
          }}
          radius="sm"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 text-sm">
                  View Video
                </ModalHeader>
                <ModalBody className="grid place-items-center">
                  <video
                    autoPlay={false}
                    controls={true}
                    src={video}
                    className="aspect-video"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button
                    size="sm"
                    color="danger"
                    variant="solid"
                    onPress={onClose}
                  >
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
      <video
        autoPlay={false}
        controls={true}
        src={video}
        className="aspect-video rounded-lg shadow-md border"
      />
    </div>
  );
}
