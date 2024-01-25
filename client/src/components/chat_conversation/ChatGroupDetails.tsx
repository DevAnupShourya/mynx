import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Button,
  Chip,
} from "@nextui-org/react";
import { useAppSelector } from "~/utils/hooks/redux.hooks";

import ProfilePreview from "~/components/profile/ProfilePreview";

function ChatGroupDetails() {
  const theme = useAppSelector((state) => state.theme.mode);

  const groupDetails = {
    image: "https://avatars.githubusercontent.com/u/30373412",
    name: "Project X Team",
    description: "The Group Of Most famous leaders in X",
    participants: [
      "65a5333172cc30820980f267",
      "65a5337772cc30820980f26d",
      "65a533ba72cc30820980f273",
      "65a5340772cc30820980f27c",
      "65a5344772cc30820980f285"
    ],
    admin: "65a5340772cc30820980f27c",
  };

  return (
    <Card className={`${theme} max-md:max-w-[300px] max-w-[400px]`} radius="sm">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          radius="sm"
          src={groupDetails.image}
          height={40}
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md capitalize">{groupDetails.name}</p>
          <p className="text-small text-default-500 capitalize">
            {groupDetails.description}
          </p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="max-h-96 gap-2 overflow-y-scroll ">
        {groupDetails.participants.map((user) => {
          return (
            <ProfilePreview
              userId={user}
              key={user}
              endContent={
                groupDetails.admin === user ? (
                  <Chip color="warning" variant="shadow">Admin</Chip>
                ) : null
              }
            />
          );
        })}
      </CardBody>
      <Divider />
      <CardFooter className="gap-2 max-md:flex-wrap">
        <Button
          fullWidth
          color="warning"
          variant="light"
          className="capitalize"
          radius="sm"
          title="report User"
        >
          report {groupDetails.name}
        </Button>
        <Button
          fullWidth
          color="danger"
          variant="flat"
          className="capitalize"
          radius="sm"
          title="Block User"
        >
          Block {groupDetails.name}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ChatGroupDetails;
