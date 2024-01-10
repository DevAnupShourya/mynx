import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Select,
  SelectItem,
  Avatar,
  Chip,
} from "@nextui-org/react";

import { SiMonkeytype } from "react-icons/si";

import { useAppSelector } from "~/utils/hooks/redux.hooks";

import Vixet_Variant from "~/components/posts_forms/Vixet_Variant";
import Vixdeo_Variant from "~/components/posts_forms/Vixdeo_Variant";
import Vixlive_Variant from "~/components/posts_forms/Vixlive_Variant";
import Vixogs_Variant from "~/components/posts_forms/Vixogs_Variant";
import Vixpoll_Variant from "~/components/posts_forms/Vixpoll_Variant";
import Vixsnap_Variant from "~/components/posts_forms/Vixsnap_Variant";
import PageTitle from "~/components/title/PageTitle";


const variantsMap = {
  Vixet: <Vixet_Variant />,
  Vixdeo: <Vixdeo_Variant />,
  Vixsnap: <Vixsnap_Variant />,
  Vixogs: <Vixogs_Variant />,
  Vixlive: <Vixlive_Variant />,
  Vixpoll: <Vixpoll_Variant />,
} as { [key: string]: JSX.Element };

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
        <CardBody>
          {variantsMap[postVariant] || (
            <div className="grid place-items-center my-4">
              <Chip size="lg" variant="shadow" color="warning">
                Please Select Any Option. Enjoy!
              </Chip>
            </div>
          )}
        </CardBody>
      </Card>
    </>
  );
}
