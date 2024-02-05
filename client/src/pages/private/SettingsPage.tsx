import { Button, Divider, Input, Textarea } from "@nextui-org/react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "~/utils/hooks/redux.hooks";
import { updateUserData } from "~/redux/slices/user";

import Toast from "~/components/custom_toast/Toast";
import AccountDeleteCard from "~/components/cards/AccountDeleteCard";

import { IoMdEyeOff, IoMdEye } from "react-icons/io";

import {
  getCurrentUser,
  updateUserDataService,
} from "~/services/Users/User.services";

import PageTitle from "~/components/title/PageTitle";
import UserAvatarInput from "~/components/file_inputs/UserAvatarInput";
import UserCoverInput from "~/components/file_inputs/UserCoverInput";
import { UpdateUserProfileInterface } from "~/types/user.types";

export default function SettingsPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [profileUpdateBtnLoadingStatus, setProfileUpdateBtnLoadingStatus] =
    useState(false);
  const [passwordView, setPasswordView] = useState(false);

  const [userProfileData, setUserProfileData] =
    useState<UpdateUserProfileInterface>({
      username: "",
      name: "",
      bio: "",
      email: "",
      password: "",
      avatarURL: "",
      coverURL: "",
    });

  // ? To Check if user really changed anything or not
  const [userProfileUnchangedData, setUserProfileUnchangedData] =
    useState<UpdateUserProfileInterface>({
      username: "",
      name: "",
      bio: "",
      email: "",
      password: "",
      avatarURL: "",
      coverURL: "",
    });

  const handleInputCapture = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setUserProfileData({
      ...userProfileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (
      userProfileData.avatarURL === userProfileUnchangedData.avatarURL &&
      userProfileData.bio === userProfileUnchangedData.bio &&
      userProfileData.coverURL === userProfileUnchangedData.coverURL &&
      userProfileData.email === userProfileUnchangedData.email &&
      userProfileData.name === userProfileUnchangedData.name &&
      userProfileData.password === userProfileUnchangedData.password &&
      userProfileData.username === userProfileUnchangedData.username
    ) {
      Toast.warning("Please change values to update!");
    } else {
      try {
        setProfileUpdateBtnLoadingStatus(true);
        const updatedUserData = await updateUserDataService(userProfileData);

        Toast.success(updatedUserData.message);

        dispatch(
          updateUserData({
            authStatus: "authenticated",
            mail: updatedUserData.responseData.userToEdit.email,
            name: updatedUserData.responseData.userToEdit.name,
            userImg: updatedUserData.responseData.userToEdit.avatarURL,
            username: updatedUserData.responseData.userToEdit.username,
            userId: updatedUserData.responseData.userToEdit._id,
          })
        );

        navigate("/", { replace: true });

        setProfileUpdateBtnLoadingStatus(false);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setProfileUpdateBtnLoadingStatus(false);
        Toast.error(error.response.data.message);
        console.error("Error Update user data:", error.response.data.message);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDataFromServer = await getCurrentUser();

        setUserProfileData({
          username: userDataFromServer.username,
          name: userDataFromServer.name,
          bio: userDataFromServer.bio,
          email: userDataFromServer.email,
          password: userDataFromServer.password,
          avatarURL: userDataFromServer.avatarURL,
          coverURL: userDataFromServer.coverURL,
        });

        setUserProfileUnchangedData({
          username: userDataFromServer.username,
          name: userDataFromServer.name,
          bio: userDataFromServer.bio,
          email: userDataFromServer.email,
          password: userDataFromServer.password,
          avatarURL: userDataFromServer.avatarURL,
          coverURL: userDataFromServer.coverURL,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        Toast.error(error.response.data.message);
        console.error("Error fetching user data:", error.response.data.message);
      }
    };
    // ? To get Default Values set by User
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <PageTitle title="Settings" />
      <section>
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-1">
          <div className="my-1">
            <Input
              name="name"
              type="text"
              label="Name : "
              labelPlacement="outside"
              onChange={handleInputCapture}
              value={userProfileData.name}
              min={3}
              max={40}
              variant="faded"
              size="lg"
              fullWidth
              autoComplete="current-name"
            />
          </div>
          <div className="my-1">
            <Input
              name="username"
              type="text"
              label="Username : "
              labelPlacement="outside"
              onChange={handleInputCapture}
              value={userProfileData.username}
              variant="faded"
              size="lg"
              fullWidth
              autoComplete="current-username"
            />
          </div>
          <div className="my-1">
            <Input
              name="email"
              label="Email : "
              type="email"
              onChange={handleInputCapture}
              value={userProfileData.email}
              variant="faded"
              size="lg"
              fullWidth
              labelPlacement="outside"
              autoComplete="current-email"
            />
          </div>
          <div className="my-1">
            <Textarea
              name="bio"
              label="Bio : "
              type="bio"
              onChange={handleInputCapture}
              value={userProfileData.bio}
              variant="faded"
              size="lg"
              fullWidth
              labelPlacement="outside"
            />
          </div>
          <div className="my-1">
            <Input
              name="password"
              label="Password : "
              description="Enter Your New Password Here Do Not Change If not Needed!"
              onChange={handleInputCapture}
              value={userProfileData.password}
              variant="faded"
              size="lg"
              fullWidth
              labelPlacement="outside"
              endContent={
                <div
                  onClick={() => {
                    setPasswordView(!passwordView);
                  }}
                  className="cursor-pointer"
                >
                  {passwordView === true ? (
                    <IoMdEye className="text-2xl pointer-events-none" />
                  ) : (
                    <IoMdEyeOff className="text-2xl pointer-events-none" />
                  )}
                </div>
              }
              type={passwordView === true ? "text" : "password"}
              autoComplete="current-password"
            />
          </div>
          <div className="my-1">
            <UserAvatarInput
              formData={userProfileData}
              setFormData={setUserProfileData}
            />
          </div>
          <div className="my-1">
            <UserCoverInput
              formData={userProfileData}
              setFormData={setUserProfileData}
            />
          </div>
          <Divider className="my-2" />
          <Button
            className="float-end"
            color="primary"
            type="submit"
            isLoading={profileUpdateBtnLoadingStatus}
          >
            Update Changes
          </Button>
        </form>
      </section>
      <Divider className="my-4" />
      <AccountDeleteCard />
    </>
  );
}
