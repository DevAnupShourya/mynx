import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  CardFooter,
  Divider,
  Button,
  CardHeader,
  Input,
  Chip,
} from "@nextui-org/react";

import { TbPlus, TbSend, TbMinus } from "react-icons/tb";
import { MdOutlinePoll } from "react-icons/md";

import useGetCookie from "~/utils/hooks/useGetCookie";
import { uploadPosts } from "~/services/Posts/Posts.services";
import Toast from "~/components/custom_toast/Toast";

import findTagsInText from "~/utils/functions/findTagsInText";
import { PostDataInterface } from "~/types/post.types";

export default function VixpollUpload() {
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
    postType: "Vixpoll",
    description: "",
    pollOptions: [{ pollName: "" }, { pollName: "" }],
  });

  const handlePostSubmission = async (e: FormEvent) => {
    setSubmitBtnLoadingStatus(true);
    e.preventDefault();
    if (postData.tags.length === 0) {
      Toast.warning("Add one tag in your Title At least");
    } else {
      try {
        const res = await uploadPosts(postData, token!);
        Toast.success(res?.data.message);

        navigate("/trending", { replace: true });

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
  };

  return (
    <Card radius="lg" className="w-full bg-main-text-main">
      <CardHeader className="flex gap-5">
        <MdOutlinePoll className="text-4xl" />
        <div className="flex flex-col">
          <p className="text-sm">Vixpoll</p>
          <p className="text-xs text-default-500">
            Clear and concise for quick community surveys.
          </p>
        </div>
      </CardHeader>
      <Divider />
      <form onSubmit={handlePostSubmission}>
        <CardBody>
          <Input
            variant="underlined"
            label="Poll Title"
            name="title"
            labelPlacement="inside"
            placeholder="A Title that describes your Poll options"
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
          {postData.pollOptions?.map((option, index) => {
            return (
              <div
                className="flex flex-row justify-between items-center gap-2"
                key={`poll-${index}`}
              >
                {postData.pollOptions!.length >= 3 &&
                  index === postData.pollOptions!.length - 1 && (
                    <Button
                      radius="full"
                      color="danger"
                      variant="ghost"
                      startContent={<TbMinus />}
                      isIconOnly
                      onClick={() => {
                        const updatedPollOptions = [...postData.pollOptions!];
                        updatedPollOptions.pop();
                        setPostData({
                          ...postData,
                          pollOptions: updatedPollOptions,
                        });
                      }}
                      title="Delete this Option"
                    />
                  )}

                <Input
                  variant="bordered"
                  label={`Poll Option ${index + 1}`}
                  name=""
                  labelPlacement="inside"
                  isRequired={true}
                  value={option.pollName}
                  onChange={(e) => {
                    const oldPollOptions = [...postData.pollOptions!];
                    oldPollOptions[index] = { pollName: e.target.value };
                    setPostData({
                      ...postData,
                      pollOptions: oldPollOptions,
                    });
                  }}
                  className="my-1"
                />
                {postData.pollOptions!.length <= 3 &&
                  index === postData.pollOptions!.length - 1 && (
                    <Button
                      radius="full"
                      color="danger"
                      variant="ghost"
                      startContent={<TbPlus />}
                      isIconOnly
                      onClick={() => {
                        setPostData({
                          ...postData,
                          pollOptions: [
                            ...postData.pollOptions!,
                            { pollName: "" },
                          ],
                        });
                      }}
                      title="Add Another Option"
                    />
                  )}
              </div>
            );
          })}
          <br />
          {postData.tags && (
            <div className="flex gap-4 flex-wrap">
              {postData.tags.map((tag, index) => {
                return (
                  <Chip
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
        <CardFooter className="justify-end">
          <Button
            color="primary"
            variant="ghost"
            type="submit"
            isLoading={submitBtnLoadingStatus}
            startContent={<TbSend />}
          >
            Publish Poll
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
