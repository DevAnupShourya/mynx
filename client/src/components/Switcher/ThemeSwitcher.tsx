import { Switch } from "@nextui-org/react";
import { BsFillSunFill, BsFillMoonStarsFill } from "react-icons/bs";

import { useAppSelector, useAppDispatch } from "~/utils/hooks/redux.hooks";
import { toggleTheme } from "~/redux/theme/ThemeSlice";

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
      color="default"
      startContent={<BsFillMoonStarsFill />}
      endContent={<BsFillSunFill />}
      onClick={handleThemeClick}
    />
  );
}

export default ThemeSwitcher;
