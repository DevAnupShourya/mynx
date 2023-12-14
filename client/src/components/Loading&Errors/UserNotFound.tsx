import { Button } from "@nextui-org/react";

function UserNotFound({ username }: { username: string }) {
  return (
    <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8 bg-main-text-main">
      <div className="text-center">
        <p className="text-base font-semibold text-warning lowercase ">
          @{username}
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl capitalize">
          user not found
        </h1>
        <p className="my-6 text-base leading-7 capitalize font-light">
          Sorry, we couldn’t find the user you’re looking for.
        </p>
      </div>
      <Button
        onClick={() => {
          window.location.reload();
        }}
        color="danger"
        variant="flat"
      >
        Try Again
      </Button>
    </main>
  );
}

export default UserNotFound;
