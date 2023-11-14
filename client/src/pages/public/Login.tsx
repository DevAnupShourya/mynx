import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Button,
  Divider,
  Link as LinkBtn,
} from "@nextui-org/react";

import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaGithubAlt } from "react-icons/fa";

import { Logo } from "~/components/components.barrel";

export default function Login() {
  return (
    <Card className="w-full max-w-lg mx-auto bg-main-text-default">
      <CardHeader className="flex justify-center mx-auto">
        <Logo type="lg"/>
      </CardHeader>
      <Divider />
      <CardBody>
        <p className="title-3 text-center text-light-main dark:text-dark-main my-3 capitalize">
          Welcome ! Create An Account
        </p>
        <p className="text-base capitalize text-center my-2">
          Powered By Passwordless authentication from
          <LinkBtn
            as={Link}
            href="https://next-auth.js.org/"
            size="sm"
            color="warning"
            isExternal={true}
            className="mx-2"
          >
            ..........
          </LinkBtn>
        </p>
      </CardBody>
      <Divider />
      <CardFooter className="flex flex-col gap-4">
        <Button
          onClick={() => {
            // signIn("github", {
            //   callbackUrl: "/dashboard",
            //   redirect: true,
            // });
            console.log("Singing in with github....");
          }}
          type="submit"
          fullWidth
          variant="ghost"
          color="default"
          size="md"
        >
          <FaGithubAlt />
          Create Account With Github
        </Button>
        <Button
          onClick={() => {
            // signIn("google", {
            //   callbackUrl: "/dashboard",
            //   redirect: true,
            // });
            console.log("Singing in with google....");
          }}
          type="submit"
          fullWidth
          variant="ghost"
          color="secondary"
          size="md"
        >
          <FcGoogle />
          Create Account With Google
        </Button>
      </CardFooter>
    </Card>
  );
}
