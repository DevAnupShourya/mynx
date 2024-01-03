import { useCookies } from "react-cookie";

function useGetCookie() : string | undefined {
  const [cookies] = useCookies();
  return cookies["secret_text"] as string;
}

export default useGetCookie;
