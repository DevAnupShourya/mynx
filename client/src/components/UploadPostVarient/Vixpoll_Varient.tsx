import { FormEvent, useState } from "react";
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
import { useNavigate } from "react-router-dom";

import { TbPlus, TbSend, TbMinus } from "react-icons/tb";
import { MdOutlinePoll } from "react-icons/md";

import useGetCookie from "~/utils/hooks/useGetCookie";
import Toast from "~/components/CustomToast/Toast";
import findTagsInText from "~/services/findTagsInText";
import { PostDataInterface } from "~/types/types.barrel";
import { uploadPosts } from "~/services/PostUpload/PostsUpload";

export default function VixpollUpload() {
  const navigate = useNavigate();

  const token = useGetCookie();
  const [submitBtnLoadingStatus, setSubmitBtnLoadingStatus] = useState(false);

  // Title & Poll Options & Tags & PostType
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
        <MdOutlinePoll className="text-4xl" />
        <div className="flex flex-col">
          <p className="text-sm">Vixpol</p>
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
