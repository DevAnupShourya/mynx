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
  Chip,
} from "@nextui-org/react";

import { TbSend } from "react-icons/tb";
import { ImBlog } from "react-icons/im";
import { MdOutlineBrokenImage } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { ImageUpload } from "~/components/components.barrel";
import useGetCookie from "~/utils/hooks/useGetCookie";
import Toast from "~/components/CustomToast/Toast";
import { uploadPosts } from "~/services/PostUpload/PostsUpload";
import findTagsInText from "~/services/findTagsInText";
import { PostDataInterface } from "~/types/types.barrel";
export default function VixogsUpload() {
  const MAX_IMAGES_ALLOWED = 1;

  const navigate = useNavigate();

  const token = useGetCookie();
  const [submitBtnLoadingStatus, setSubmitBtnLoadingStatus] = useState(false);

  // Title & Description & ImageUrl & POstType & Taggs
  const [postData, setPostData] = useState<PostDataInterface>({
    title: "",
    images: [],
    tags: [],
    videos: [],
    imagesDisplay: [],
    videosDisplay: [],
    postType: "Vixogs",
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
      // ? Checking user files are not more than 4
      if (imagesInputRef.current.files.length > MAX_IMAGES_ALLOWED) {
        // TODO Alert Here!
        window.alert(`Not Allowed More Than ${MAX_IMAGES_ALLOWED} Images!!!`);
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
              images: [...prevData.images!, event.target?.result as string],
              imagesDisplay: [
                ...prevData.imagesDisplay!,
                URL.createObjectURL(imageBlob),
              ],
            }));
          };
          reader.onerror = (event) => {
            console.warn(event.target + " Error While Loading Images", event);
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
      try {
        setSubmitBtnLoadingStatus(true);
        const res = await uploadPosts(postData, token!);
        Toast.success(res?.data.message);
        setSubmitBtnLoadingStatus(false);

        navigate("/trending", { replace: true });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setSubmitBtnLoadingStatus(false);

        Toast.error(error.response.data.message);
        console.error(
          "Error Uploading Post Data : ",
          error.response.data.message
        );
      }
    }
  };
  return (
    <Card radius="lg" className="w-full bg-main-text-main">
      <CardHeader className="flex gap-5">
        <ImBlog className="text-4xl" />
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
              const foundTags = findTagsInText(postData.title as string);
              setPostData({
                ...postData,
                title: e.target.value,
                tags: foundTags,
              });
            }}
          />
          <br />
          <Textarea
            variant="underlined"
            label="Blog Description"
            name="description"
            description={'Write your Blog in Markdown format!'}
            labelPlacement="inside"
            placeholder="What's up!!"
            isRequired={true}
            value={postData.description}
            onChange={(e) => {
              setPostData({ ...postData, description: e.target.value });
            }}
          />
          <br />
          {postData.images && (
            <div
              className={`grid gap-1 place-items-center ${
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
          <Tooltip content="Upload Cover Image of Blog">
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
