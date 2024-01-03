import { FormEvent, useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Divider,
  Button,
  CardHeader,
  Textarea,
  Input,
  Chip,
} from "@nextui-org/react";

import { TbSend } from "react-icons/tb";
import { MdLiveTv } from "react-icons/md";
import { PostDataInterface } from "~/types/types.barrel";
import findTagsInText from "~/services/findTagsInText";

export default function VixliveUpload() {
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

  const handlePostSubmission = (e: FormEvent) => {
    e.preventDefault();
    setSubmitBtnLoadingStatus(true);
  };
  return (
    <Card radius="lg" className="w-full bg-main-text-main">
      <CardHeader className="flex gap-5">
        <MdLiveTv className="text-4xl" />
        <div className="flex flex-col">
          <p className="text-sm">Vixlive</p>
          <p className="text-xs text-default-500">
            Straightforward and immediately conveys live streaming.
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
          <div className="grid place-items-center">
            <Chip size="lg" variant="shadow" color="warning">
              Sorry! This Feature is Yet To Enable. Enjoy
            </Chip>
          </div>
        </CardBody>
        <Divider />
        <CardFooter>
          <Button
            className="float-left"
            color="primary"
            variant="ghost"
            type="submit"
            isLoading={submitBtnLoadingStatus}
            isDisabled={true} // TODO : Change it
            startContent={<TbSend />}
          >
            Go Live
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
