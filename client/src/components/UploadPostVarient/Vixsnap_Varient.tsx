import { FormEvent, useRef, useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Divider,
  Button,
  CardHeader,
  Tooltip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Image,
} from "@nextui-org/react";

import { TbSend } from "react-icons/tb";
import { FcPicture } from "react-icons/fc";
import { MdOutlineBrokenImage } from "react-icons/md";
import { TfiFullscreen } from "react-icons/tfi";
import { MdDeleteOutline } from "react-icons/md";

export default function VixsnapUpload() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [postData, setPostData] = useState({
    images: "" as string,
    imagesDisplay: "" as string,
  });

  const imagesInputRef = useRef<HTMLInputElement | null>(null);
  function clickImageInput() {
    imagesInputRef.current?.click();
  }
  function handleImageInputChange() {
    // ? Checking user input has something or not
    if (imagesInputRef.current?.files?.length) {
      // ? Checking user files are not more than 4
      if (imagesInputRef.current.files.length > 4) {
        // TODO Alert Here!
        window.alert("Not Allowed More Than 4 Images!!!");
        return;
      } else {
        // TODO : Check file sizes
        const imageFiles = imagesInputRef.current.files as FileList;
        for (let i = 0; i < imageFiles.length; i++) {
          const imageBlob = imageFiles[i];
          const imageSizeInMB = imageBlob.size / (1024 * 1024);

          if (imageSizeInMB > 4) {
            // ? Alert the user if the file size exceeds 4MB
            window.alert(`File ${imageBlob.name} exceeds 4MB size limit!`);
            return;
          }

          const reader = new FileReader() as FileReader;

          reader.onload = (event) => {
            setPostData({
              images: event.target?.result as string,
              imagesDisplay: URL.createObjectURL(imageBlob),
            });
          };
          reader.onerror = (event) => {
            console.warn(event.target + " Error While Loading Images", event);
          };

          reader.readAsArrayBuffer(imageBlob);
        }
      }
    }
  }

  const handlePostSubmission = (e: FormEvent) => {
    e.preventDefault();
    // TODO : Take from Here
    console.log(postData);
  };
  return (
    <Card radius="lg" className="w-full bg-main-text-main">
      <CardHeader className="flex gap-5">
        <FcPicture  className="text-4xl" />
        <div className="flex flex-col">
          <p className="text-sm">Vixsnap</p>
          <p className="text-xs text-default-500">
            Captures the fleeting nature of stories while staying within your
            naming style.
          </p>
        </div>
      </CardHeader>
      <Divider />
      <form onSubmit={handlePostSubmission}>
        <CardBody>
          {postData.imagesDisplay ? (
            <div className={`grid place-items-center`}>
              <div className={`relative`}>
                <div className="absolute z-20 top-4 right-4">
                  <Button
                    size="sm"
                    variant="flat"
                    isIconOnly
                    color="danger"
                    title="Delete Image"
                    className="font-medium text-large mr-1"
                    onClick={() => {
                      setPostData({
                        images: "",
                        imagesDisplay: "",
                      });
                    }}
                  >
                    <MdDeleteOutline />
                  </Button>
                  <Button
                    title="Preview Image"
                    variant="flat"
                    size="sm"
                    isIconOnly
                    color="warning"
                    className="font-medium text-large"
                    href={postData.images}
                    onPress={onOpen}
                  >
                    <TfiFullscreen />
                  </Button>
                  <Modal
                    backdrop="blur"
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    className="max-w-screen-sm text-warning"
                    classNames={{
                      closeButton: "text-danger font-bold bg-danger-300",
                    }}
                    radius="sm"
                  >
                    <ModalContent>
                      {(onClose) => (
                        <>
                          <ModalHeader className="flex flex-col gap-1 text-sm">
                            View Image
                          </ModalHeader>
                          <ModalBody className="grid place-items-center">
                            <Image radius="none" src={postData.imagesDisplay} />
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
                  src={postData.imagesDisplay}
                  className="z-10 h-full w-full object-cover aspect-auto"
                />
              </div>
            </div>
          ) : (
            <h1 className="text-warning-500 text-center text-xs">Your Image will Show here.</h1>
          )}
        </CardBody>
        <Divider />
        <CardFooter className="justify-between">
          <Tooltip content="Add Image">
            <Button
              color="default"
              isIconOnly
              variant="flat"
              isDisabled={postData.imagesDisplay.length >= 2}
              aria-label="Image Upload"
              onClick={clickImageInput}
            >
              <MdOutlineBrokenImage className="text-2xl" />
              <input
                type="file"
                ref={imagesInputRef}
                name="images"
                accept="image/png,image/jpeg,image/webp"
                multiple
                style={{ display: "none" }}
                onChange={handleImageInputChange}
              />
            </Button>
          </Tooltip>
          <Button
            color="primary"
            variant="ghost"
            type="submit"
            startContent={<TbSend />}
          >
            Publish
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
