import { useEffect, useState } from "react";
import { Button, Pagination } from "@nextui-org/react";

import axiosInstance from "~/lib/AxiosInstance";
import useGetCookie from "~/utils/hooks/useGetCookie";

import ProfilePreview from "~/components/profile/ProfilePreview";

import { LuBadgePlus } from "react-icons/lu";
import { MdOutlineFileDownloadDone } from "react-icons/md";
import { useAppSelector } from "~/utils/hooks/redux.hooks";

function ProfilesListWithState({
  groupMembersId,
  setGroupMembersId,
}: {
  groupMembersId: string[];
  setGroupMembersId: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const currentUserId = useAppSelector((state) => state.user.userId);
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
  const token = useGetCookie();

  const getAllUsers = async (page: number) => {
    try {
      const response = await axiosInstance.get(`/users?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
        // ? skipping current user
        if (userData._id === currentUserId) {
          return;
        }
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
        {usersIdList.length > 0 && (
          <h1 className="text-center font-bold text-warning text-lg">
            {groupMembersId.length} Users Selected
          </h1>
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
                  color="warning"
                  isIconOnly
                  title="Chat With This User"
                  isDisabled={groupMembersId.includes(userId)}
                  onClick={() => {
                    setGroupMembersId((previousMembers) => [
                      ...previousMembers,
                      userId,
                    ]);
                  }}
                >
                  {groupMembersId.includes(userId) ? (
                    <MdOutlineFileDownloadDone className="text-lg" />
                  ) : (
                    <LuBadgePlus className="text-lg" />
                  )}
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

export default ProfilesListWithState;
