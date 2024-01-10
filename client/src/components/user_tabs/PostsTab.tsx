import { useEffect, useState } from "react";
import { Button, Chip } from "@nextui-org/react";
import { useParams } from "react-router-dom";

import PostCard from "~/components/cards/PostCard";
import PageTitle from "~/components/title/PageTitle";

import useGetCookie from "~/utils/hooks/useGetCookie";

import { AllPostsResponseType } from "~/types/post.types";
import { getAllPostsByUsername } from "~/services/Users/User.services";

function PostsTab() {
  const [AllPosts, setAllPosts] = useState<AllPostsResponseType | null>(null);
  const token = useGetCookie();
  const [pageNo, setPageNo] = useState<number>(1);

  const { username } = useParams();

  const getAllPosts = async (page: number) => {
    try {
      const response = await getAllPostsByUsername(username! , token! , page)

      setAllPosts(() => ({
        currentPage: response?.data.responseData.currentPage,
        hasNextPage: response?.data.responseData.hasNextPage,
        hasPrevPage: response?.data.responseData.hasPrevPage,
        limit: response?.data.responseData.limit,
        nextPage: response?.data.responseData.nextPage,
        totalPages: response?.data.responseData.totalPages,
        postsArray: [...(response?.data.responseData.posts || [])],
      }));

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error Getting Posts: ", error.response.data.message);
    }
  };

  useEffect(() => {
    getAllPosts(pageNo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNo]);

  const handleLoadMoreBtn = () => {
    if (AllPosts?.hasNextPage) {
      setPageNo(pageNo + 1);
    } else {
      console.log("No More Pages");
    }
  };
  return (
    <div>
      <PageTitle title={`Posts of ${username}`} />
      {AllPosts && AllPosts?.postsArray?.length > 0 ? (
        <section className="w-full h-full flex flex-col flex-nowrap gap-1">
          {AllPosts.postsArray.map((post) => {
            return <PostCard {...post} key={`${post._id}-${post.author}`} />;
          })}
          {AllPosts.hasNextPage ? (
            <Button
              onClick={handleLoadMoreBtn}
              variant="flat"
              color="primary"
              className="my-4 w-1/2 mx-auto"
            >
              Load More
            </Button>
          ) : (
            <Chip
              size="lg"
              color="danger"
              variant="flat"
              className="my-4 mx-auto"
            >
              Yay! Looks Like Thats All We Have
            </Chip>
          )}
        </section>
      ) : (
        <Chip size="lg" color="danger" variant="flat">
          Sorry! There is No Posts to show.
        </Chip>
      )}
    </div>
  );
}

export default PostsTab;
