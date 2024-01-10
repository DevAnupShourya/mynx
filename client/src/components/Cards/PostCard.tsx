import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
  Link,
  Spinner,
} from "@nextui-org/react";

import { CgProfile } from "react-icons/cg";
import { AiOutlineShareAlt } from "react-icons/ai";
import { FaHeart, FaRegHeart } from "react-icons/fa6";

import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

import useGetCookie from "~/utils/hooks/useGetCookie";

import { OnePostResponseType } from "~/types/post.types";
import { useAppSelector } from "~/utils/hooks/redux.hooks";

import Toast from "~/components/custom_toast/Toast";
import VixdeoPostDisplay from "~/components/posts/VixdeoPostDisplay";
import VixetPostDisplay from "~/components/posts/VixetPostDisplay";
import VixogsPostDisplay from "~/components/posts/VixogsPostDisplay";
import VixpollPostDisplay from "~/components/posts/VixpollPostDisplay";
import VixsnapPostDisplay from "~/components/posts/VixsnapPostDisplay";

import { getUserByUID } from "~/services/Users/User.services";
import { likePostById } from "~/services/Posts/Posts.services";

function PostCard(postDetails: OnePostResponseType) {
  const userState = useAppSelector((state) => state.user);
  const token = useGetCookie(); 

  // ? Post Loading State
  const [fetchingStatus, setFetchingStatus] = useState<boolean | null>(null);
  // ? Post Author State
  const [authorDetails, setAuthorDetails] = useState({
    avatarUrl: "",
    email: "",
    username: "",
    name: "",
  });
  // ? Post State
  const [postData, setPostData] = useState<OnePostResponseType>({
    postType: postDetails.postType,
    tags: postDetails.tags,
    imagesURL: postDetails.imagesURL,
    title: postDetails.title,
    videoURL: postDetails.videoURL,
    pollOptions: postDetails.pollOptions,
    author: postDetails.author,
    description: postDetails.description,
    _id: postDetails._id,
    likes: postDetails.likes,
    createdAt: postDetails.createdAt,
  });

  const [isPostLiked, setIsPostLiked] = useState<boolean>(
    postData.likes.includes(userState.userId)
  );

  const getAuthorDetails = async () => {
    setFetchingStatus(true);
    try {
      const response = await getUserByUID(postDetails.author, token!);

      setAuthorDetails({
        avatarUrl: response.user.avatarURL,
        email: response.user.email,
        username: response.user.username,
        name: response.user.name,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setFetchingStatus(null);
      Toast.error(error.response.data.message);
      console.error("Error Getting User Data : ", error.response.data.message);
    }
  };

  const handlePostLikeBtn = async () => {
    try {
      const response = await likePostById(postData._id, token!);

      if (response?.status === 200) {
        setIsPostLiked(!isPostLiked);
        setPostData({
          ...postData,
          likes: response?.data.responseData.totalLikesArr,
        });
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      Toast.error(error.response.data.message);
      console.error("Error Liking post: ", error.response.data);
    }
  };

  useEffect(() => {
    getAuthorDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {fetchingStatus === null ? (
        <div>Unable to get post</div>
      ) : fetchingStatus === false ? (
        <div className="w-full h-10 grid place-items-center">
          <Spinner color="warning" />
        </div>
      ) : (
        <Card className="w-full">
          <CardHeader className="justify-start gap-4">
            <Avatar
              radius="full"
              size="sm"
              src={authorDetails.avatarUrl}
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
                to={`/${authorDetails.username}`}
                className="text-sm font-semibold leading-none"
              >
                {authorDetails.name}
              </Link>
              <h5 className="text-xs tracking-tighter lowercase text-foreground-500">
                @{authorDetails.username} |{" "}
                <span className="capitalize">
                  {new Date(postData.createdAt as Date).toDateString()}
                </span>
              </h5>
            </div>
          </CardHeader>
          <CardBody className="flex flex-col flex-nowrap gap-1">
            {postData.postType === "Vixet" && (
              <VixetPostDisplay
                author={authorDetails.name}
                title={postData.title!}
                images={postData.imagesURL}
                videos={postData.videoURL}
              />
            )}
            {postData.postType === "Vixdeo" && (
              <VixdeoPostDisplay
                author={authorDetails.name}
                title={postData.title!}
                description={postData.description!}
                videos={postData.videoURL}
              />
            )}
            {postData.postType === "Vixogs" && (
              <VixogsPostDisplay
                author={authorDetails.name}
                title={postData.title!}
                images={postData.imagesURL!}
                description={postData.description!}
              />
            )}
            {postData.postType === "Vixpoll" && (
              <VixpollPostDisplay
                pollOptions={postData.pollOptions!}
                title={postData.title!}
                key={`Vixpoll-${postData._id}`}
                id={postData._id}
              />
            )}
            {postData.postType === "Vixsnap" && (
              <VixsnapPostDisplay
                author={authorDetails.name}
                images={postData.imagesURL!}
              />
            )}
          </CardBody>
          <CardFooter className="justify-between">
            <Button
              size="sm"
              color="secondary"
              variant="light"
              onClick={handlePostLikeBtn}
            >
              {isPostLiked ? <FaHeart /> : <FaRegHeart />}
              {postData.likes.length}
            </Button>
            <Button
              size="sm"
              color="secondary"
              variant="light"
              endContent={<AiOutlineShareAlt />}
            >
              Share
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}

export default PostCard;
