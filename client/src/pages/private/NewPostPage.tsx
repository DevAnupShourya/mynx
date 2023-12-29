import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Select,
  SelectItem,
  Avatar,
} from "@nextui-org/react";
import { useState } from "react";

import { SiMonkeytype } from "react-icons/si";

import { useAppSelector } from "~/utils/hooks/redux.hooks";

import {
  Vixdeo_Varient,
  Vixet_Varient,
  Vixogs_Varient,
  Vixpoll_Varient,
  Vixsnap_Varient,
  Vixlive_Varient,
  PageTitle,
} from "~/components/components.barrel";

const PostVariantsList = [
  {
    variant: "Vixet",
    details:
      "Simple, playful, and perfect for short text and image/video combos.",
  },
  {
    variant: "Vixdeo",
    details:
      "Rolls off the tongue and easily communicates longer video content.",
  },
  {
    variant: "Vixsnap",
    details:
      "Captures the fleeting nature of stories while staying within your naming style.",
  },
  {
    variant: "Vixogs",
    details: "Long, unique, and instantly suggests in-depth blog posts.",
  },
  {
    variant: "Vixlive",
    details: "Straightforward and immediately conveys live streaming",
  },
  {
    variant: "Vixpoll",
    details: "Clear and concise for quick community surveys.",
  },
];

const variantsMap = {
  Vixet: <Vixet_Varient />,
  Vixdeo: <Vixdeo_Varient />,
  Vixsnap: <Vixsnap_Varient />,
  Vixogs: <Vixogs_Varient />,
  Vixlive: <Vixlive_Varient />,
  Vixpoll: <Vixpoll_Varient />,
} as { [key: string]: JSX.Element };

export default function NewPostPage() {
  const userState = useAppSelector((state) => state.user);

  const [postVariant, setPostVariant] = useState("Vixet");

  return (
    <>
      <PageTitle title="New Post" />
      <Card radius="lg" className="w-full bg-main-text-main">
        <CardHeader className="flex justify-between gap-3">
          <Avatar isBordered color="primary" src={userState.userImg} />
          <Select
            label="Post Type"
            className="w-1/2 bg-main-text-main"
            size="sm"
            variant="bordered"
            defaultSelectedKeys={["Vixet"]}
            onChange={(e) => {
              setPostVariant(e.target.value);
            }}
            startContent={<SiMonkeytype />}
            color="warning"
          >
            {PostVariantsList.map((post) => (
              <SelectItem
                key={post.variant}
                value={post.variant}
                className="bg-main-text-main"
              >
                {post.variant}
              </SelectItem>
            ))}
          </Select>
        </CardHeader>
        <Divider />
        <CardBody>{variantsMap[postVariant] || null}</CardBody>
      </Card>
    </>
  );
}
