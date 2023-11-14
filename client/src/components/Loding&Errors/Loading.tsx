import { Progress } from "@nextui-org/react";

export default function Loading() {
  return (
    <div className="w-full h-5/6 grid place-items-center">
      <Progress
        size="sm"
        isIndeterminate
        label="Page Loading... Plese Wait!!"
        aria-label="Page Loading... Plese Wait!!"
        className="max-w-md min-w-min"
      />
    </div>
  );
}
