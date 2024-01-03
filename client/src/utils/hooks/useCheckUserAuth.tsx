import useGetCookie from "~/utils/hooks/useGetCookie";
import { useAppDispatch, useAppSelector } from "~/utils/hooks/redux.hooks";
import { updateUserData } from "~/redux/user/userSlice";
import { getCurrentUser } from "~/services/Auth/Authentication.services";

function useCheckUserAuth() {
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user);
  const token = useGetCookie();

  async function checkAuth() {
    try {
      if (!token) {
        console.warn("No Token Found!");
        dispatch(
          updateUserData({ ...userState, authStatus: "unauthenticated" })
        );
      } else {
        const userDataFromServer = await getCurrentUser(token);
        
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
