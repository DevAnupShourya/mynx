import { Divider } from "@nextui-org/react";
function PageTitle({ title }: { title: string }) {
  return (
    <h1 className="text-2xl font-semibold tracking-widest capitalize text-light-main dark:text-dark-main my-4">
      {title}
      <Divider />
    </h1>
  );
}

export default PageTitle;
