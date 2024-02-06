import { Divider } from "@nextui-org/react";

function PageTitle({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="my-4">
      <div className="flex flex-row justify-between items-center">
        <h1 className="w-1/6 max-md:w-2/6 h-auto text-2xl font-semibold tracking-widest capitalize text-light-main dark:text-dark-main">
          {title}
        </h1>
        {children && <div className="h-auto">{children}</div>}
      </div>
      <Divider />
    </div>
  );
}

export default PageTitle;
