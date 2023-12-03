import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
  Link,
  Image,
} from "@nextui-org/react";

import { CgProfile } from "react-icons/cg";
import { AiOutlineShareAlt } from "react-icons/ai";
import { BiCommentDots, BiSolidCommentDots } from "react-icons/bi";

import { NavLink, Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";

type postType = {
  author: string;
  username: string;
  time: string;
  avatarUrl: string;
  comments: string;
  views: string;
  postURL: string;
  text: string;
  images: string[];
};

function PostCard(postDetails: postType) {
  const [isPostLiked, setIsPostLiked] = useState(false);
  const [isCommented, setIsCommented] = useState(false);

  const generateRandomNumber = (start: number, end: number) => {
    const randomNumber = Math.floor(Math.random() * (end - start + 1)) + start;
    return randomNumber;
  };

  return (
    <Card className="w-full bg-main-text-default">
      <CardHeader className="justify-between">
        <Link
          as={RouterLink}
          to={`/${postDetails.username}`}
          className="flex gap-4 justify-center items-center"
        >
          <Avatar
            radius="full"
            size="sm"
            src={postDetails.avatarUrl}
            showFallback
            isBordered
            fallback={
              <CgProfile
                className="animate-pulse w-6 h-6"
                fill="currentColor"
                size={20}
              />
            }
          />
          <div className="">
            <Link
              as={NavLink}
              color="foreground"
              to={"/"}
              className="text-sm font-semibold leading-none"
            >
              {postDetails.author}
            </Link>
            <h5 className="text-xs tracking-tighter lowercase text-foreground-500">
              @{postDetails.username} | {postDetails.time} ago
            </h5>
          </div>
        </Link>
      </CardHeader>
      <CardBody className="">
        <h1 className="text-base">{postDetails.text}</h1>
        <div
          className={`grid gap-1  ${
            postDetails.images.length <= 1
              ? "grid-cols-1"
              : postDetails.images.length <= 4
              ? "grid-cols-2"
              : postDetails.images.length <= 6
              ? "grid-cols-3"
              : postDetails.images.length <= 8
              ? "grid-cols-4"
              : ""
          }`}
        >
          {postDetails.images.map((image, index) => {
            return (
              <div
                key={index}
                className={`relative ${
                  postDetails.images.length === 1 ? "col-span-2" : ""
                }`}
              >
                <Image
                  radius="sm"
                  fallbackSrc="https://via.placeholder.com/300x200"
                  className="w-full h-auto"
                  alt={`Image of ${postDetails.author}`}
                  src={`https://picsum.photos/${generateRandomNumber(
                    190,
                    200
                  )}`}
                />
              </div>
            );
          })}
        </div>
      </CardBody>
      <CardFooter className="justify-between">
        <div>
          <Button
            size="sm"
            color="secondary"
            variant="light"
            onClick={() => {
              setIsPostLiked(!isPostLiked);
            }}
          >
            {isPostLiked ? <FaHeart /> : <FaRegHeart />}
            {postDetails.views}
          </Button>
          <Button
            size="sm"
            color="secondary"
            variant="light"
            onClick={() => {
              setIsCommented(!isCommented);
            }}
          >
            {isCommented ? <BiSolidCommentDots /> : <BiCommentDots />}
            {postDetails.comments}
          </Button>
        </div>
        <div>
          <Button
            size="sm"
            color="secondary"
            variant="light"
            endContent={<AiOutlineShareAlt />}
          >
            Share
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default PostCard;
