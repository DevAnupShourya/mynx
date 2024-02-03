import { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  CardFooter,
  Divider,
  Button,
  CardHeader,
  Tooltip,
  Input,
  Chip,
} from "@nextui-org/react";

import PostFormImageCollageWithPreview from "~/components/image_views/PostFormImageCollageWithPreview";

import { TbSend } from "react-icons/tb";
import { FcPicture } from "react-icons/fc";
import { MdOutlineBrokenImage } from "react-icons/md";

import useGetCookie from "~/utils/hooks/useGetCookie";
import { uploadPosts } from "~/services/Posts/Posts.services";

import Toast from "~/components/custom_toast/Toast";
import { PostDataInterface } from "~/types/post.types";
import findTagsInText from "~/utils/functions/findTagsInText";

export default function VixsnapUpload() {
  const MAX_IMAGES_ALLOWED = 6;
  const MAX_IMAGES_SIZE_ALLOWED = 2;
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
    postType: "Vixsnap",
    description: "",
    pollOptions: null,
  });

  const imagesInputRef = useRef<HTMLInputElement | null>(null);
  function clickImageInput() {
    imagesInputRef.current?.click();
  }
  function handleImageInputChange() {
    // ? Checking user input has something or not
    if (imagesInputRef.current?.files?.length) {
      // ? Checking user files are not more than MAX_IMAGES_ALLOWED
      if (
        imagesInputRef.current.files.length > MAX_IMAGES_ALLOWED &&
        postData.images!.length > MAX_IMAGES_ALLOWED
      ) {
        Toast.warning(`Not Allowed More Than ${MAX_IMAGES_ALLOWED} Images!!!`);
        return;
      } else {
        const imageFiles = imagesInputRef.current.files as FileList;
        for (let i = 0; i < imageFiles.length; i++) {
          const imageBlob = imageFiles[i];
          const imageSizeInMB = imageBlob.size / (1024 * 1024);

          if (imageSizeInMB > MAX_IMAGES_SIZE_ALLOWED) {
            // ? Alert the user if the file size exceeds 1MB
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
            console.warn(event.target + " Error While Loading Images", event);
            Toast.error(`Error While Loading Image ${event.target}`);
          };

          reader.readAsDataURL(imageBlob);
        }
      }
    }
  }

  const handlePostSubmission = async (e: FormEvent) => {
    e.preventDefault();
    if (postData.tags.length === 0) {
      Toast.warning("Add one tag in your Title At least");
    } else {
      if (postData.images!.length > MAX_IMAGES_ALLOWED) {
        Toast.warning(
          `Sorry! Images More Than ${MAX_IMAGES_ALLOWED} not Allowed!`
        );
      } else {
        setSubmitBtnLoadingStatus(true);
        try {
          const res = await uploadPosts(postData, token!);
          console.log(postData);
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
        <FcPicture className="text-4xl" />
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
          <Input
            variant="underlined"
            label="Tags"
            name="title"
            description="You can add # (hashtags) also like #coding #science"
            labelPlacement="inside"
            placeholder="#vibing"
            isRequired={true}
            onChange={(e) => {
              const foundTags = findTagsInText(e.target.value as string);
              setPostData({
                ...postData,
                tags: foundTags,
              });
            }}
          />

          {postData.images ? (
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
          ) : (
            <h1 className="text-warning-500 text-center text-xs">
              Your Image will Show here.
            </h1>
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
          <Tooltip content="Add Image">
            <Button
              color="default"
              isIconOnly
              variant="flat"
              isDisabled={
                postData.imagesDisplay
                  ? postData.imagesDisplay.length >= MAX_IMAGES_ALLOWED
                  : false
              }
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
            isLoading={submitBtnLoadingStatus}
          >
            Publish
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
