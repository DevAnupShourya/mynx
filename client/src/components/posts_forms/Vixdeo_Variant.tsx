import { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Chip,
} from "@nextui-org/react";

import useGetCookie from "~/utils/hooks/useGetCookie";
import { toast } from "react-toastify";
import { uploadPosts } from "~/services/Posts/Posts.services";

import findTagsInText from "~/utils/functions/findTagsInText";

import { PostDataInterface } from "~/types/post.types";

import PostFormVideoCollage from "~/components/video_views/PostFormVideoCollage";
import Toast from "~/components/custom_toast/Toast";

import { TbSend } from "react-icons/tb";
import { MdOndemandVideo } from "react-icons/md";
import { IoVideocamOutline } from "react-icons/io5";

export default function VixdeoUpload() {
  const MAX_VIDEO_SIZE_ALLOWED = 100;
  const navigate = useNavigate();

  const token = useGetCookie();
  const [submitBtnLoadingStatus, setSubmitBtnLoadingStatus] = useState(false);

  const [postData, setPostData] = useState<PostDataInterface>({
    title: "",
    images: [],
    tags: [],
    videos: [],
    imagesDisplay: [],
    videosDisplay: [],
    postType: "Vixdeo",
    description: "",
    pollOptions: null,
  });

  const videoInputRef = useRef<HTMLInputElement | null>(null);
  function clickVideoInput() {
    videoInputRef.current?.click();
  }
  function handleVideoInputChange() {
    toast.loading("Please wait.. getting your video onboard!", {
      toastId: "video_wait_1",
    });
    if (videoInputRef.current?.files?.length) {
      if (videoInputRef.current.files.length > 1) {
        Toast.warning("Not Allowed More Than 1 Video!!!");
        return;
      }
      const videoFiles = videoInputRef.current.files as FileList;
      const videoBlob = videoFiles[0];
      const videoSizeInMB = videoBlob.size / (1024 * 1024);

      if (videoSizeInMB > MAX_VIDEO_SIZE_ALLOWED) {
        // ? Alert the user if the file size exceeds 100MB
        Toast.warning(
          `Video file size exceeds the limit ${MAX_VIDEO_SIZE_ALLOWED}MB`
        );
        return;
      }

      const reader = new FileReader() as FileReader;

      reader.onload = (event) => {
        setPostData((prevData: PostDataInterface) => ({
          ...prevData,
          videos: [...prevData.videos!, event.target?.result as string],
          videosDisplay: [
            ...prevData.videosDisplay!,
            URL.createObjectURL(videoBlob),
          ],
        }));
      };
      reader.onerror = (event) => {
        Toast.error(`Error While Loading Video: ${event.target}`);
        console.error(`Error While Loading Video: ${event.target}`);
      };

      reader.readAsDataURL(videoBlob);
    }
    toast.done("video_wait_1");
  }

  const handlePostSubmission = async (e: FormEvent) => {
    e.preventDefault();
    if (postData.tags.length === 0) {
      Toast.warning("Add one tag in your description At least");
    } else {
      if (postData.videos?.length === 0) {
        Toast.warning("Add Your Video Please!");
      } else {
        setSubmitBtnLoadingStatus(true);
        try {
          const res = await uploadPosts(postData, token!);
          Toast.success(res?.data.message);

          navigate("/", { replace: true });

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          Toast.error(error.response.data.message);
          console.error(
            "Error Uploading Post Data: ",
            error.response.data.message
          );
        }
        setSubmitBtnLoadingStatus(false);
      }
    }
  };
  return (
    <Card radius="lg" className="w-full bg-main-text-main">
      <CardHeader className="flex gap-5">
        <MdOndemandVideo className="text-4xl" />
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
              const foundTags = findTagsInText(postData.description as string);
              setPostData({
                ...postData,
                tags: foundTags,
                description: e.target.value,
              });
            }}
          />
          <br />
          {postData.videos && (
            <div
              className={`grid gap-1 place-items-center  ${
                postData.videos.length === 1
                  ? "grid-cols-1"
                  : postData.videos.length <= 4
                    ? "grid-cols-2"
                    : postData.videos.length <= 6
                      ? "grid-cols-3"
                      : postData.videos.length <= 8
                        ? "grid-cols-4"
                        : ""
              }`}
            >
              {postData.videosDisplay!.map((video, index) => {
                return (
                  <PostFormVideoCollage
                    key={`${video}-${index}`}
                    index={index}
                    video={video}
                    setPostData={setPostData}
                  />
                );
              })}
            </div>
          )}
          <br />
          {postData.tags.length >= 1 && (
            <div className="flex gap-4 flex-wrap">
              {postData.tags.map((tag, index) => {
                return (
                  <Chip
                    size="sm"
                    color="danger"
                    variant="shadow"
                    className="lowercase"
                    key={`${tag}-${index}`}
                  >
                    {tag}
                  </Chip>
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
              isDisabled={
                postData.videosDisplay
                  ? postData.videosDisplay.length >= 1
                  : false
              }
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
            isLoading={submitBtnLoadingStatus}
          >
            Publish
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
