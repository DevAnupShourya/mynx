import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Pagination } from "@nextui-org/react";

import { axiosInstanceAuth } from "~/lib/AxiosInstance";

import ProfilePreview from "~/components/profile/ProfilePreview";

import { RiChatNewLine } from "react-icons/ri";

function ProfilesListToChat({ closeFn }: { closeFn?: () => void }) {
  const [usersIdList, setUsersIdList] = useState<string[]>([]);
  const [pageMeta, setPageMeta] = useState({
    currentPage: 0,
    hasNextPage: false,
    hasPrevPage: false,
    limit: 0,
    nextPage: 0,
    totalPages: 0,
  });
  const [pageNo, setPageNo] = useState<number>(1);

  const getAllUsers = async (page: number) => {
    try {
      const response = await axiosInstanceAuth.get(`/users?page=${page}`);

      setPageMeta({
        currentPage: response.data.responseData.currentPage,
        hasNextPage: response.data.responseData.hasNextPage,
        hasPrevPage: response.data.responseData.hasPrevPage,
        limit: response.data.responseData.limit,
        nextPage: response.data.responseData.nextPage,
        totalPages: response.data.responseData.totalPages,
      });

      setUsersIdList([]);
      response.data.responseData.allUsers.map((userData: { _id: string }) => {
        setUsersIdList((pre) => [...pre, userData._id]);
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error Getting Posts: ", error.response.data.message);
    }
  };

  useEffect(() => {
    getAllUsers(pageNo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNo]);

  return (
    <div className="w-full h-auto">
      <section className="w-full h-auto flex flex-col gap-4 my-4">
        {usersIdList && usersIdList.length === 0 && (
          <h1>No Users to search.</h1>
        )}
        {usersIdList.length > 0 &&
          usersIdList.map((userId) => {
            return (
              <div
                key={userId}
                className="w-full h-auto flex flex-row flex-nowrap justify-between items-center"
              >
                <ProfilePreview userId={userId} />
                <Button
                  variant="flat"
                  color="success"
                  isIconOnly
                  title="Chat With This User"
                  as={Link}
                  to={`/chats/${userId}`}
                  onPress={closeFn}
                >
                  <RiChatNewLine />
                </Button>
              </div>
            );
          })}
      </section>
      <div className="w-full h-auto grid place-items-center">
        <Pagination
          color="warning"
          showControls
          total={pageMeta.totalPages}
          initialPage={1}
          onChange={(e) => {
            if (pageMeta?.hasNextPage) {
              setPageNo(e);
            } else {
              console.log("No More Pages");
            }
          }}
        />
      </div>
    </div>
  );
}

export default ProfilesListToChat;
