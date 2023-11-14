import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { RiUserSettingsLine } from "react-icons/ri";
import { HiOutlineLogout } from "react-icons/hi";
import { GiHelp } from "react-icons/gi";
import { MdOutlineWidgets } from "react-icons/md";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Avatar,
  User,
  Select,
  SelectItem,
  Button,
} from "@nextui-org/react";

import { Link } from "react-router-dom";

// ? Redux
// import { useDispatch } from "react-redux";
// import { showAlert } from "@src/store/alert/alertSlice";

export default function ProfileDropdown() {
  // ? Redux States
  //   const dispatch = useDispatch();
  //   const route = useRouter();

  //   const [userData, setUserData] = React.useState({
  //     profileImgUrl: "",
  //     profileUsername: "",
  //     profileName: "",
  //   });

  //   React.useEffect(() => {
  //     const fetchUserData = async () => {
  //       try {
  //         const response = await fetch(`/api/users`, {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //             email: userMail as string,
  //           },
  //         });

  //         if (response.ok) {
  //           const userData = await response.json();
  //           setUserData({
  //             profileImgUrl: userData.avatarUrl,
  //             profileUsername: userData.username,
  //             profileName: userData.name,
  //           });
  //         } else {
  //           console.error("Unable to get user data!!", response.text);
  //         }
  //       } catch (error: any) {
  //         console.error("Error while getting user data!!", error.message);
  //       }
  //     };

  //     fetchUserData();
  //   }, [userMail]);

  const handleLogout = async () => {
    console.log("Logging Out The user......");
    //     const singout = await signOut({ redirect: true });

    //     if (singout) {
    //       dispatch(
    //         showAlert({
    //           show: true,
    //           type: "danger",
    //           msg: "Logout failed! Try After Some Time.",
    //         })
    //       );
    //     } else {
    //       dispatch(
    //         showAlert({
    //           show: true,
    //           type: "success",
    //           msg: "Logout Successfuly! Come Back Soon.",
    //         })
    //       );
    //       route.push("/login");
    //     }
  };

  const userData = {
    profileImgUrl: "https://avatars.githubusercontent.com/u/30373425?v=4",
    profileUsername: "muskElon",
    profileName: "Andrew Tate",
  };

  return (
    <Dropdown
      size="lg"
      radius="sm"
      classNames={{
        base: "p-0",
      }}
      backdrop="blur"
    >
      <DropdownTrigger className="cursor-pointer">
        <Avatar
          showFallback
          radius="full"
          size="lg"
          src={userData.profileImgUrl}
        />
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Profile Dropdown List"
        disabledKeys={["profile"]}
        className="p-3"
        itemClasses={{
          base: [
            "rounded-md",
            "text-default-400",
            "transition-opacity",
            "data-[hover=true]:text-default-800",
            "data-[hover=true]:bg-default",
          ],
        }}
      >
        <DropdownSection aria-label="Profile & Actions" showDivider>
          <DropdownItem
            isReadOnly
            key="profile"
            className="h-14 gap-2 opacity-100"
          >
            <User
              name={userData.profileName}
              description={`@${userData.profileUsername}`}
              classNames={{
                name: "text-default-600",
                description: "text-default-500",
              }}
              avatarProps={{
                size: "sm",
                src: userData.profileImgUrl,
              }}
            />
          </DropdownItem>
          <DropdownItem
            key="dashboard"
            endContent={<MdOutlineWidgets className="text-lg" />}
          >
            <Link to={`/${userData.profileUsername}`} color="foreground">
              Profile
            </Link>
          </DropdownItem>
          <DropdownItem
            key="settings"
            endContent={<RiUserSettingsLine className="text-lg" />}
          >
            <Link to={`/settings`} color="foreground">
              User Settings
            </Link>
          </DropdownItem>
          <DropdownItem
            key="new_post"
            endContent={<AiOutlineVideoCameraAdd className="text-lg" />}
          >
            <Link to="/new" color="foreground">
              New Post
            </Link>
          </DropdownItem>
        </DropdownSection>

        <DropdownSection aria-label="Preferences" showDivider>
          <DropdownItem
            key="quick_search"
            shortcut="ctrl + K"
            onClick={() => {
              // TODO : Search Modal
              console.log("Opening Search Modal...");
            }}
          >
            Quick search
          </DropdownItem>
          <DropdownItem
            isReadOnly
            key="language"
            className="cursor-default"
            startContent={
              <Select
                label="Language"
                labelPlacement="inside"
                defaultSelectedKeys={["english"]}
                className="w-full"
              >
                {[
                  {
                    label: "Hindi",
                    value: "hindi",
                  },
                  {
                    label: "English",
                    value: "english",
                  },
                ].map((language) => (
                  <SelectItem
                    key={language.value}
                    value={language.value}
                    className="bg-main-text-default"
                  >
                    {language.label}
                  </SelectItem>
                ))}
              </Select>
            }
          ></DropdownItem>
        </DropdownSection>

        <DropdownSection aria-label="Help & Feedback" showDivider>
          <DropdownItem
            key="help_and_feedback"
            endContent={<GiHelp className="text-lg" />}
          >
            <Link to="/contact" color="foreground">
              Help & Feedback
            </Link>
          </DropdownItem>
          <DropdownItem key="logout">
            <Button onClick={handleLogout} color="danger" fullWidth>
              <HiOutlineLogout className="text-lg" />
              Log Out
            </Button>
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
