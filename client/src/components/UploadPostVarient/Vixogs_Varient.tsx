import { FormEvent, useRef, useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Divider,
  Button,
  CardHeader,
  Textarea,
  Tooltip,
  Input,
} from "@nextui-org/react";

import { TbSend } from "react-icons/tb";
import { ImBlog } from "react-icons/im";
import { MdOutlineGifBox, MdOutlineBrokenImage } from "react-icons/md";

import { ImageUpload, VideoUpload } from "~/components/components.barrel";

export default function VixogsUpload() {
  const [postData, setPostData] = useState({
    title: "" as string,
    description: "" as string,
    content: "" as string,
    images: [] as string[],
    imagesDisplay: [] as string[],
    video: [] as string[],
    videoDisplay: [] as string[],
    tags: "" as string,
    // TODO : tags: [] as string[],
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
            setPostData((prevData) => ({
              ...prevData,
              images: [...prevData.images, event.target?.result as string],
              imagesDisplay: [
                ...prevData.imagesDisplay,
                URL.createObjectURL(imageBlob),
              ],
            }));
          };
          reader.onerror = (event) => {
            console.warn(event.target + " Error While Loading Images", event);
          };

          reader.readAsArrayBuffer(imageBlob);
        }
      }
    }
  }

  const videoInputRef = useRef<HTMLInputElement | null>(null);
  function clickVideoInput() {
    videoInputRef.current?.click();
  }
  function handleVideoInputChange() {
    if (videoInputRef.current?.files?.length) {
      if (videoInputRef.current.files.length > 2) {
        // TODO Alert Here!
        window.alert("Not Allowed More Than 2 GIFs!!!");
        return;
      }
      const videoFiles = videoInputRef.current.files as FileList;
      for (let i = 0; i < videoFiles.length; i++) {
        const videoBlob = videoFiles[i];
        const videoSizeInMB = videoBlob.size / (1024 * 1024);

        if (videoSizeInMB > 100) {
          // TODO Alert Here!
          // ? Alert the user if the file size exceeds 100MB
          window.alert(`Video file size exceeds the limit (100MB)`);
          return;
        }

        const reader = new FileReader() as FileReader;

        reader.onload = (event) => {
          setPostData((prevData) => ({
            ...prevData,
            video: [...prevData.video, event.target?.result as string],
            videoDisplay: [
              ...prevData.videoDisplay,
              URL.createObjectURL(videoBlob),
            ],
          }));
        };
        reader.onerror = (event) => {
          console.warn(event.target + " Error While Loading Video", event);
        };

        reader.readAsArrayBuffer(videoBlob);
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
        <ImBlog  className="text-4xl" />
        <div className="flex flex-col">
          <p className="text-sm">Vixogs</p>
          <p className="text-xs text-default-500">
            Long, unique, and instantly suggests in-depth blog posts.
          </p>
        </div>
      </CardHeader>
      <Divider />
      <form onSubmit={handlePostSubmission}>
        <CardBody>
          <Input
            variant="underlined"
            label="Blog Title"
            name="title"
            labelPlacement="inside"
            placeholder="Nice Title of Your Blog post"
            isRequired={true}
            value={postData.title}
            onChange={(e) => {
              setPostData({ ...postData, title: e.target.value });
            }}
          />
          <br />
          <Textarea
            variant="underlined"
            label="Description"
            name="description"
            labelPlacement="inside"
            placeholder="What's up!!"
            isRequired={true}
            value={postData.description}
            onChange={(e) => {
              setPostData({ ...postData, description: e.target.value });
            }}
          />
          <br />
          <Textarea
            variant="underlined"
            label="Content"
            name="content"
            labelPlacement="inside"
            placeholder="Your Long blog"
            isRequired={true}
            value={postData.content}
            onChange={(e) => {
              setPostData({ ...postData, content: e.target.value });
            }}
          />
          <br />
          <Input
            variant="underlined"
            label="Tags"
            name="tags"
            labelPlacement="inside"
            placeholder="Nice Tags for your Blog post"
            isRequired={true}
            value={postData.tags}
            onChange={(e) => {
              setPostData({ ...postData, tags: e.target.value });
            }}
          />
          <br />
          {postData.images.length >= 1 && (
            <div
              className={`grid gap-1 place-items-center  ${
                postData.images.length === 1
                  ? "grid-cols-1"
                  : postData.images.length <= 4
                  ? "grid-cols-2"
                  : postData.images.length <= 6
                  ? "grid-cols-3"
                  : postData.images.length <= 8
                  ? "grid-cols-4"
                  : ""
              }`}
            >
              {postData.imagesDisplay.map((image, index) => {
                return (
                  <ImageUpload
                    key={`${image}-${index}`}
                    index={index}
                    image={image}
                    setPostData={setPostData}
                  />
                );
              })}
            </div>
          )}
          <br />
          {postData.video.length >= 1 && (
            <div
              className={`grid gap-1 place-items-center  ${
                postData.video.length === 1
                  ? "grid-cols-1"
                  : postData.video.length <= 4
                  ? "grid-cols-2"
                  : postData.video.length <= 6
                  ? "grid-cols-3"
                  : postData.video.length <= 8
                  ? "grid-cols-4"
                  : ""
              }`}
            >
              {postData.videoDisplay.map((video, index) => {
                return (
                  <VideoUpload
                    key={`${video}-${index}`}
                    index={index}
                    video={video}
                    setPostData={setPostData}
                  />
                );
              })}
            </div>
          )}
        </CardBody>
        <Divider />
        <CardFooter className="justify-between">
          <div className="flex flex-row gap-4">
            <Tooltip content="Upload Image">
              <Button
                color="default"
                isIconOnly
                variant="flat"
                isDisabled={postData.images.length >= 4}
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
            <Tooltip content="Upload Video">
              <Button
                color="default"
                isIconOnly
                variant="flat"
                isDisabled={postData.video.length > 2}
                aria-label="GIF Upload"
                onClick={clickVideoInput}
              >
                <input
                  type="file"
                  accept="video/mp4,video/webm,video/x-matroska,video/mov,video/avi"
                  ref={videoInputRef}
                  style={{ display: "none" }}
                  multiple
                  onChange={handleVideoInputChange}
                />

                <MdOutlineGifBox className="text-2xl" />
              </Button>
            </Tooltip>
          </div>
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
