import { useState } from "react";
import Cookies from "js-cookie";
const cookie_name = import.meta.env.VITE_COOKIE_NAME as string;

import { Link, useNavigate } from "react-router-dom";
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

import { updateUserData } from "~/redux/slices/user";
import { useAppDispatch, useAppSelector } from "~/utils/hooks/redux.hooks";

import ThemeSwitcher from "~/components/switch/ThemeSwitcher";
import Toast from "~/components/custom_toast/Toast";

import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { RiUserSettingsLine } from "react-icons/ri";
import { HiOutlineLogout } from "react-icons/hi";
import { GiHelp } from "react-icons/gi";
import { MdOutlineWidgets } from "react-icons/md";

export default function ProfileDropdown() {
  const navigation = useNavigate();
  const theme = useAppSelector((state) => state.theme.mode);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [logoutBtnStatus, setLogoutBtnStatus] = useState(false);

  const handleLogout = async () => {
    setLogoutBtnStatus(true);
    try {
      Cookies.remove(cookie_name);
      dispatch(
        updateUserData({
          authStatus: "unauthenticated",
          mail: "",
          name: "",
          userImg: "",
          username: "",
          userId: "",
        })
      );

      navigation("/", { replace: true });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      Toast.warning(error.message);
      console.error("Error Logging Out: ", error.message);
    }
    setLogoutBtnStatus(false);
  };

  return (
    <Dropdown
      size="lg"
      radius="sm"
      className={theme}
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
          <DropdownItem textValue="profile" className="h-14 gap-2 opacity-100">
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
            textValue="dashboard"
            endContent={<MdOutlineWidgets className="text-lg" />}
          >
            <Link to={`/${user.username}`} color="foreground">
              Profile
            </Link>
          </DropdownItem>
          <DropdownItem
            textValue="settings"
            endContent={<RiUserSettingsLine className="text-lg" />}
          >
            <Link to={`/settings`} color="foreground">
              User Settings
            </Link>
          </DropdownItem>
          <DropdownItem
            textValue="new_post"
            endContent={<AiOutlineVideoCameraAdd className="text-lg" />}
          >
            <Link to="/new" color="foreground">
              New Post
            </Link>
          </DropdownItem>
          <DropdownItem
            isReadOnly
            textValue="theme_switch"
            endContent={<ThemeSwitcher />}
          >
            Theme
          </DropdownItem>
        </DropdownSection>

        <DropdownSection aria-label="Preferences" showDivider>
          <DropdownItem
            textValue="quick_search"
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
            textValue="language"
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

        <DropdownSection aria-label="Help & Feedback">
          <DropdownItem
            textValue="help_and_feedback"
            endContent={<GiHelp className="text-lg" />}
          >
            <Link to="/contact" color="foreground">
              Help & Feedback
            </Link>
          </DropdownItem>
          <DropdownItem textValue="logout" isReadOnly>
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
