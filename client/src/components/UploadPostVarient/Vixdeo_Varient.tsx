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
import { MdOndemandVideo } from "react-icons/md";
import { IoVideocamOutline } from "react-icons/io5";

import { VideoUpload } from "~/components/components.barrel";

export default function VixdeoUpload() {
  const [postData, setPostData] = useState({
    title: "" as string,
    description: "" as string,
    video: [] as string[],
    videoDisplay: [] as string[],
  });

  const videoInputRef = useRef<HTMLInputElement | null>(null);
  function clickVideoInput() {
    videoInputRef.current?.click();
  }
  function handleVideoInputChange() {
    if (videoInputRef.current?.files?.length) {
      if (videoInputRef.current.files.length > 2) {
        // TODO Alert Here!
        window.alert("Not Allowed More Than 1 Video!!!");
        return;
      }
      const videoFiles = videoInputRef.current.files as FileList;
      const videoBlob = videoFiles[0];
      const videoSizeInMB = videoBlob.size / (1024 * 1024);

      if (videoSizeInMB > 1000) {
        // TODO Alert Here!
        // ? Alert the user if the file size exceeds 100MB
        window.alert(`Video file size exceeds the limit (1GB)`);
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

  const handlePostSubmission = (e: FormEvent) => {
    e.preventDefault();
    // TODO : Take from Here
    console.log(postData);
  };
  return (
    <Card radius="lg" className="w-full bg-main-text-main">
      <CardHeader className="flex gap-5">
        <MdOndemandVideo  className="text-4xl" />
        <div className="flex flex-col">
          <p className="text-sm">Vixdeo</p>
          <p className="text-xs text-default-500">
            Rolls off the tongue and easily communicates longer video content.
          </p>
        </div>
      </CardHeader>
      <Divider />
      <form onSubmit={handlePostSubmission}>
        <CardBody>
          <Input
            variant="underlined"
            label="Video Title"
            name="title"
            labelPlacement="inside"
            placeholder="A Title that describes your video"
            min={5}
            max={100}
            isRequired={true}
            value={postData.title}
            onChange={(e) => {
              setPostData({ ...postData, title: e.target.value });
            }}
          />
          <br />
          <Textarea
            variant="underlined"
            label="Video Description"
            name="description"
            labelPlacement="inside"
            placeholder="Tell viewers more about your video"
            min={5}
            max={100}
            isRequired={true}
            value={postData.description}
            onChange={(e) => {
              setPostData({ ...postData, description: e.target.value });
            }}
          />
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
                    // TODO : make it reusable with different states
                    setPostData={setPostData}
                  />
                );
              })}
            </div>
          )}
        </CardBody>
        <Divider />
        <CardFooter className="justify-between">
          <Tooltip content="Upload Video">
            <Button
              color="default"
              isIconOnly
              variant="flat"
              isDisabled={postData.videoDisplay.length >= 1}
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

              <IoVideocamOutline className="text-2xl" />
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
