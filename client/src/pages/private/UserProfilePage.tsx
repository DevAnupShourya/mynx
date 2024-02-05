import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useLocation,
  useParams,
  Outlet,
} from "react-router-dom";
import {
  Avatar,
  Card,
  CardHeader,
  CardBody,
  Button,
  Tooltip,
  Image,
  Divider,
  ScrollShadow,
  Skeleton,
} from "@nextui-org/react";

import UserNotFound from "~/components/loading_error_pages/UserNotFound";

import { useAppSelector } from "~/utils/hooks/redux.hooks";

import { CiCalendarDate } from "react-icons/ci";
import { AiFillEdit } from "react-icons/ai";
import { FaGenderless } from "react-icons/fa";
import {
  PiGenderFemaleFill,
  PiGenderTransgenderFill,
  PiGenderMaleFill,
} from "react-icons/pi";

import {
  getUserByUsername,
  followUserById,
} from "~/services/Users/User.services";

type UserProfile = {
  name: string;
  id: string;
  username: string;
  posts: string[];
  followers: string[];
  following: string[];
  bio: string;
  gender: string;
  country: string;
  joining: Date | null;
  coverImgSrc: string;
  avatarImgSrc: string;
  admin: boolean;
  isFollowThisUser: boolean;
};

function UserProfilePage() {
  const { username } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const userState = useAppSelector((state) => state.user);

  const [userSearchStatus, setUserSearchStatus] = useState<null | true | false>(
    null
  );
  const [followBtnState, setFollowBtnState] = useState(false);

  const [userData, setUserData] = useState<UserProfile>({
    name: "",
    username: username!,
    posts: [""],
    followers: [""],
    following: [""],
    bio: "",
    gender: "na",
    country: "",
    joining: null,
    coverImgSrc: "",
    avatarImgSrc: "",
    admin: false,
    id: "",
    isFollowThisUser: false,
  });

  async function followOrUnfollowUserById() {
    setFollowBtnState(true);
    try {
      const data = await followUserById(userData.id);
      setUserData({
        ...userData,
        isFollowThisUser: data.responseData.following,
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error following the User:", error.response.data.message);
    }
    setFollowBtnState(false);
  }

  async function findUserByUsername() {
    try {
      const data = await getUserByUsername(username!);

      const foundUser = data.responseData.userFromDB;
      setUserData({
        isFollowThisUser: data.responseData.isFollowedByMe,
        admin: userState.mail === foundUser.email,
        avatarImgSrc: foundUser.avatarURL,
        bio: foundUser.bio,
        country: foundUser.country,
        coverImgSrc: foundUser.coverURL,
        followers: foundUser.followers.length,
        following: foundUser.following.length,
        gender: foundUser.gender,
        joining: foundUser.createdAt,
        name: foundUser.name,
        posts: foundUser.posts.length,
        username: foundUser.username,
        id: foundUser._id,
      });
      setUserSearchStatus(true);
    } catch (error) {
      setUserSearchStatus(false);
      console.error("Error fetching User:", error);
    }
  }

  useEffect(() => {
    findUserByUsername();
    // eslint-disable-next-line
  }, []);

  if (userSearchStatus === null) {
    return (
      <div className="bg-main-text-main my-5">
        <Skeleton className="flex h-56 max-md:h-36 w-full rounded-xl" />
        <br />
        <div className="mx-auto h-[100px] w-[100px] max-md:h-[70px] max-md:w-[70px]">
          <Skeleton className="flex rounded-full w-full h-full text-center" />
          <Skeleton className="h-3 w-3/5 rounded-lg my-2 mx-auto" />
          <Skeleton className="h-3 w-4/5 rounded-lg mx-auto" />
        </div>
        <br />
        <br />
        <div className="w-full flex flex-row gap-10 max-sm:gap-5 justify-center">
          <div className="w-1/6 flex flex-col gap-2 items-center justify-center">
            <Skeleton className="h-3 w-1/3 rounded-lg " />
            <Skeleton className="h-3 w-2/3 rounded-lg " />
          </div>
          <Divider orientation="vertical" className="h-10" />
          <div className="w-1/6 flex flex-col gap-2 items-center justify-center">
            <Skeleton className="h-3 w-1/3 rounded-lg " />
            <Skeleton className="h-3 w-2/3 rounded-lg " />
          </div>
          <Divider orientation="vertical" className="h-10" />
          <div className="w-1/6 flex flex-col gap-2 items-center justify-center">
            <Skeleton className="h-3 w-1/3 rounded-lg " />
            <Skeleton className="h-3 w-2/3 rounded-lg " />
          </div>
        </div>
        <br />
        <div className="flex flex-row gap-10 max-sm:gap-5 justify-center">
          <Skeleton className="w-1/6 h-8 rounded-full" />
          <Divider orientation="vertical" className="h-10" />
          <Skeleton className="w-1/6 h-8 rounded-full" />
          <Divider orientation="vertical" className="h-10" />
          <Skeleton className="w-1/6 h-8 rounded-full" />
        </div>
        <br />
        <div className="w-10/12 mx-auto">
          <Skeleton className="w-1/6 h-4 rounded-full my-1" />
          <Skeleton className="w-2/6 h-4 rounded-full my-1" />
          <Skeleton className="w-3/6 h-4 rounded-full my-1" />
          <Skeleton className="w-4/6 h-4 rounded-full my-1" />
          <Skeleton className="w-5/6 h-4 rounded-full my-1" />
          <br />
          <div
            title="Date Joined"
            className="capitalize my-1 flex flex-row gap-4 items-center text-xs"
          >
            <CiCalendarDate className="text-2xl" />
            <Skeleton className="w-1/6 h-4 rounded-full my-1" />
          </div>
          <div
            title="Gender"
            className="capitalize my-1 flex flex-row gap-4 items-center text-xs"
          >
            {userData.gender.toLowerCase() === "female" ? (
              <PiGenderFemaleFill className="text-2xl" />
            ) : userData.gender.toLowerCase() === "male" ? (
              <PiGenderMaleFill className="text-2xl" />
            ) : userData.gender.toLowerCase() === "transgender" ? (
              <PiGenderTransgenderFill className="text-2xl" />
            ) : (
              <FaGenderless />
            )}
            <Skeleton className="w-1/12 h-4 rounded-full my-1" />
          </div>
        </div>
      </div>
    );
  } else if (userSearchStatus === false) {
    return <UserNotFound username={username as string} />;
  } else {
    return (
      <>
        <Card className="bg-main-text-main my-5">
          {/* Background and profile */}
          <CardHeader
            className="relative flex h-56 max-md:h-36 w-full justify-center bg-center bg-cover bg-no-repeat"
            style={{ backgroundImage: `url('${userData.coverImgSrc}')` }}
          >
            <Avatar
              size="lg"
              radius="md"
              isBordered
              src={userData.avatarImgSrc}
              alt={`${userData.name}`}
              showFallback={true}
              className="absolute -bottom-12 max-md:-bottom-8 h-[100px] w-[100px] max-md:h-[70px] max-md:w-[70px]"
            />
            {userData.admin === true ? (
              <Tooltip
                content="Edit Your Profile"
                className="bg-main-text-default"
              >
                <Button
                  as={Link}
                  to={`/settings`}
                  isIconOnly
                  color="warning"
                  variant="flat"
                  aria-label="Edit Profile"
                  className="absolute -bottom-14 right-5"
                >
                  <AiFillEdit className="w-2/3 h-auto" />
                </Button>
              </Tooltip>
            ) : null}
          </CardHeader>

          {/* Name and position */}
          <CardBody className="mt-12 flex flex-col items-center">
            <h5 className="text-xl font-normal text-primary lowercase">
              @{userData.username}
            </h5>
            <h4 className="text-2xl font-bold text-light-main dark:text-dark-main capitalize flex flex-row items-center gap-2">
              {userData.name}
              <Tooltip
                content={`I Love My Country ${userData.country}`}
                className="bg-def"
              >
                <Image
                  width={20}
                  height={40}
                  alt={userData.country}
                  src={`https://flagsapi.com/IN/flat/64.png`}
                />
              </Tooltip>
            </h4>
          </CardBody>

          {/* Post followers */}
          <CardBody className="flex flex-row gap-10 max-sm:gap-5 justify-center">
            <div className="flex flex-col items-center justify-center">
              <h4 className="text-xl max-sm:text-lg font-bold text-light-main  dark:text-dark-main">
                {userData.posts}
              </h4>
              <p className="text-sm max-sm:text-xs font-normal text-light-default  dark:text-dark-default">
                Posts
              </p>
            </div>
            <Divider orientation="vertical" className="h-10" />
            <div className="flex flex-col items-center justify-center">
              <h4 className="text-xl max-sm:text-lg font-bold text-light-main  dark:text-dark-main">
                {userData.followers}
              </h4>
              <p className="text-sm max-sm:text-xs font-normal text-light-default  dark:text-dark-default">
                Followers
              </p>
            </div>
            <Divider orientation="vertical" className="h-10" />
            <div className="flex flex-col items-center justify-center">
              <h4 className="text-xl max-sm:text-lg font-bold text-light-main  dark:text-dark-main">
                {userData.following}
              </h4>
              <p className="text-sm max-sm:text-xs font-normal text-light-default dark:text-dark-default">
                Following
              </p>
            </div>
          </CardBody>

          {/* Follow , Friend ad chat btn */}
          {!(userData.admin === true) && (
            <CardBody className="flex flex-row gap-10 max-sm:gap-5 justify-center">
              <Button
                startContent={"icon"}
                variant="bordered"
                color="primary"
                size="sm"
                onClick={followOrUnfollowUserById}
                isLoading={followBtnState}
              >
                {userData.isFollowThisUser ? "Unfollow" : "Follow"}
              </Button>
              <Divider orientation="vertical" className="h-10" />
              <Button
                startContent={"icon"}
                variant="light"
                color="danger"
                size="sm"
                as={Link}
                to={`/chats/${userData.id}`}
              >
                Chat
              </Button>
            </CardBody>
          )}

          {/* Bio and Dat */}
          <CardBody className="w-10/12 mx-auto">
            <p className="text-left text-sm my-4">{userData.bio}</p>
            <p
              title="Date Joined"
              className="capitalize my-1 flex flex-row gap-4 items-center text-xs"
            >
              <CiCalendarDate className="text-2xl" />
              {new Date(userData.joining as Date).toDateString()}
            </p>
            <p
              title="Gender"
              className="capitalize my-1 flex flex-row gap-4 items-center text-xs"
            >
              {userData.gender.toLowerCase() === "female" && (
                <PiGenderFemaleFill className="text-2xl" />
              )}
              {userData.gender.toLowerCase() === "male" && (
                <PiGenderMaleFill className="text-2xl" />
              )}
              {userData.gender.toLowerCase() === "transgender" && (
                <PiGenderTransgenderFill className="text-2xl" />
              )}
              {userData.gender}
            </p>
          </CardBody>
        </Card>
        <Card className="bg-main-text-main my-5">
          <CardBody className="px-0">
            <ScrollShadow className="w-full h-full">
              <div className="flex flex-row justify-around items-center w-full">
                <Button
                  size="sm"
                  variant={
                    pathname === `/${userData.username}` ? "shadow" : "light"
                  }
                  color="secondary"
                  fullWidth
                  radius="none"
                  onClick={() => {
                    navigate(`/${userData.username}`, {
                      preventScrollReset: true,
                    });
                  }}
                >
                  Posts
                </Button>
                <Button
                  size="sm"
                  variant={
                    pathname === `/${userData.username}/followers`
                      ? "shadow"
                      : "light"
                  }
                  color="secondary"
                  fullWidth
                  radius="none"
                  onClick={() => {
                    navigate(`/${userData.username}/followers`, {
                      preventScrollReset: false,
                    });
                  }}
                >
                  Followers
                </Button>
                <Button
                  size="sm"
                  variant={
                    pathname === `/${userData.username}/following`
                      ? "shadow"
                      : "light"
                  }
                  color="secondary"
                  fullWidth
                  radius="none"
                  onClick={() => {
                    navigate(`/${userData.username}/following`, {
                      preventScrollReset: false,
                    });
                  }}
                >
                  Following
                </Button>
                <Button
                  size="sm"
                  variant={
                    pathname === `/${userData.username}/activity`
                      ? "shadow"
                      : "light"
                  }
                  color="secondary"
                  fullWidth
                  radius="none"
                  onClick={() => {
                    navigate(`/${userData.username}/activity`, {
                      preventScrollReset: false,
                    });
                  }}
                >
                  Activity
                </Button>
              </div>
            </ScrollShadow>
          </CardBody>
        </Card>
        <section className="py-5">
          <Outlet />
        </section>
      </>
    );
  }
}

export default UserProfilePage;
