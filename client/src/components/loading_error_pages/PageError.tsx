import { Button } from "@nextui-org/react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  console.error(error);

  return (
    <section className="w-full h-full grid place-items-center">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary dark:text-primary-500">
            500
          </h1>
          <p className="mb-4 text-3xl tracking-widest font-bold text-light-main dark:text-dark-main md:text-4xl">
            Internal Server Error.
          </p>
          <p className="mb-4 text-lg font-light text-light-default dark:text-dark-default">
            We are already working to solve the problem.
          </p>
          <Button
            type="button"
            color="warning"
            onClick={
              // ? Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            Reset
          </Button>
        </div>
      </div>
    </section>
  );
}
