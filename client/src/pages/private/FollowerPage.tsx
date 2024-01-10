import { useEffect, useState } from "react";

import Toast from "~/components/custom_toast/Toast";
import ProfilePreview from "~/components/profile/ProfilePreview";

import axiosInstance from "~/lib/AxiosInstance";
import { useAppSelector } from "~/utils/hooks/redux.hooks";
import useGetCookie from "~/utils/hooks/useGetCookie";

export default function FollowerPage() {
  const userState = useAppSelector((state) => state.user);
  const token = useGetCookie();
  const [followersList, setFollowersList] = useState<string[]>([""]);

  const getFollowersList = async () => {
    try {
      const response = await axiosInstance.get(`/users/u/${userState.userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFollowersList(response.data.responseData.user.followers);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      Toast.error(error.response.data.message);
      console.error("Error Getting User Data : ", error.response.data.message);
    }
  };

  useEffect(() => {
    getFollowersList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
      <section className="w-full h-auto flex flex-col gap-4 my-4">
        {followersList && followersList.length === 0 && (
          <h1>No Followers Yet</h1>
        )}
        {followersList.length > 0 &&
          followersList.map((follower) => {
            return <ProfilePreview userId={follower} key={follower} />;
          })}
      </section>
  );
}
