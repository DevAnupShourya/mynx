import { Chip } from "@nextui-org/react";
import PageTitle from "~/components/title/PageTitle";

export default function NotificationsPage() {
  return (
    <>
      <PageTitle title="Notifications" />
      <Chip size="lg" variant="shadow" color="warning">
        Sorry! This Feature is yet to be build Enjoy till then.
      </Chip>
    </>
  );
}
