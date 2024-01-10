import { Chip } from "@nextui-org/react";
import { useParams } from "react-router-dom";
import PageTitle from "~/components/title/PageTitle";

function ActivityTab() {
  const { username } = useParams();

  return (
    <>
      <PageTitle title={`Activity of ${username}`} />
      <Chip size="lg" variant="shadow" color="warning">
        Sorry! This Feature is yet to be build Enjoy till then.
      </Chip>
    </>
  );
}

export default ActivityTab;
