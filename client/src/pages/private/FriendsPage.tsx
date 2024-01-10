import { Button } from "@nextui-org/react";
import PageTitle from "~/components/title/PageTitle";

import {
  useNavigate,
  useLocation,
  Outlet,
} from "react-router-dom";

function FriendsPage() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <PageTitle title="friends" />
      <div className="flex flex-row flex-nowrap justify-between items-center">
        <Button
          size="md"
          variant={pathname === `/friends` ? "shadow" : "bordered"}
          color="secondary"
          fullWidth
          radius="none"
          onClick={() => {
            navigate(`/friends`, {
              preventScrollReset: true,
            });
          }}
        >
          Followers
        </Button>
        <Button
          size="md"
          variant={pathname === `/friends/following` ? "shadow" : "bordered"}
          color="secondary"
          fullWidth
          radius="none"
          onClick={() => {
            navigate(`/friends/following`, {
              preventScrollReset: true,
            });
          }}
        >
          Following
        </Button>
      </div>
      <Outlet/>
    </>
  );
}

export default FriendsPage;
