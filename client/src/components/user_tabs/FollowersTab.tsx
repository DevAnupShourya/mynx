import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Toast from "~/components/custom_toast/Toast";
import ProfilePreview from "~/components/profile/ProfilePreview";

import { getUserByUsername } from "~/services/Users/User.services";


function FollowersTab() {
  
  const [followersList, setFollowersList] = useState<string[]>([""]);
  const { username } = useParams();

  const getFollowersList = async () => {
    try {
      const res = await getUserByUsername(username! )
      
      setFollowersList(res.responseData.userFromDB.followers);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      Toast.error(error.response.data.message);
      console.error("Error Getting User Data : ", error);
    }
  };

  useEffect(() => {
    getFollowersList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="w-full h-auto flex flex-col gap-4 my-4">
      {followersList && followersList.length === 0 && <h1>No Followers Yet</h1>}
      {followersList.length > 0 &&
        followersList.map((follower) => {
          return <ProfilePreview userId={follower} key={follower} />;
        })}
    </section>
  );
}

export default FollowersTab;
