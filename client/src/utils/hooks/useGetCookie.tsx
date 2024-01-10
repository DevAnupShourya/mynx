import { useCookies } from "react-cookie";

export default function useGetCookie(): string | null {
  const [cookies] = useCookies();
  return cookies["secret_text"] ? (cookies["secret_text"] as string) : null;
}
