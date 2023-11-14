import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="bg-def">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-warning">
            404
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold ">
            Something&apos;s missing.
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            Sorry, we can&apos;t find that page. You&apos;ll find lots to
            explore on the home page.
          </p>
          <Button as={Link} to="/" color="warning">
            Go Back Home
          </Button>
        </div>
      </div>
    </section>
  );
}
