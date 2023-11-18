import { Image , Link} from "@nextui-org/react";

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
      <h2 className="mb-2 text-2xl font-bold tracking-tight text-light-main dark:text-dark-main">
        <Link href="/blogs/How_to_quickly_deploy_a_static_website">
          {heading}
        </Link>
      </h2>
      <p className="mb-5 font-light">{description.slice(0, 200)}</p>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Image
            className="w-7 h-7 rounded-full"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
            alt={`${authorName} avatar`}
          />
          <span className="font-medium text-light-main dark:text-dark-main">
            {authorName}
          </span>
        </div>
        <a
          href="#"
          className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline"
        >
          Read more
          <svg
            className="ml-2 w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </a>
      </div>
    </article>
  );
}