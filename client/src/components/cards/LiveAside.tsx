import { Chip } from "@nextui-org/react";

function LiveAside() {
  return (
    <>
      <h1 className="text-xl font-semibold tracking-wider capitalize text-light-main dark:text-dark-main my-4">
        Live Trending Words' Chart
      </h1>
      <Chip size="sm" variant="bordered" color="warning">
        Stay Tuned
      </Chip>
    </>
  );
}

export default LiveAside;
