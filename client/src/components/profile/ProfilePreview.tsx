import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { User, Link, Spinner } from "@nextui-org/react";


import { getUserByUID } from "~/services/Users/User.services";
import Toast from "~/components/custom_toast/Toast";

function ProfilePreview({
  userId,
  endContent,
}: {
  userId: string;
  endContent?: React.ReactNode;
}) {
  

  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState<{
    avatarURL: string;
    username: string;
    name: string;
  }>({ avatarURL: "", name: "", username: "" });

  const getUserDetails = async () => {
    setLoading(true);
    try {
      const res = await getUserByUID(userId);

      setUserDetails({
        avatarURL: res?.user.avatarURL,
        username: res?.user.username,
        name: res?.user.name,
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      Toast.error(error.response.data.message);
      console.error("Error Getting User Data : ", error);
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
    <div className="flex justify-between items-center">
      <User
        name={userDetails.name}
        description={
          <Link as={RouterLink} to={`/${userDetails.username}`} size="lg">
            @{userDetails.username}
          </Link>
        }
        avatarProps={{
          src: userDetails.avatarURL,
          size: "sm",
        }}
        className=" justify-start"
      />
      {endContent && <div>{endContent}</div>}
    </div>
  );
}

export default ProfilePreview;
