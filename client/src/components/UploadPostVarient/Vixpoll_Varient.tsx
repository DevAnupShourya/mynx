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
import { MdOutlinePoll } from "react-icons/md";

// import { ImageUpload, VideoUpload } from "~/components/components.barrel";

export default function VixpolUpload() {
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
        <MdOutlinePoll  className="text-4xl" />
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
         <br />
          <h1 className="text-xs text-center">
            Your Poll will appear here
          </h1>
        </CardBody>
        <Divider />
        <CardFooter className="justify-between">
          <Button
            color="primary"
            variant="ghost"
            type="submit"
            startContent={<TbSend />}
          >
            Publish Poll
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
