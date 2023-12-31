import { useCookies } from "react-cookie";
import { useAppDispatch, useAppSelector } from "~/utils/hooks/redux.hooks";
import { updateUserData } from "~/redux/user/userSlice";
import { getCurrentUser } from "~/services/Auth/Authentication.services";

function useCheckUserAuth() {
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user);
  const [cookies] = useCookies();

  async function checkAuth() {
    try {
      if (!cookies["secret_text"]) {
        console.warn("No Token Found!");
        dispatch(
          updateUserData({ ...userState, authStatus: "unauthenticated" })
        );
      } else {
        const userDataFromServer = await getCurrentUser(
          cookies["secret_text"] as string
        );

        dispatch(
          updateUserData({
            authStatus: "authenticated",
            mail: userDataFromServer.email,
            name: userDataFromServer.name,
            userImg: userDataFromServer.avatarURL,
            username: userDataFromServer.username,
          })
        );
      }
    } catch (error) {
      console.error("Error fetching user Authentication:", error);
    }
  }

  return checkAuth;
}

export default useCheckUserAuth;
