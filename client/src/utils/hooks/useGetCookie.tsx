import { useCookies } from "react-cookie";
export default function useGetCookie() {
  const [cookies] = useCookies();
  const tokenValue = cookies["secret_text"] as string;

  if (!tokenValue) {
    return;
  } else {
    return tokenValue;
  }
}
