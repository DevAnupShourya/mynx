import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


import { getUserByUsername } from "~/services/Users/User.services";

import Toast from "~/components/custom_toast/Toast";
import ProfilePreview from "~/components/profile/ProfilePreview";

function FollowingTab() {
  
  const [followingList, setFollowingList] = useState<string[]>([]);
  const { username } = useParams();

  const getFollowingList = async () => {
    try {
      const res = await getUserByUsername(username! )

      setFollowingList(res.responseData.userFromDB.following);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      Toast.error(error.response.data.message);
      console.error("Error Getting User Data : ", error);
    }
  };

  useEffect(() => {
    getFollowingList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="w-full h-auto flex flex-col gap-4 my-4">
      {followingList && followingList.length === 0 && <h1>Following No one Yet</h1>}
      {followingList.length > 0 &&
        followingList.map((following) => {
          return <ProfilePreview userId={following} key={following} />;
        })}
    </section>
  );
}

export default FollowingTab;
