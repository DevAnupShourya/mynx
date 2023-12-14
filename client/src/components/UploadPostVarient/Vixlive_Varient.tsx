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
} from "@nextui-org/react";

import { TbSend } from "react-icons/tb";
import { MdLiveTv } from "react-icons/md";

// import { ImageUpload, VideoUpload } from "~/components/components.barrel";

export default function VixliveUpload() {
  const [postData, setPostData] = useState({
    title: "" as string,
    description: "" as string,
    video: "" as string,
    videoDisplay: "" as string,
  });

  const handlePostSubmission = (e: FormEvent) => {
    e.preventDefault();
    // TODO : Take from Here
    console.log(postData);
  };
  return (
    <Card radius="lg" className="w-full bg-main-text-main">
      <CardHeader className="flex gap-5">
        <MdLiveTv  className="text-4xl" />
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
          <h1 className="text-xs text-center">You Live Stream will appear here</h1>
        </CardBody>
        <Divider />
        <CardFooter className="justify-between">
          <Button
            color="primary"
            variant="ghost"
            type="submit"
            startContent={<TbSend />}
          >
            Go Live
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
