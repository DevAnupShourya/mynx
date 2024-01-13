import { Link } from "react-router-dom";
import { Divider, Button } from "@nextui-org/react";

export default function Home() {
  return (
    <main
      id="hero"
      className="w-11/12 h-auto grid place-items-center max-sm:text-center"
    >
      <p className="text-xl font-bold capitalize">
        the ultimate social media platform.
      </p>
      <h1 className="text-6xl max-md:text-4xl font-bold capitalize my-14">
        <span
          id="logo"
          className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-green-600 to-secondary"
        >
          Mynx
        </span>
        <br />
        Beyond the ordinary
        <br />
        within your reach.
      </h1>
      <Button
        as={Link}
        to={"/login"}
        variant="shadow"
        color="primary"
        size="lg"
      >
        Explore
      </Button>
      <Divider className="my-10" />
      <div className="w-full flex flex-row max-md:flex-col justify-center items-center">
        <div className="w-1/3  text-center">
          <h2 className="text-bold text-xl my-2">105M+</h2>
          <p className="text-xs ">Users</p>
        </div>
        <Divider orientation="vertical" className="h-24 max-md:hidden" />
        <Divider orientation="horizontal" className="my-10 md:hidden" />
        <div className="w-1/3  text-center">
          <h2 className="text-bold text-xl my-2">80M+</h2>
          <p className="text-xs ">Posts Upload Daily</p>
        </div>
        <Divider orientation="vertical" className="h-24 max-md:hidden" />
        <Divider orientation="horizontal" className="my-10 md:hidden" />
        <div className="w-1/3  text-center">
          <h2 className="text-bold text-xl my-2">$600M</h2>
          <p className="text-xs ">Raised</p>
        </div>
      </div>
      <Divider className="my-10" />
    </main>
  );
}
