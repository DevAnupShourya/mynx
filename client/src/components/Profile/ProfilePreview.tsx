import { useEffect, useState } from "react";
import { User, Link, Spinner } from "@nextui-org/react";

import useGetCookie from "~/utils/hooks/useGetCookie";
import { getUserByUID } from "~/services/Users/User.services";
import Toast from "~/components/custom_toast/Toast";

function ProfilePreview({ userId }: { userId: string }) {
  const token = useGetCookie();

  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState<{
    avatarURL: string;
    username: string;
    name: string;
  }>({ avatarURL: "", name: "", username: "" });

  const getUserDetails = async () => {
    setLoading(true);
    try {
      const res = await getUserByUID(userId, token!);
      
      setUserDetails({
        avatarURL: res?.user.avatarURL,
        username: res?.user.username,
        name: res?.user.name,
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      Toast.error(error.response.data.message);
      console.error("Error Getting User Data : ", error.response.data.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getUserDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? (
    <div className="w-full h-20 grid place-items-center ">
      <Spinner color="danger" size="sm" />
    </div>
  ) : (
    <User
      name={userDetails.name}
      description={
        <Link href={`/${userDetails.username}`} size="lg">
          @{userDetails.username}
        </Link>
      }
      avatarProps={{
        src: userDetails.avatarURL,
        size: "lg",
      }}
      className=" justify-start"
    />
  );
}

export default ProfilePreview;
