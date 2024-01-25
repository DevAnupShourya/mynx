import { Progress } from "@nextui-org/react";

export default function Loading({ label = 'Page'}: { label?: string }) {
  return (
    <div className="w-full h-5/6 grid place-items-center">
      <Progress
        size="sm"
        isIndeterminate
        label={`${label} Loading... Please Wait!!` }
        aria-label="Page Loading... Please Wait!!"
        className="max-w-md min-w-min"
      />
    </div>
  );
}
