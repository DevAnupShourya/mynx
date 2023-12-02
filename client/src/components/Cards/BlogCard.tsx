import { Image, Link } from "@nextui-org/react";

type blogData = {
  heading: string;
  description: string;
  authorName: string;
  blogType: "Tutorial" | "Article";
};

export function TutorialChip() {
  return (
    <>
      <svg
        className="mr-1 w-3 h-3"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
      </svg>
      Tutorial
    </>
  );
}

export function ArticleChip() {
  return (
    <>
      <svg
        className="mr-1 w-3 h-3"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
          clipRule="evenodd"
        ></path>
        <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"></path>
      </svg>
      Article
    </>
  );
}

export default function BlogCards({
  heading,
  description,
  authorName,
  blogType,
}: blogData) {
  return (
    <article className="p-6 bg-light-all rounded-lg shadow-2xl dark:bg-dark-all">
      <div className="flex justify-between items-center mb-5">
        <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
          {blogType === "Article" ? <ArticleChip /> : <TutorialChip />}
        </span>
        <span className="text-sm">
          {Math.floor(Math.random() * 10)} days ago
        </span>
      </div>
      <Link
        href="/blogs/How_to_quickly_deploy_a_static_website"
        color="foreground"
        className="mb-2 text-xl font-semibold tracking-wider capitalize"
      >
        {heading}
      </Link>
      <p className="mb-5 text-sm font-medium -tracking-wider capitalize">
        {description.slice(0, 200)}
      </p>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Image
            className="w-10 h-10 rounded-full"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
            alt={`${authorName} avatar`}
          />
          <span className="font-medium text-light-main dark:text-dark-main">
            {authorName}
          </span>
        </div>
      </div>
    </article>
  );
}
