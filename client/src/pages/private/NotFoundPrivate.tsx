import { Button } from "@nextui-org/react";

import { IoIosArrowRoundBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

export default function NotFoundPrivate() {
  const navigation = useNavigate();

  return (
    <section className="h-full bg-main-text-default grid place-items-center ">
      <div className="flex items-center px-6 py-12 mx-auto">
        <div>
          <p className="text-sm font-medium text-danger">404 error</p>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
            We can’t find this page
          </h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>

          <div className="flex items-center mt-6 gap-x-3">
            <Button
              size="lg"
              color="danger"
              variant="faded"
              startContent={<IoIosArrowRoundBack />}
              onClick={() => navigation(-1)}
            >
              Go back
            </Button>

            <Button size="lg" color="warning" variant="flat" as={Link} to={"/"}>
              Take me Home
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
