import { Link } from "react-router-dom";
import { Link as LinkBtn, Button } from "@nextui-org/react";

export default function Home() {
  return (
    <main className="mx-auto w-2/3">
      <div className="mb-4 max-sm:mb-6 flex justify-center">
        <div className="relative rounded-full px-3 py-1 text-base leading-6 text-light-default dark:text-dark-default ring-1 text-center">
          Welcoming Contributions on &nbsp;
          <LinkBtn
            as={Link}
            to={"https://github.com/DevAnupShourya/vixel"}
            color="secondary"
            underline="hover"
            isExternal
            showAnchorIcon
          >
            Github
          </LinkBtn>
        </div>
      </div>
      <div className="text-center">
        <p className="title-1 text-light-main dark:text-dark-main">
          World in Pixels
        </p>
        <p className="mt-6 title-2">
          World in Pixels, the ultimate social media platform.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button as={Link} to={"/login"} color="primary">
            Join
          </Button>
        </div>
      </div>
    </main>
  );
}
