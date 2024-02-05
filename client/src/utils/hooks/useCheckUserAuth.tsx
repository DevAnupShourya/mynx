import Cookies from "js-cookie";

import { useAppDispatch, useAppSelector } from "~/utils/hooks/redux.hooks";
import { updateUserData } from "~/redux/slices/user";
import { getCurrentUser } from "~/services/Users/User.services";
const cookie_name = import.meta.env.VITE_COOKIE_NAME as string;

function useCheckUserAuth() {
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user);
  const token =  Cookies.get(cookie_name);
  
  async function checkAuth() {
    try {
      if (!token) {
        console.warn("No Token Found!");
        dispatch(
          updateUserData({ ...userState, authStatus: "unauthenticated" })
        );
      } else {
        const userDataFromServer = await getCurrentUser();
        
        dispatch(
          updateUserData({
            authStatus: "authenticated",
            mail: userDataFromServer.email,
            name: userDataFromServer.name,
            userImg: userDataFromServer.avatarURL,
            username: userDataFromServer.username,
            userId : userDataFromServer._id
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
