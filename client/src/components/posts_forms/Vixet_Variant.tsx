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
  Chip,
} from "@nextui-org/react";

import { TbSend } from "react-icons/tb";
import { FcEditImage } from "react-icons/fc";
import { MdOutlineGifBox, MdOutlineBrokenImage } from "react-icons/md";


import { uploadPosts } from "~/services/Posts/Posts.services";

import findTagsInText from "~/utils/functions/findTagsInText";
import { PostDataInterface } from "~/types/post.types";

import PostFormVideoCollage from "~/components/video_views/PostFormVideoCollage";
import PostFormImageCollageWithPreview from "~/components/image_views/PostFormImageCollageWithPreview";
import Toast from "~/components/custom_toast/Toast";

export default function VixetUpload() {
  const MAX_IMAGES_ALLOWED = 6;
  const MAX_IMAGES_SIZE_ALLOWED = 2;
  const MAX_VIDEOS_ALLOWED = 2;
  const MAX_VIDEOS_SIZE_ALLOWED = 10;
  const navigate = useNavigate();

  
  const [submitBtnLoadingStatus, setSubmitBtnLoadingStatus] = useState(false);

  const [postData, setPostData] = useState<PostDataInterface>({
    title: "",
    images: [],
    tags: [],
    videos: [],
    imagesDisplay: [],
    videosDisplay: [],
    postType: "Vixet",
    description: "",
    pollOptions: null,
  });

  const imagesInputRef = useRef<HTMLInputElement | null>(null);
  function handleImageInputChange() {
    // ? Checking user input has something or not
    if (imagesInputRef.current?.files?.length) {
      // ? Checking user files are not more than 4
      if (imagesInputRef.current.files.length > MAX_IMAGES_ALLOWED) {
        Toast.warning(`Not Allowed More Than ${MAX_IMAGES_ALLOWED} Images!!!`);
        return;
      } else {
        const imageFiles = imagesInputRef.current.files as FileList;
        for (let i = 0; i < imageFiles.length; i++) {
          const imageBlob = imageFiles[i];
          const imageSizeInMB = imageBlob.size / (1024 * 1024);

          if (imageSizeInMB > MAX_IMAGES_SIZE_ALLOWED) {
            // ? Alert the user if the file size exceeds 4MB
            Toast.warning(
              `File ${imageBlob.name} exceeds ${MAX_IMAGES_SIZE_ALLOWED}MB size limit!`
            );
            return;
          }

          const reader = new FileReader() as FileReader;

          reader.onload = (event) => {
            setPostData((prevData) => ({
              ...prevData,
              images: [...prevData.images!, event.target?.result as string],
              imagesDisplay: [
                ...prevData.imagesDisplay!,
                URL.createObjectURL(imageBlob),
              ],
            }));
          };
          reader.onerror = (event) => {
            console.error(`Error While Loading Image: ${event.target}`);
            Toast.error(`Error While Loading Image: ${event.target}`);
          };

          reader.readAsDataURL(imageBlob);
        }
      }
    }
  }

  const videoInputRef = useRef<HTMLInputElement | null>(null);
  function handleVideoInputChange() {
    if (videoInputRef.current?.files?.length) {
      if (videoInputRef.current.files.length > MAX_VIDEOS_ALLOWED) {
        Toast.warning(`Not Allowed More Than ${MAX_VIDEOS_ALLOWED} GIFs!!!`);
        return;
      }
      const videoFiles = videoInputRef.current.files as FileList;
      for (let i = 0; i < videoFiles.length; i++) {
        const videoBlob = videoFiles[i];
        const videoSizeInMB = videoBlob.size / (1024 * 1024);

        if (videoSizeInMB > MAX_VIDEOS_SIZE_ALLOWED) {
          // TODO Alert Here!
          // ? Alert the user if the file size exceeds 10MB
          Toast.warning(
            `Video file size exceeds the limit ${MAX_VIDEOS_SIZE_ALLOWED}MB`
          );
          return;
        }

        const reader = new FileReader() as FileReader;

        reader.onload = (event) => {
          setPostData((prevData) => ({
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
    }
  }

  const handlePostSubmission = async (e: FormEvent) => {
    e.preventDefault();
    if (postData.tags.length === 0) {
      Toast.warning("Add one tag in your Title At least");
    } else {
      setSubmitBtnLoadingStatus(true);
      try {
        const res = await uploadPosts(postData);
        Toast.success(res?.data.message);

        navigate("/", { replace: true });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        Toast.error(error.response.data.message);
        console.error(
          "Error Uploading Post Data : ",
          error.response.data.message
        );
      }
      setSubmitBtnLoadingStatus(false);
    }
  };

  return (
    <Card radius="lg" className="w-full bg-main-text-main">
      <CardHeader className="flex gap-5">
        <FcEditImage className="text-4xl" />
        <div className="flex flex-col">
          <p className="text-sm">Vixet</p>
          <p className="text-xs text-default-500">
            Simple, playful, and perfect for short text and image/video combos.
          </p>
        </div>
      </CardHeader>
      <Divider />
      <form onSubmit={handlePostSubmission}>
        <CardBody>
          <Textarea
            variant="underlined"
            label="Title"
            name="title"
            description="You can add # (hashtags) also like #coding #science | Just press space if added"
            labelPlacement="inside"
            placeholder="What's up!!"
            min={5}
            max={100}
            isRequired={true}
            value={postData.title}
            onChange={(e) => {
              const foundTags = findTagsInText(postData.title as string);
              setPostData({
                ...postData,
                title: e.target.value,
                tags: foundTags,
              });
            }}
          />
          <br />
          {postData.images && (
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
              {postData.images.map((image, index) => {
                return (
                  <PostFormImageCollageWithPreview
                    key={`${image}-${index}`}
                    index={index}
                    image={image}
                    setPostData={setPostData}
                  />
                );
              })}
            </div>
          )}
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
          {postData.tags && (
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
          <div className="flex flex-row gap-4">
            <Tooltip content="Upload Image">
              <Button
                color="default"
                isIconOnly
                variant="flat"
                isDisabled={
                  postData.images && postData.videos
                    ? postData.images.length >= 4 || postData.videos.length >= 1
                    : false
                }
                aria-label="Image Upload"
                onClick={() => {
                  imagesInputRef.current?.click();
                }}
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
                isDisabled={
                  postData.images && postData.videos
                    ? postData.images.length >= 1 || postData.videos.length >= 2
                    : false
                }
                aria-label="GIF Upload"
                onClick={() => {
                  videoInputRef.current?.click();
                }}
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
            isLoading={submitBtnLoadingStatus}
            startContent={<TbSend />}
          >
            Publish
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
