import { useEffect, useState } from "react";

import Toast from "~/components/custom_toast/Toast";
import ProfilePreview from "~/components/profile/ProfilePreview";

import axiosInstance from "~/lib/AxiosInstance";
import { useAppSelector } from "~/utils/hooks/redux.hooks";
import useGetCookie from "~/utils/hooks/useGetCookie";

function FollowingPage() {
  const userState = useAppSelector((state) => state.user);
  const token = useGetCookie();
  const [followingList, setFollowingList] = useState<string[]>([""]);

  const getFollowingList = async () => {
    try {
      const response = await axiosInstance.get(`/users/u/${userState.userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFollowingList(response.data.responseData.user.following);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      Toast.error(error.response.data.message);
      console.error("Error Getting Following List : ", error.response.data.message);
    }
  };

  useEffect(() => {
    getFollowingList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <section className="w-full h-auto flex flex-col gap-4 my-4">
        {followingList && followingList.length === 0 && (
          <h1>Following No one Yet</h1>
        )}
        {followingList.length > 0 &&
          followingList.map((followingUseId) => {
            return <ProfilePreview userId={followingUseId} key={followingUseId} />;
          })}
      </section>
    </>
  );
}

export default FollowingPage;
