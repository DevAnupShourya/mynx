import { useAppSelector, useAppDispatch } from "~/utils/hooks/redux.hooks";
import { toggleTheme } from "~/redux/slices/theme";

import { Switch } from "@nextui-org/react";
import { BsFillSunFill, BsFillMoonStarsFill } from "react-icons/bs";

function ThemeSwitcher() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.mode);

  const handleThemeClick = () => {
    dispatch(toggleTheme());
  };

  return (
    <Switch
      defaultSelected={theme === "dark" ? true : false}
      size="lg"
      color={theme === "dark" ? "primary" : "danger"}
      startContent={<BsFillMoonStarsFill />}
      endContent={<BsFillSunFill />}
      onClick={handleThemeClick}
    />
  );
}

export default ThemeSwitcher;
