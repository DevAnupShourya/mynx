import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { RiUserSettingsLine } from "react-icons/ri";
import { HiOutlineLogout } from "react-icons/hi";
import { GiHelp } from "react-icons/gi";
import { MdOutlineWidgets } from "react-icons/md";

import { ThemeSwitcher } from "~/components/components.barrel";

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
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

// ? Redux
import { updateUserData } from "~/redux/user/userSlice";
import { useAppDispatch, useAppSelector } from "~/utils/hooks/redux.hooks";
import { useState } from "react";

export default function ProfileDropdown() {
  const navigation = useNavigate();
  // ? Redux State
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [logoutBtnStatus, setLogoutBtnStatus] = useState(false);

  const [, , removeCookie] = useCookies(["secret_text"]);

  const handleLogout = async () => {
    setLogoutBtnStatus(true);
    try {
      removeCookie("secret_text", { path: "/" });

      dispatch(
        updateUserData({
          authStatus: "unauthenticated",
          mail: "",
          name: "",
          userImg: "",
          username: "",
        })
      );

      navigation("/", { replace: true });
    } catch (error) {
      console.error("Error signing out:", error);
    }
    setLogoutBtnStatus(false);
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
        <Avatar showFallback radius="full" size="lg" src={user.userImg} />
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
              name={user.name}
              description={`@${user.username}`}
              classNames={{
                name: "text-default-600",
                description: "text-default-500",
              }}
              avatarProps={{
                size: "sm",
                src: user.userImg,
              }}
            />
          </DropdownItem>
          <DropdownItem
            key="dashboard"
            endContent={<MdOutlineWidgets className="text-lg" />}
          >
            <Link to={`/${user.username}`} color="foreground">
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
          <DropdownItem
            isReadOnly
            key="theme_switch"
            endContent={<ThemeSwitcher />}
          >
            Theme
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
            <Button
              onClick={handleLogout}
              color="danger"
              fullWidth
              isLoading={logoutBtnStatus}
            >
              <HiOutlineLogout className="text-lg" />
              Log Out
            </Button>
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
