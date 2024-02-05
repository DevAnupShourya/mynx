import { useEffect, useState } from "react";
import { Button, Chip } from "@nextui-org/react";

import {axiosInstanceAuth} from "~/lib/AxiosInstance";

import {
  AllPostsResponseType,
  OnePostResponseType,
} from "~/types/post.types";
import PageTitle from "~/components/title/PageTitle";
import PostCard from "~/components/cards/PostCard";

export default function TrendingPage() {
  const [pageNo, setPageNo] = useState<number>(1);
  const [allTrendyPosts, setAllTrendyPosts] =
    useState<AllPostsResponseType | null>(null);
  

  const getAllPosts = async (page: number) => {
    try {
      const response = await axiosInstanceAuth.get(`/posts?page=${page}`);

      setAllTrendyPosts(() => ({
        currentPage: response.data.responseData.currentPage,
        hasNextPage: response.data.responseData.hasNextPage,
        hasPrevPage: response.data.responseData.hasPrevPage,
        limit: response.data.responseData.limit,
        nextPage: response.data.responseData.nextPage,
        totalPages: response.data.responseData.totalPages,
        postsArray: [
          ...response.data.responseData.allPosts.sort(
            (a: OnePostResponseType, b: OnePostResponseType) =>
              b.likes.length - a.likes.length
          ),
        ],
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
    if (allTrendyPosts?.hasNextPage) {
      setPageNo(pageNo + 1);
    } else {
      console.log("No More Pages");
    }
  };

  return (
    <>
      <PageTitle title="Trending" />
      <section>
        {allTrendyPosts && (
          <section className="w-full h-full flex flex-col flex-nowrap gap-1">
            {allTrendyPosts.postsArray.map((post) => {
              return <PostCard {...post} key={post._id} />;
            })}
            {allTrendyPosts.hasNextPage ? (
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
        )}
        {allTrendyPosts?.postsArray &&
          allTrendyPosts?.postsArray.length < 1 && (
            <div className="w-full h-1/2 grid place-items-center">
              <Chip size="lg" color="danger" variant="flat">
                Sorry! There is No Posts to show. Please Refresh the Page!
              </Chip>
            </div>
          )}
      </section>
    </>
  );
}
