import {
  Button,
  Image,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

import { TfiFullscreen } from "react-icons/tfi";
import { MdDeleteOutline } from "react-icons/md";

type ImageUploadProps = {
  index?: number;
  image: string;
  setPostData: React.Dispatch<
    React.SetStateAction<{
      description: string;
      images: string[];
      imagesDisplay: string[];
      videoDisplay: string[];
      video: string[];
    }>
  >;
};

export default function ImageUpload({
  index,
  image,
  setPostData,
}: ImageUploadProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className={`relative`}>
      <div className="absolute z-20 top-4 right-4">
        <Button
          size="sm"
          variant="bordered"
          isIconOnly
          color="danger"
          title="Delete Image"
          className="font-medium text-large mr-1"
          onClick={() => {
            setPostData((prevData) => ({
              ...prevData,
              images: prevData.images.filter((_, i) => i !== index),
              imagesDisplay: prevData.imagesDisplay.filter(
                (_, i) => i !== index
              ),
            }));
          }}
        >
          <MdDeleteOutline />
        </Button>
        <Button
          title="Preview Image"
          variant="bordered"
          size="sm"
          isIconOnly
          color="warning"
          className="font-medium text-large"
          href={image}
          onPress={onOpen}
        >
          <TfiFullscreen />
        </Button>
        <Modal
          backdrop="blur"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          className="max-w-lg max-h-fit text-warning"
          radius="sm"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 text-sm">
                  View Image
                </ModalHeader>
                <ModalBody className="grid place-items-center">
                  <Image radius="none" src={image} />
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
      <Image
        width={300}
        height={400}
        radius="sm"
        src={image}
        className="z-10 h-full w-full object-cover aspect-auto"
      />
    </div>
  );
}
